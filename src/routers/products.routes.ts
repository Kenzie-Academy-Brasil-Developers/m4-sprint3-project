import { Router } from "express";
import { createProductController, getOneProductController, getProductsController } from "../controllers/products.controller";

export const productsRouter = Router();

productsRouter.get("/", getProductsController);
productsRouter.post("/", createProductController);