import { qdrant } from "./qdrant";

export async function searchPdfChunks({
  fileId,
  queryEmbedding,
}: {
  fileId: string;
  queryEmbedding: number[];
}) {
  if (!Array.isArray(queryEmbedding)) {
    throw new Error("Query embedding is not an array");
  }

  if (queryEmbedding.length !== 768) {
    throw new Error("Invalid embedding dimension");
  }

  const results = await qdrant.search("pdf_chunks", {
    vector: queryEmbedding,
    limit: 15,
    // filter: {
    //   must: [
    //     {
    //       key: "fileId",
    //       match: { value: fileId },
    //     },
    //   ],
    // },
  });

  /* -------------------- Score filtering -------------------- */

  return results
    .filter(r => r.score && r.score > 0.25)
    .map(r => r.payload?.text as string);
}
