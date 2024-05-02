import { Router } from "express";
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from "../controllers/products.controllers.js";

const router = Router();

router.get("/productos", getProducts);

router.get("/productos/:id", getOneProduct);

router.post("/productos", createProduct);

router.put("/productos/:id", updateProduct);

router.delete("/productos/:id", deleteProduct);

export default router;