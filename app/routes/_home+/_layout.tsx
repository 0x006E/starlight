import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Sky from "~/components/sky";

export const meta: MetaFunction = () => {
  return [
    { title: "Starlight" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  // const greeting = useEventStream("http://localhost:8000/listen", {
  //   deserialize: (raw) =>
  //     JSON.parse(raw) as { size: number; current: number; image: string },
  // });
  // console.log(greeting);
  return (
    <div>
      <Sky />
      <div className="flex flex-col items-center  justify-center gap-20 h-screen">
        <div>
          <h1 className="text-white text-4xl font-bold pt-20 text-center uppercase leading-relaxed">
            Welcome to Starlight
          </h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
