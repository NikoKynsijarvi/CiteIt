"use client";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  RotateCw,
  Search,
} from "lucide-react";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useForm } from "react-hook-form";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useResizeDetector } from "react-resize-detector";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import SimpleBar from "simplebar-react";
import { useToast } from "./ui/use-toast";
import PdfFullScreen from "./pdffullscreen";

type UserChat = {
  _id: string;
  pdfName: string;
  pdfUrl: string;
  userId: string;
  fileKey: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

interface ChatState {
  chats: UserChat[];
  currentChat: null | UserChat;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type Props = { pdf_url: string };

function PDFViewer() {
  const { width, ref } = useResizeDetector();
  const { toast } = useToast();

  console.log(width);

  const CustomPageValidator = z.object({
    page: z
      .string()
      .refine((num) => Number(num) >= 1 && Number(num) <= pageNum!),
  });
  const selectedChat = useSelector(
    (state: { chats: ChatState }) => state.chats.currentChat
  );
  type TCustomValidator = z.infer<typeof CustomPageValidator>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomValidator>({
    defaultValues: {
      page: "1",
    },
    resolver: zodResolver(CustomPageValidator),
  });

  const [pageNum, setPageNum] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);

  const handlePageSubmit = ({ page }: TCustomValidator) => {
    setCurrPage(Number(page));
    setValue("page", String(page));
  };

  return (
    <div className="w-full   rounded-md shadow flex flex-col items-center border-2 ">
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
        <div className="flex items-center gap-1.5 ">
          <Button
            variant={"ghost"}
            aria-label="Previous page"
            onClick={() => {
              setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1)),
                setValue("page", String(currPage - 1));
            }}
            disabled={currPage === 1 || pageNum === undefined}
          >
            <ChevronDown className="h-4 w-4 " />
          </Button>
          <div className="flex items-center gap-1.5">
            <Input
              {...register("page")}
              className={cn(
                "w-12 h-8",
                errors.page && "focus-visible:ring-red-500"
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(handlePageSubmit)();
                }
              }}
            />

            <p className="text-zinc-700 text-sm space-x-1">
              <span>/</span>
              <span>{pageNum! - 1 ?? "x"}</span>
            </p>
          </div>
          <Button
            variant={"ghost"}
            aria-label="Next page"
            onClick={() => {
              setCurrPage((prev) => (prev + 1 < pageNum! ? prev + 1 : prev)),
                setValue("page", String(currPage + 1));
            }}
            disabled={currPage === pageNum! - 1 || pageNum === undefined}
          >
            <ChevronUp className="h-4 w-4 " />
          </Button>
        </div>
        <div className="space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-1.5" aria-label="zoom" variant={"ghost"}>
                <Search className="h-4 w-4" />
                {scale * 100} %<ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setScale(1)}>
                100 %
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(1.5)}>
                150 %
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2)}>
                200 %
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2.5)}>
                250 %
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            onClick={() => setRotation((prev) => prev + 90)}
            aria-label="rotate pdf 90 degrees"
            variant={"ghost"}
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          {selectedChat?.pdfUrl ? (
            <PdfFullScreen fileUrl={selectedChat!.pdfUrl} />
          ) : null}
        </div>
      </div>

      <div className="flex-1 w-full max-h-screen flex " ref={ref}>
        <SimpleBar
          autoHide={false}
          className="max-h-[calc(100vh-10rem)] w-full"
        >
          <Document
            file={selectedChat?.pdfUrl}
            className="max-h-full "
            onLoadSuccess={({ numPages }) => {
              setPageNum(numPages);
            }}
            onLoadError={() => {
              toast({
                title: "Error loading PDF",
                description: "Please try again later",
                variant: "destructive",
              });
            }}
            loading={
              <div className="flex justify-center ">
                <Loader2 className="my-24 h-8 w-8 animate-spin" />
              </div>
            }
          >
            <Page
              width={width ? width : 1}
              pageIndex={currPage - 1}
              rotate={rotation}
            />
          </Document>
        </SimpleBar>
      </div>
    </div>
  );
}

export default PDFViewer;
