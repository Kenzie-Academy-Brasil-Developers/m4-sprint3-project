import { QueryConfig } from "pg";
import { IProduct } from "../interfaces/product";
import { client } from "../database/database";

export const getProducts = async () => {   
    const queryString = `SELECT * FROM products`;

    const data = await client.query(queryString);

    return data.rows;
}

export const createProduct = async (body: Omit<IProduct, 'id'>) => {
    const { name, price, category_id } = body;

    const queryString = `INSERT INTO products (name, price, category_id)
    VALUES ($1, $2, $3)
    RETURNING *;`

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [name, price, category_id]
    }

    const data = await client.query(queryConfig);

    return { message: "Product sucessfully created", product: data.rows[0] };
}