import { promises as fs } from "fs";

class CartManager {
    static ultId = 1;
    constructor(path) {
        //constructor () {
        this.carts = [];
        //this.path = "./src/data/productos.json";
        this.path = path;
        //La clase debe contar con una variable this.path, el cual se inicializará desde el constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia.
    }

    async getCartById(id) {
        //Primero leo el archivo y genero el array: 
        const arrayCarts = await this.leerArchivo();
        const carrito = arrayCarts.find(item => item.id === id);

        if (!carrito) {
            return "Not Found";
        } else {
            return carrito;
        }
    }

    async addProduct(cid, pid) {
        //Primero leo el archivo y genero el array de carritos: 
        const arrayCarts = await this.leerArchivo();
        const cartIndex = arrayCarts.findIndex(item => item.id === cid);

        console.log(`cid: ${cid}`);
        console.log(`pid: ${pid}`);

        //Si encuentra el carrito me retorna el numero del indice del carrito buscado.
        //Y si no lo encuentra? Me retorna un indice que no es posible: -1

        if (cartIndex !== -1) {
            const productIndex = arrayCarts[cartIndex].products.findIndex(item => item.id === pid);

            // Entramos si el producto se encuentra en el carrito
            if (productIndex !== -1) {
                // Si se encuentra, se incrementa su cantidad en uno
                arrayCarts[cartIndex].products[productIndex].qty++;

            } else {
                // Si no se encuentra en el carrito, se agrega
                const nuevoProducto = {
                    id: pid,
                    qty: 1
                }
                arrayCarts[cartIndex].products.push(nuevoProducto);
            }
            //Una vez que agregamos el nuevo producto al carrito, guardamos el array de carritos en el archivo: 
            await this.guardarArchivo(arrayCarts);
        }
        return cartIndex;
    }

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            //const respuesta = await fs.readFile("./src/data/productos.json", "utf-8");
            const arrayCarritos = JSON.parse(respuesta);
            return arrayCarritos;
        } catch (error) {
            console.log("Tenemos un error al leer el archivo");
        }
    }

    async guardarArchivo(arrayCarts) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayCarts, null, 2))
        } catch (error) {
            console.log("Tenemos un error al guardar el archivo");
        }
    }
}

export default CartManager;