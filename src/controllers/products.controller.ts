import { Request, Response } from "express";
import { createProduct, deleteProduct, editProduct, getOneProduct, getProducts } from "../services/products.service";

export const getOneProductController = async (req: Request, res: Response) => {
    const { id } = req.params;

    const response = await getOneProduct(id);

    res.status(200).json(response);
}

export const getProductsController = async (req: Request, res: Response) => {
    const { category } = req.query;

    const response = await getProducts(category as string);

    res.status(200).json(response);
}

export const createProductController = async (req: Request, res: Response) => {
    const response = await createProduct(req.body);

    res.status(201).json(response);
}

export const deleteProductController = async (req: Request, res: Response) => {
    const { id } = req.params;

    const response = await deleteProduct(id);

    res.status(200).json(response);
}    

export const editProductController = async (req: Request, res: Response) => {
    const { id } = req.params;

    const response = await editProduct(id, req.body);

    res.status(200).json(response);
}