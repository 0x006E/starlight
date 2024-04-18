import type { MetaFunction } from "@remix-run/node";
import Sky from "~/components/sky";
import Uploader from "~/components/uploader";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <Sky />
      <div className="flex flex-col items-center  justify-center gap-20 h-screen">
        <div>
          <h1 className="text-white text-4xl font-bold pt-20 text-center uppercase leading-relaxed">
            Welcome to Starlight
          </h1>
          <h2 className="text-xl opacity-70 text-white text-center">
            Principles of image enhancement through a magnifying glass
          </h2>
        </div>
        <Uploader />
      </div>
    </div>
  );
}
