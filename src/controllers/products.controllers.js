import { getConnection } from "../database/connection.js";
import sql from "mssql";

const pool = await getConnection();

export const getProducts = async (req, res) => {
  const result = await pool.request().query("select * FROM products");
  console.log(result);
  res.json(result.recordset);
};

export const getOneProduct = async (req, res) => {
  const result = await pool
    .request()
    .input("id", sql.Int, req.params.id)
    .query("SELECT * FROM PRODUCTS WHERE id = @id");

  if (result.rowsAffected == 0) {
    res.json({
      message: "Any product found",
    });
  } else {
    res.send(result.recordset[0]);
  }
};

export const createProduct = async (req, res) => {
  const result = await pool
    .request()
    .input("name", sql.VarChar, req.body.name)
    .input("price", sql.Decimal, req.body.price)
    .input("quantity", sql.Int, req.body.quantity)
    .input("description", sql.Text, req.body.description)
    .query(
      "INSERT INTO products (name,price,quantity,description) VALUES (@name,@price,@quantity,@description); SELECT SCOPE_IDENTITY() AS id"
    );

  console.log(result);

  res.json({
    id: result.recordset[0].id,
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    description: req.body.description,
  });
};

export const updateProduct = async (req, res) => {
  const result = await pool
    .request()
    .input("id", sql.VarChar, req.params.id)
    .input("name", sql.VarChar, req.body.name)
    .input("price", sql.Decimal, req.body.price)
    .input("quantity", sql.Int, req.body.quantity)
    .input("description", sql.Text, req.body.description)
    .query(
      "UPDATE PRODUCTS SET name = @name, price = @price, quantity = @quantity, description = @description WHERE id = @id"
    );

  if (result.rowsAffected[0] == 0) {
    res.json({
      message: "no product with id " + req.params.id,
    });
  } else {
    res.json({
      message: "product updated",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const result = await pool
    .request()
    .input("id", sql.Int, req.params.id)
    .query("DELETE FROM PRODUCTS WHERE ID = @id");

  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({ Message: "product not found" });
  } else {
    res.json({ message: "product deleted" });
  }
};