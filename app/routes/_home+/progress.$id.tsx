import { Progress } from "@nextui-org/react";
import { createSearchParams, useNavigate, useParams } from "@remix-run/react";
import { useEventStream } from "@remix-sse/client";
import { useEffect } from "react";
import { toast } from "sonner";

type ProgressMessage = {
  size: number;
  current: number;
};
type FinishedMessage = {
  id: string;
  filepath: string;
  realpath: string;
};

type ResponseMessage = FinishedMessage | ProgressMessage;

function ProgressBar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const event = useEventStream("http://localhost:8000/listen/" + id, {
    returnLatestOnly: true,
    deserialize: (raw) => JSON.parse(raw) as ProgressMessage,
  });
  const completedEvent = useEventStream("http://localhost:8000/listen/" + id, {
    returnLatestOnly: true,
    channel: "end",
    deserialize: (raw) => JSON.parse(raw) as FinishedMessage,
  });
  console.log(event, completedEvent);

  useEffect(() => {
    console.log(completedEvent);
    if (completedEvent) {
      toast.success("Processed succesfully");
      const data = {
        real: completedEvent.realpath,
        denoised: completedEvent.filepath,
      };
      navigate({
        pathname: "/image",
        search: createSearchParams(data).toString(),
      });
    }
  }, [completedEvent]);

  const value = event?.current ?? 0;
  const maxValue = event?.size ?? 100;

  return (
    <Progress
      aria-label="Processing..."
      label={"Processing..."}
      size="md"
      value={value}
      classNames={{
        base: "max-w-md",
        track: "bg-transparent border border-default border-white rounded-none",
        indicator: "bg-white rounded-none",
        label: "tracking-wider font-medium text-white ",
        value: "text-white/60",
      }}
      showValueLabel={true}
      className="max-w-md"
      minValue={0}
      maxValue={maxValue}
    />
  );
}

export default ProgressBar;
