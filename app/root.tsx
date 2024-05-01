import "@fontsource/ibm-plex-mono";

import { NextUIProvider } from "@nextui-org/react";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { EventSourceMap, EventSourceProvider } from "remix-utils/sse/react";
import { Toaster } from "sonner";
import stylesheet from "~/globals.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];
export function Layout({ children }: { children: React.ReactNode }) {
  let map: EventSourceMap = new Map();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <EventSourceProvider value={map}>
          <NextUIProvider>
            {children}
            <Toaster className="z-1" />
            <ScrollRestoration />
            <Scripts />
          </NextUIProvider>
        </EventSourceProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
