import { Pinecone, PineconeClient } from "@pinecone-database/pinecone";
import { getEmbeddings } from "./embeddings";
import { convertToAscii } from "./utils";

export async function getContext(query: string, fileKey: string) {
  const queryEmbeddings = await getEmbeddings(query);
  const matches = await getMatchesFromEmbeddings(queryEmbeddings!, fileKey);

  const qualifyingDocs = matches?.filter(
    (match) => match.score && match.score > 0.7
  );

  type Metadata = {
    text: string;
    pageNumber: number;
  };

  let docs = qualifyingDocs?.map((m) => (m.metadata as Metadata).text);
  return docs?.join("\n").substring(0, 3000);
}

export async function getMatchesFromEmbeddings(
  embeddings: number[],
  fileKey: string
) {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
    environment: process.env.PINECONE_ENVIRONMENT!,
  });

  const index = await pinecone.Index("citeit");

  try {
    const namespace = convertToAscii(fileKey);

    const queryResult = await index.namespace(namespace).query({
      topK: 5,
      includeMetadata: true,
      vector: embeddings,
    });
    return queryResult.matches || [];
  } catch (error) {
    console.log(error);
  }
}
