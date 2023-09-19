import { Router } from "express";
import { createProductController, deleteProductController, editProductController, getOneProductController, getProductsController } from "../controllers/products.controller";
import { validation } from "../middlewares/validation";
import { createProductSchema } from "../schemas/createProductSchema";
import { isProductIdValid } from "../middlewares/isProductIdValid";

export const productsRouter = Router();

productsRouter.get("/", getProductsController);
productsRouter.get("/:id", isProductIdValid, getOneProductController);
productsRouter.post("/", validation(createProductSchema), createProductController);
productsRouter.delete("/:id", isProductIdValid, deleteProductController);
productsRouter.patch("/:id", isProductIdValid, editProductController);