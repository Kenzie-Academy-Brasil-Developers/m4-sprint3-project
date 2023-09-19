import { Request, Response } from "express";
import { createProduct, getProducts } from "../services/products.service";


export const getProductsController = async (req: Request, res: Response) => {
    const { category } = req.query;

    const response = await getProducts(category as string);

    res.status(200).json(response);
}

export const createProductController = async (req: Request, res: Response) => {
    const response = await createProduct(req.body);

    res.status(201).json(response);
}