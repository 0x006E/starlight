import { Button } from "@nextui-org/react";
/**
 * Modern browsers can download files that aren't from same origin this is a workaround to download a remote file
 * @param `url` Remote URL for the file to be downloaded
 */

export default function Download({
  url,
  filename,
}: {
  url: string;
  filename: string;
}) {
  const downloadFile = async () => {
    // text content

    const file = await (await fetch(url)).blob();
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = filename + ".jpg"; // simulate link click
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Button onClick={downloadFile} aria-label="download file">
      Download
    </Button>
  );
}
