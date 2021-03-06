/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { h, renderSSR } from "https://deno.land/x/nano_jsx@v0.0.20/mod.ts";

function App() {
  return (
    <html>
      <head>
        <title>play me a song</title>
      </head>
      <body>
        <h1>play me a song</h1>
        <video autoplay controls></video>
        <canvas id="canvas"></canvas>
        <script src="./main.js"></script>
      </body>
    </html>
  );
}

async function handler(req: Request) {
  try {
    if (req.url.includes("main.js")) {
      const file = await Deno.readFile("./main.js");
      return new Response(file, {
        headers: {
          "content-type": "application/javascript",
        },
      });
    } else {
      const html = renderSSR(<App />);
      return new Response(html, {
        headers: {
          "content-type": "text/html",
        },
      });
    }
  } catch (err) {
    console.error(err);
    return new Response("Unexpected error", { status: 500 });
  }
}

console.log("Listening on http://localhost:8000");
await serve(handler);
