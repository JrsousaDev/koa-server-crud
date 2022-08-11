import Koa from "koa";
import bodyParser from "koa-bodyparser";
import logger from "koa-logger";
import Router from "koa-router";
import cors from "koa-cors";

import { version } from "../package.json";

const app = new Koa();

const routerOpen = new Router();

app.use(logger());
app.use(cors({ maxAge: 86400 }));
app.use(bodyParser());

routerOpen.get("/api/version", (ctx) => {
  ctx.status = 200;
  ctx.body = {
    status: "OK",
    version,
  };
});


app.use((ctx) => {
  ctx.status = 404;
});

export default app;
