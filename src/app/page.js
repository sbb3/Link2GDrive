"use client";

import { useState } from "react";
import { CloudDownload } from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [downloadLink, setDownloadLink] = useState("");
  const { toast } = useToast();

  const handleInputChange = (event) => {
    setDownloadLink(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/upload", {
        link: downloadLink,
      });
      console.log(response.data);
      setDownloadLink("");

      const source = new EventSource("/api/upload");

      source.onmessage = function (event) {
        // console.log(`Upload progress: ${event.data}%`);

        if (event.data === "100") {
          toast({
            title: "✅ Upload completed",
            description: "The upload has been completed",
          });
          source.close();
        }
      };
    } catch (error) {
      if (error.response.status === 401) {
        toast({
          variant: "destructive",
          title: "⚠️ Authentication Error",
          description: "You are not authenticated",
          status: "error",
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-20 p-6 ">
      <div className="w-full flex flex-col items-center justify-center gap-4 max-w-full">
        <div className="flex flex-row items-center justify-center max-w-full">
          <h1 className="m-0 flex-1 relative text-4xl leading-7 font-bold font-inherit inline-block max-w-full">
            Links to Google Drive
          </h1>
        </div>
        <div className="flex flex-row items-center justify-center max-w-full text-xl">
          <h1 className="m-0 flex-1 relative text-inherit leading-7 font-normal  inline-block max-w-full">
            Download any content directly to your Google Drive
          </h1>
        </div>
      </div>
      <div className="w-[700px] rounded-3xl bg-white flex flex-row flex-wrap items-center justify-start py-2 pr-2 pl-6 box-border gap-2 max-w-full text-left text-base text-lightslategray">
        <div className="flex-1 flex flex-row items-center justify-start min-w-56 max-w-full">
          <div className="flex-1 relative leading-7 inline-block max-w-full">
            <input
              type="text"
              placeholder="Download Link"
              className="w-full h-12 p-2 bg-transparent text-gray-900 text-left text-xs font-medium focus:outline-none"
              value={downloadLink}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="cursor-pointer py-2 px-8 bg-primary rounded-2xl flex flex-row items-center justify-start gap-2  hover:bg-primary-dark  focus:outline-none"
        >
          <div className="overflow-hidden flex flex-col items-center justify-start p-2">
            <CloudDownload className="w-6 h-6 text-gray-900" />
          </div>
          <span className="relative text-base leading-7 inline-block font-space-grotesk text-gray-900 text-left min-w-20 font-bold max-w-full">
            Download
          </span>
        </button>
      </div>
    </div>
  );
}
