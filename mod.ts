import { serve } from "https://deno.land/std@0.115.1/http/server.ts";

await serve(() => {
  return new Response("Hello world!", {
    headers: { "content-type": "text/plain" },
  });
});
