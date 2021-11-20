/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { h, renderSSR, Helmet } from "./nano.ts";
import { Application, Router } from "https://deno.land/x/oak@v10.0.0/mod.ts";
import { Hello } from "./components/Hello.tsx";
import Comments from "./components/CommentsList.tsx";

const { files } = await Deno.emit("./client.tsx", {
  bundle: "module",
  compilerOptions: {
    jsxFactory: "h",
    target: "es2015",
    module: "es2015",
  },
});

const comments = ["server side comment one"];

const App = () => (
  <div>
    <Helmet>
      <title>Nano JSX SSR</title>
      <meta
        name="description"
        content="Server Side Rendered Nano JSX Application"
      />
    </Helmet>

    <Helmet footer>
      <script src="/bundle.js"></script>
    </Helmet>

    <h2>Comments</h2>
    <div id="comments">
      <Comments comments={comments} />
    </div>
  </div>
);

const ssr = renderSSR(<App />);
const { body, head, footer } = Helmet.SSR(ssr);

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${head.join("\n")}
  </head>
  <body>
    ${renderSSR(<Hello />)}
    ${body}
    ${footer.join("\n")}
    <script type="module" src="/bundle.js"></script>
  </body>
</html>`;

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = html;
  })
  .get("/bundle.js", (context) => {
    context.response.body = files["deno:///bundle.js"];
    context.response.headers.set("Content-Type", "text/javascript");
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ?? "localhost"
    }:${port}`
  );
});

await app.listen({ port: 8080 });
