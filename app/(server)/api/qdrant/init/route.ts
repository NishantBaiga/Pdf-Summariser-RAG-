import { qdrant } from "@/lib/qdrant/qdrant";

export async function GET() {
  await qdrant.createCollection("pdf_chunks", {
    vectors: {
      size: 768,
      distance: "Cosine",
    },
  });

  return Response.json({ success: true });
}
