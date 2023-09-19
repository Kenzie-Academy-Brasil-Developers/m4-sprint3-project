import { QueryConfig } from "pg";
import { IProduct } from "../interfaces/product";
import { client } from "../database/database";
import format from "pg-format";

export const getProducts = async (categoryId?: string) => {   
    const filterCategory = categoryId ? `WHERE category_id = ${categoryId}` : "";

    const query = format(`SELECT * FROM products %s;`, filterCategory);

    const data = await client.query(query);

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