import { Router } from "express";
const router = Router(); 

//Importamos el cartManager: 
//const ProductManager = require("./managers/product-manager.js");
import CartManager from "../managers/cart-manager.js"
const manager = new CartManager("./src/data/carts.json"); 

//Ruta para retornar los productos que un carrito tiene dado el id del carrito: 
router.get("/:cid",  async (req, res) => {
    let id = req.params.cid; 
    const carritoBuscado = await manager.getCartById(parseInt(id)); 
    res.send(carritoBuscado.products); 
})

//Ruta para agregar el producto con id pid al carrito con id cid: 
router.post("/:cid/product/:pid",  async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    cid = parseInt(cid);
    pid = parseInt(pid);

    let index = await manager.addProduct(cid, pid);

    if (index !== -1) {
        res.send({ status: "success", mensaje: "Cart successfully updated" });
    } else {
        //Si el carrito no se encuentra, devuelve un error: 
        res.status(404).send({ status: "error", mensaje: "Cart not found" });
    }

})

export default router; 