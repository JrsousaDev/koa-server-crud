import Koa from "koa";
import bodyParser from "koa-bodyparser";
import logger from "koa-logger";
import Router from "koa-router";
import cors from "koa-cors";

import { version } from "../package.json";
import { userPost } from "./api/user/userPost";
import routerUser from "./shared/routes/userRoutes";
import { auth } from "./auth/auth";

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

routerOpen.post("/api/user", userPost);

app.use(routerOpen.routes());
app.use(auth);
app.use(routerUser.routes());

app.use((ctx) => {
  ctx.status = 404;
});

export default app;
