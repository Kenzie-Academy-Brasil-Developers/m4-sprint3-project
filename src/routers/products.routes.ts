import { Router } from "express";
import { createProductController } from "../controllers/products.controller";

export const productsRouter = Router();

productsRouter.post("/", createProductController);