import express from "express";
import cors from "cors";
import routes from "@routes";
import { errorHandler, notFoundHandler, requestHandler } from "@middlewares";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use(notFoundHandler);
app.use(requestHandler);

export default app;