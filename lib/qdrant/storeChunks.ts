import { qdrant } from "./qdrant";
import { v5 as uuidv5 } from "uuid";

type ChunkPayload = {
  text: string;
  page: number;
  chunkIndex: number;
};
const NAMESPACE = "b6b8c9f0-1234-4abc-9def-123456789abc"; // any fixed UUID
export async function storePdfChunks({
  fileId,
  chunks,
  vectors,
}: {
  fileId: string;
  chunks: ChunkPayload[];
  vectors: number[][];
}) {


  if (chunks.length !== vectors.length) {
    throw new Error("Chunks and vectors length mismatch");
  }

  const points = chunks.map((chunk, i) => {
    const vector = vectors[i];

    if (!vector || vector.length !== 768) {
      throw new Error(`Invalid vector at index ${i}`);
    }

    return {
      id: uuidv5(`${fileId}_${chunk.page}_${chunk.chunkIndex}`, NAMESPACE), // ✅ unique
      vector,
      payload: {
        fileId,
        page: chunk.page,
        chunkIndex: chunk.chunkIndex,
        text: chunk.text,
        source: "pdf",
      },
    };
  });

  await qdrant.upsert("pdf_chunks", {
    points,
    wait: true,
  });
}
