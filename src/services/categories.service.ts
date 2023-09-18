import { QueryConfig } from "pg";
import { ICategory } from "../interfaces/category";
import { client } from "../database/database";

export const getCategories = async () => {
   const queryString = `SELECT * FROM categories;`;

   const data = await client.query(queryString);

   return data.rows;
};

export const createCategory = async (body: Omit<ICategory, "id">) => {
   const { name, slug } = body;
   const queryString = `INSERT INTO categories (name, slug)
    VALUES ($1, $2)
    RETURNING *;`;

   const queryConfig: QueryConfig = {
      text: queryString,
      values: [name, slug],
   };

   const data = await client.query(queryConfig);

   return { message: "Category created sucessfully", category: data.rows[0] };
};

export const removeCategory = async (id: string) => {
   const queryString = `DELETE FROM categories WHERE id = $1;`;

   const queryConfig: QueryConfig = {
      text: queryString,
      values: [id],
   };

   await client.query(queryConfig);

   return { message: "Category deleted sucessfully" };
};
