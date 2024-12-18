import { Hono } from "hono";
import { getContent } from "../server/getContent";

import * as HonoJSX from "hono/jsx";
import * as HonoDOM from "hono/jsx/dom";
import * as _jsx_runtime from "hono/jsx/jsx-runtime";
import { getMDXComponent } from "mdx-bundler/client";
import { HonoInfoCard } from "./components/HonoInfoCard";

const app = new Hono();

const jsxComponents = {
  HonoInfoCard
}

app.get("/", (c) => {
  return c.json({ foo: "Bar" });
}).get("/blog/:slug", (c) => {
  const { code, frontmater } = getContent("blog", c.req.param("slug"));
  const Component = getMDXComponent(code, { HonoJSX, HonoDOM, _jsx_runtime });

  return c.render(<article>
    <h2>{frontmater.title}</h2>
    <Component components={jsxComponents} />
  </article>
  )
});

export default app;