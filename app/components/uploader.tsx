import { Button } from "@nextui-org/react";
import { useNavigate } from "@remix-run/react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone-esm";
import { toast } from "sonner";
import UploadIcon from "./upload-icon";

export default function Uploader() {
  const navigate = useNavigate();
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    console.log("hello");
    if (acceptedFiles.length == 1) {
      toast.success("Event has been created");
      let data = new FormData();
      data.append("file", acceptedFiles[0]);

      const res = await fetch("http://localhost:8000/denoise", {
        method: "POST",
        body: data,
      });
      const resJSON = await res.json();
      return navigate("/progress/" + resJSON["id"]);
    } else toast.error("Files are not accepted");
  }, []);
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/bmp": [],
    },
    multiple: false,
  });

  return (
    <div className="max-w-md mx-auto" {...getRootProps()}>
      <div className="rounded-lg bg-white shadow-lg overflow-hidden dark:bg-gray-900">
        <div className="px-4 py-5 sm:p-6">
          <div className="flow-root">
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-700">
              <div className="space-y-1 text-center">
                <div className="flex items-center justify-center">
                  <UploadIcon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>Drag and drop file here, or </span>
                  <input {...getInputProps()} />
                  <Button
                    className="mx-1 font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    variant="flat"
                    onClick={() => open()}
                  >
                    browse
                  </Button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
