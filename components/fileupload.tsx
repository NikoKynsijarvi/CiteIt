"use client";

import { File, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadToS3, getS3URL } from "@/lib/s3";
import { addNewChat } from "@/app/redux/reducers/chatsReducer";
import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import axios from "axios";

type Props = {
  params: {
    userId: string;
  };
};

const FileUploader = ({ params: { userId } }: Props) => {
  const dispatch = useDispatch();
  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      pdfName,
      pdfUrl,
      fileKey,
      userId,
    }: {
      pdfName: string;
      pdfUrl: string;
      fileKey: string;
      userId: string;
    }) => {
      const response = await axios.post("/api/create-chat", {
        pdfName,
        pdfUrl,
        fileKey,
        userId,
      });
      return response.data;
    },
  });

  const [isUploading, setIsUploading] = useState<boolean>(true);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (acceptedFiles[0].size > 10 * 1024 * 1024) {
        //Bigger than 10 mb
        alert("Please upload smaller file");
        return;
      }
      try {
        const upload = await uploadToS3(acceptedFiles[0]);
        const pdfUrl = await getS3URL(upload!.file_key);

        if (!upload?.file_key && !upload?.file_name) {
          throw alert("Something went wrong");
          return;
        }

        mutate(
          {
            pdfName: upload.file_name,
            pdfUrl,
            fileKey: upload.file_key,
            userId,
          },
          {
            onSuccess: (data) => {
              dispatch(addNewChat(data.data));
            },
            onError: (error) => {
              console.log(error);
            },
          }
        );

        setIsUploading(false);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className=" p-2 h-2/3  w-full flex items-center justify-center flex-col lg:w-2/3">
      <h2 className="bg-gradient-to-r from-orange-700 via-red-400 to-orange-400 inline-block text-transparent bg-clip-text text-4xl m-4 p-2">
        Drop a pdf to get started
      </h2>

      <div
        className="border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 p-8 flex justify-center items-center flex-col w-1/2 h-1/2"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p className="text-orange-500">
          Drag 'n' drop some files here, or click to select files
        </p>
      </div>
      {acceptedFiles && acceptedFiles[0] ? (
        <div className="max-w-xs m-2 flex items-center rounded-md overflow-hidden  outline-orange-500 ">
          <div className="px-3 py-2 h-full grid place-items-center">
            <File className="h-4 w-4 text-orange-500" />
          </div>
          <div className="px-3 py-2 h-full text-sm truncate text-orange-500">
            {acceptedFiles[0].name}
          </div>
          {isLoading || isUploading ? (
            <>
              <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
            </>
          ) : (
            <>
              <Check className="h-5 w-5 text-green-500" />
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default FileUploader;
