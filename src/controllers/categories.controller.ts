import { Request, Response } from "express";
import { createCategory, getCategories, removeCategory } from "../services/categories.service";

export const getCategoriesController = async (req: Request, res: Response) => {
    const response = await getCategories();

    res.status(200).json(response);
}

export const createCategoryController = async (req: Request, res: Response) => {
    const response = await createCategory(req.body);

    res.status(201).json(response);
}

export const removeCategoryController = async (req: Request, res: Response) => {
    const response = await removeCategory(req.params.id);

    res.status(200).json(response);
}