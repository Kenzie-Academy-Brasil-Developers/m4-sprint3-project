import "dotenv/config";
import express from "express";
import { productsRouter } from "./routers/products.routes";
import { categoriesRouter } from "./routers/categories.routes";

export const app = express();

app.use(express.json());

app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);

