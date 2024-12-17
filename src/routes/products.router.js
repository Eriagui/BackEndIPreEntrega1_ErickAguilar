import { Router } from "express";
const router = Router();

//Importamos el productManager: 
//const ProductManager = require("./managers/product-manager.js");
import ProductManager from "../managers/product-managers.js"
const manager = new ProductManager("./src/data/productos.json"); 

// Ruta para listar todos los productos
router.get("/", async (req, res) => {
    //Guardamos el query limit: 
    let limit = req.query.limit;

    const products = await manager.getProducts(); 
    
    if(limit) {
        res.send(products.slice(0, limit)); 
    } else {
        res.send(products); 
    }
})

//Ruta para retornar un producto por id: 
router.get("/:pid",  async (req, res) => {
    let id = req.params.pid; 
    const productoBuscado = await manager.getProductById(parseInt(id)); 
    res.send(productoBuscado); 
})

//Ruta para agregar un nuevo producto
router.post("/", async (req, res) => {
    const newProduct = req.body;
    await manager.addProduct(newProduct)
    //products.push(newProduct);
    res.send({ status: "success", mensaje: "Product added succesfully" });
})

//Ruta para modificar un producto
router.put("/:pid",  async (req, res) => {
    let id = req.params.pid; 
    id = parseInt(id);
    const { title, description, code, price, status, stock, category, thumbnails  } = req.body; 
    const index = await manager.putProduct(id, title, description, code, price, status, stock, category, thumbnails);

    if (index !== -1) {
        res.send({ status: "success", mensaje: "Product successfully updated" });
    } else {
        //Si el producto no se encuentra, devuelve un error: 
        res.status(404).send({ status: "error", mensaje: "Product not found" });
    }
})

//Ruta para eliminar un producto
router.delete("/:pid", async (req, res) => {
    let id = req.params.pid; 
    id = parseInt(id);
    const index = await manager.deleteProduct(id);

    if(index !== -1) {
        res.send({status: "success", mensaje: "Product sucessfully deleted"});
    } else {
        res.status(404).send({status: "error", mensaje: "Product not found"}); 
    }
})

export default router;