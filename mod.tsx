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
        <canvas id="canvas"></canvas>
        <script>
          const canvas = document.getElementById('canvas'); 
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = 'green'; ctx.fillRect(10, 10, 150, 100);
        </script>
      </body>
    </html>
  );
}

function handler(req: Request) {
  const html = renderSSR(<App />);
  return new Response(html, {
    headers: {
      "content-type": "text/html",
    },
  });
}

console.log("Listening on http://localhost:8000");
await serve(handler);
