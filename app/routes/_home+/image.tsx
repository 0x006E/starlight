import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

function Image() {
  return (
    <div>
      <div className="max-h-[60vh]  max-w-[80%] mb-20  rounded-lg drop-shadow-md p-5 bg-white grid items-center overflow-hidden">
        <ReactCompareSlider
          boundsPadding={0}
          itemOne={
            <ReactCompareSliderImage
              alt="Image one"
              src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/lady-1.png"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              alt="Image two"
              src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/lady-2.png"
              style={{
                backgroundColor: "white",
                backgroundImage:
                  "\n linear-gradient(45deg, #ccc 25%, transparent 25%),\n linear-gradient(-45deg, #ccc 25%, transparent 25%),\n linear-gradient(45deg, transparent 75%, #ccc 75%),\n linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                backgroundSize: "20px 20px",
              }}
            />
          }
          keyboardIncrement="5%"
          position={50}
          style={{
            height: "100%",
            width: "",
          }}
        />
      </div>
    </div>
  );
}

export default Image;
