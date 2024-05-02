import { useNavigate, useSearchParams } from "@remix-run/react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import Download from "~/components/downloader";

const API_URL = "http://localhost:8000";

function Image() {
  const [urlSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const real = urlSearchParams.get("real");
  const denoised = urlSearchParams.get("denoised");
  if (!real || !denoised) return navigate("/");
  console.log(real, denoised);
  return (
    <div className="flex items-center flex-col">
      <div className="mx-auto max-h-[60vh]  max-w-[80%] mb-20  rounded-lg drop-shadow-md p-5 bg-white grid items-center overflow-hidden">
        <ReactCompareSlider
          boundsPadding={0}
          itemOne={
            <ReactCompareSliderImage alt="Image one" src={API_URL + real} />
          }
          itemTwo={
            <ReactCompareSliderImage alt="Image two" src={API_URL + denoised} />
          }
          keyboardIncrement="5%"
          position={50}
          style={{
            height: "100%",
            width: "",
          }}
        />
      </div>
      <Download url={API_URL + denoised} filename="denoised" />
    </div>
  );
}

export default Image;
