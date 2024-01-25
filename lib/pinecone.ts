import { Pinecone, PineconeClient } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
let pinecone: Pinecone | null = null;

export const getPineconeClient = async () => {
  if (!pinecone) {
    pinecone = new Pinecone({
      environment: process.env.PINECONE_ENVIRONMENT!,
      apiKey: process.env.PINECONE_API_KEY!,
    });
  }
  return pinecone;
};

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export const loadToS3IntoPinecone = async (fileKey: string) => {
  console.log("Downloading S3 into filesystem");
  const file_name = await downloadFromS3(fileKey);
  if (!file_name) {
    throw new Error("Error downloading filename from S3");
  }
  const loader = new PDFLoader(file_name);
  const pages = loader.load() as unknown as PDFPage[];

  return pages;
};

async function prepareDocument(page: PDFPage) {}
