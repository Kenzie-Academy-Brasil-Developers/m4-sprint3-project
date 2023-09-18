import { NextFunction, Request, Response, query } from "express";
import { QueryConfig } from "pg";
import { client } from "../database/database";
import { AppError } from "../errors/errors";

export const isCategorySlugUnique = async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.body;

    const queryString = `SELECT * FROM categories WHERE slug = $1`;
    
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [slug]
    }

    const data = await client.query(queryConfig);

    if(data.rows[0]){
        throw new AppError("There is already a category with this slug registered", 401);
    }    

    next();
}