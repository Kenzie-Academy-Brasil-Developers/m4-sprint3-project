import { QueryConfig } from "pg";
import { IProduct } from "../interfaces/product";
import { client } from "../database/database";
import format from "pg-format";

export const getOneProduct = async (productId: string) => {
   const productQueryString = `SELECT * FROM products WHERE id = $1`;

   const productQueryConfig: QueryConfig = {
      text: productQueryString,
      values: [productId],
   };

   const productData = await client.query(productQueryConfig);

   const categoryId = productData.rows[0].category_id;

   if (categoryId) {
      const categoryQueryString = `SELECT * FROM categories WHERE id = $1`;

      const categoryQueryConfig: QueryConfig = {
         text: categoryQueryString,
         values: [categoryId],
      };

      const categoryData = await client.query(categoryQueryConfig);

      return { ...productData.rows[0], category: categoryData.rows[0] };
   } else {
      return productData.rows[0];
   }
};

export const getProducts = async (categoryId?: string) => {
   const filterCategory = categoryId ? `WHERE category_id = ${categoryId}` : "";

   const query = format(`SELECT * FROM products %s;`, filterCategory);

   const data = await client.query(query);

   return data.rows;
};

export const createProduct = async (body: Omit<IProduct, "id">) => {
   const { name, price, category_id } = body;

   const queryString = `INSERT INTO products (name, price, category_id)
    VALUES ($1, $2, $3)
    RETURNING *;`;

   const queryConfig: QueryConfig = {
      text: queryString,
      values: [name, price, category_id],
   };

   const data = await client.query(queryConfig);

   return { message: "Product created sucessfully", product: data.rows[0] };
};

export const deleteProduct = async (productId: string) => {
   const queryString = `DELETE FROM products WHERE id = $1`;

   const queryConfig: QueryConfig = {
      text: queryString,
      values: [productId],
   };

   await client.query(queryConfig);

   return { message: "Product deleted sucessfully" };
};

export const editProduct = async (productId: string, body: Partial<IProduct>) => {
   const query = format(
      `UPDATE products SET (%I) = ROW(%L) WHERE id = %s RETURNING * ;`,
      Object.keys(body),
      Object.values(body),
      productId
   );

   const data = await client.query(query);

   return { message: "Product updated sucessfully", product: data.rows[0] };
};
