import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database/database";
import { AppError } from "../errors/errors";

export const isCategoryIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const queryString = `SELECT * FROM categories WHERE id = $1;`;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.params.id],
    }

    const data = await client.query(queryConfig);

    if(!data.rows[0]){
        throw new AppError("Not found any category with this id", 404);
    }

    return next();
}