import { db } from "@/lib/db";
import { GoogleGenAI } from "@google/genai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { storePdfChunks } from "@/lib/qdrant/storeChunks";
import { auth } from "@clerk/nextjs/server";
export async function POST(req: Request) {
  try {
    const {userId} = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    const { fileId } = await req.json();
    let file = await db.file.findUnique({
      where: { id: fileId },
    });
    if (!file) {
      return new NextResponse("File not found in db", { status: 404 });
    }

    // Fetch the PDF file from the URL (UploadThing)
    const response = await fetch(file.url);
    if (!response.ok) throw new Error("Failed to download PDF");
    const blob = await response.blob();
    // Load the PDF using LangChain
    const loader = new PDFLoader(blob);
    const docs = await loader.load();

    const fullText = docs.map((doc) => doc.pageContent).join("\n");
    const pageCount = docs.length;
    const pages = docs.map((doc, index) => ({
      page: index + 1,
      text: doc.pageContent,
    }));

    // console.log("extractText info :", { pageCount, pages, fullText });
    // await summarizeText(fullText);
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500, // 1000,
      chunkOverlap: 100, // 150,
    });

    const allChunks: {
      text: string;
      page: number;
      chunkIndex: number;
    }[] = [];

    for (const page of pages) {
      const chunks = await splitter.splitText(page.text);
      // console.log("chunks info :", { chunks });

      chunks.forEach((chunkText, index) => {
        allChunks.push({
          text: chunkText,
          page: page.page,
          chunkIndex: index,
        });
      });
    }

    if (!allChunks.length) {
      throw new Error("No chunks generated from PDF");
    }
    // console.log("allChunks info :", { allChunks });
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY!,
    });

    const texts = allChunks.map((c) => c.text);
    const embeddingResult = await ai.models.embedContent({
      model: "models/text-embedding-004",
      contents: texts, // ✅ BATCH
    });
    // console.log("embeddingResult info :", { embeddingResult });
    if (!embeddingResult.embeddings) {
      throw new Error("Embedding generation failed");
    }

    const rawVectors = embeddingResult.embeddings.map((e) => e.values);

    const vectors: number[][] = rawVectors.filter((v): v is number[] =>
      Array.isArray(v),
    );
    if (vectors.length !== allChunks.length) {
      throw new Error("Embedding count mismatch");
    }

    //   const vectors = embeddingResult.embeddings
    // .map((e) => e.values)
    // .filter((v) => v !== undefined) as number[][];

    await storePdfChunks({
      fileId,
      chunks: allChunks,
      vectors: vectors,
    });

    return NextResponse.json({
      extractedText: file.extractedText || "",
      summary: file.summary || "",
    });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

async function extractText(fileUrl: string) {
  try {
    if (!fileUrl) {
      throw Error("File URL is required");
    }

    // 1. Fetch the PDF file from the URL (UploadThing)
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error("Failed to download PDF");
    const blob = await response.blob();

    // 2. Load the PDF using LangChain
    const loader = new PDFLoader(blob);
    const docs = await loader.load();

    // 3. Combine the text from all pages into one string
    const fullText = docs.map((doc) => doc.pageContent).join("\n");

    const pages = docs.map((doc, index) => ({
      page: index + 1,
      text: doc.pageContent,
    }));
    const pageCount = docs.length;

    console.log("extractText info :", { pageCount, pages, fullText });

    return { pageCount: pageCount, fullText: fullText, pages: pages };
  } catch (error) {
    console.error("Text Extraction Error:", error);
    throw new Error("Failed to extract text");
  }
}

async function splitText(text: string) {
  try {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500, // 1000,
      chunkOverlap: 100, // 150,
    });
    const chunks = await splitter.splitText(text);
    console.log("splitText info :", { chunks });
    return chunks; // array of strings
  } catch (error) {
    console.error("Text Splitting Error:", error);
    throw new Error("Failed to split text");
  }
}

async function embeddingText(textChunks: string[]) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
    const embeddings = [];

    for (let i = 0; i < textChunks.length; i++) {
      const chunk = textChunks[i];

      const embeddingResult = await ai.models.embedContent({
        model: "models/text-embedding-004",
        contents: chunk,
      });

      if (
        !embeddingResult.embeddings ||
        embeddingResult.embeddings.length === 0 ||
        !embeddingResult.embeddings[0].values
      ) {
        throw new Error(`Embedding failed for chunk ${i}`);
      }

      const vector = embeddingResult.embeddings[0].values;

      embeddings.push({
        chunk,
        vector,
      });
    }

    return embeddings;
  } catch (error) {
    console.error("Embedding Error:", error);
    throw new Error("Failed to generate embeddings");
  }
}

// async function summarizeText(extractedText: string) {
//   try {
//     const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
//     const response = await ai.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: [
//         {
//           role: "user",
//           parts: [
//             {
//               text: `Summarize the following document in concise bullet points:\n\n${extractedText}`,
//             },
//           ],
//         },
//       ],
//     });

//     const summaryText = response.text || "No summary generated";
//     return summaryText;
//   } catch (error) {
//     console.error("Summarization Error:", error);
//     throw new Error("Failed to generate summary");
//   }
// }
