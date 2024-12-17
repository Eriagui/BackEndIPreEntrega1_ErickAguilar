//const fs = require("fs").promises;
import { promises as fs } from "fs";

class ProductManager {
    static ultId = 1;
    constructor(path) {
        //constructor () {
        this.products = [];
        //this.path = "./src/data/productos.json";
        this.path = path;
        //La clase debe contar con una variable this.path, el cual se inicializará desde el constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia.
    }

    //async addProduct({title, description, price, img, code, stock}) {

    async addProduct({ title, description, code, price, status = true, stock, category, thumbnails }) {


        //Yo puedo leer el archivo y guardarme el array con los productos: 
        const arrayProductos = await this.leerArchivo();

        //Validamos que se agregaron todos los campos a excepción del thumbnails: 
        if (!title || !description || !code || !price || !stock || !category) {
            console.log("Todos los campos son obligatorios, favor de verificar.");
            return;
        }

        //Validamos que el código sea único: 
        if (arrayProductos.some(item => item.code === code)) {
            console.log("El codigo debe ser unico.");
            return;
        }

        //Si pasamos las validaciones, ahora podemos crear el objeto: 
        const nuevoProducto = {
            id: ++ProductManager.ultId,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        }

        //Una vez que lo puedo crear lo pusheo al array: 
        arrayProductos.push(nuevoProducto);

        //Una vez que agregamos el nuevo producto al array, guardamos el array en el archivo: 
        await this.guardarArchivo(arrayProductos);
    }

    async getProducts() {
        const arrayProductos = await this.leerArchivo();
        return arrayProductos;
    }

    async getProductById(id) {
        //Primero leo el archivo y genero el array: 
        const arrayProductos = await this.leerArchivo();
        const producto = arrayProductos.find(item => item.id === id);


        if (!producto) {
            return "Not Found";
        } else {
            return producto;
        }
    }

    async putProduct(id, title, description, code, price, status, stock, category, thumbnails) {
        //Primero leo el archivo y genero el array: 
        const arrayProductos = await this.leerArchivo();
        //Buscamos el índice
        const index = arrayProductos.findIndex(item => item.id === id);


        //Si lo encuentra me retorna el numero del indice del producto buscado.
        //Y si no lo encuentra? Me retorna un indice que no es posible: -1

        if (index !== -1) {
            //Si el producto existe y se encontró, se actualizan los datos enviados: 
            if (title) {
                arrayProductos[index].title = title;
            }
            if (description) {
                arrayProductos[index].description = description;
            }
            if (code) {
                arrayProductos[index].code = code;
            }
            if (price) {
                arrayProductos[index].price = price;
            }
            if (status) {
                arrayProductos[index].status = status;
            }
            if (stock) {
                arrayProductos[index].stock = stock;
            }
            if (category) {
                arrayProductos[index].category = category;
            }
            if (thumbnails) {
                arrayProductos[index].thumbnails = thumbnails;
            }

            //Verificamos por consola que todo se actualizo. 
            console.log(arrayProductos[index]);

            //Una vez que actualizamos el nuevo producto al array, guardamos el array en el archivo: 
            await this.guardarArchivo(arrayProductos);
        }

        return index;
    }

    async deleteProduct(id) {
        //Primero leo el archivo y genero el array: 
        const arrayProductos = await this.leerArchivo();

        //Buscamos el índice
        const index = arrayProductos.findIndex(item => item.id == id);

        if (index !== -1) {
            //Si existe el producto, se elimina
            arrayProductos.splice(index, 1);
            //Una vez que se elimina el producto, guardamos el array en el archivo: 
            await this.guardarArchivo(arrayProductos);
        }

        return index;
    }


    //Se pueden armar unos métodos auxiliares que guarden el archivo y recuperen los datos: 

    async guardarArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2))
        } catch (error) {
            console.log("Tenemos un error al guardar el archivo");
        }
    }

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            //const respuesta = await fs.readFile("./src/data/productos.json", "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;
        } catch (error) {
            console.log("Tenemos un error al leer el archivo");
        }
    }
}

export default ProductManager;

//module.exports = ProductManager; 