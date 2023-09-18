import { Router } from "express";
import { createCategoryController, getCategoriesController, removeCategoryController } from "../controllers/categories.controller";

export const categoriesRouter = Router();

categoriesRouter.get("/", getCategoriesController);
categoriesRouter.post("/", createCategoryController);
categoriesRouter.delete("/:id", removeCategoryController);