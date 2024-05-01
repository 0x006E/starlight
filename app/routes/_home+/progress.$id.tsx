import { Progress } from "@nextui-org/react";
import { useNavigate, useParams } from "@remix-run/react";
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
    channel: "completed",
    deserialize: (raw) => JSON.parse(raw) as FinishedMessage,
  });

  useEffect(() => {
    if (completedEvent && completedEvent.length > 0) {
      toast.success("Processed succesfully");
      navigate("/image");
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
