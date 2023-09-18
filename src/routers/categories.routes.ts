import { Router } from "express";
import { createCategoryController, getCategoriesController, removeCategoryController } from "../controllers/categories.controller";
import { isCategoryIdValid } from "../middlewares/isCategoryIdValid";
import { validation } from "../middlewares/validation";
import { createCategorySchema } from "../schemas/createCategorySchema";
import { isCategorySlugUnique } from "../middlewares/isCategorySlugUnique";

export const categoriesRouter = Router();

categoriesRouter.get("/", getCategoriesController);
categoriesRouter.post("/", validation(createCategorySchema), isCategorySlugUnique, createCategoryController);
categoriesRouter.delete("/:id", isCategoryIdValid, removeCategoryController);