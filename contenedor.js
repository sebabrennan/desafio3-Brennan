const fs = require('fs');

class Contenedor {
    constructor (fileData){
        this.fileData = fileData;
    }

    async save(product) {
        try{
            const data = await fs.promises.readFile(`./products.json`, 'utf-8');
            const products = JSON.parse(data);
            const id = products.length + 1;
            product.id = id;
            products.push(product);
            const productsString = JSON.stringify(products)
            await fs.promises.writeFile(`./products.json`, productsString);
            return product.id;
        } catch(e){
            return `Error al guardar: ${e}`
        };
    };

    async getById(id) {
        const data = await fs.promises.readFile(`./products.json`, 'utf-8');
        const products = JSON.parse(data);
        const product = products.find((product) => product.id == id);
        if(product){
            return product;
        } else {
            return `Producto no encontrado`;
        };
    };

    async getAll() {
        try{
            const data = await fs.promises.readFile(`./products.json`, 'utf-8');
            return JSON.parse(data);
        } catch(e) {
            return [];
        }

    };

    async deleteById(id) {
        const data = await fs.promises.readFile(`./products.json`, 'utf-8');
        const products = JSON.parse(data);
        const productId = products.find((product) => product.id == id);
        const filterProduct = products.filter((products) => products.id !== id);
        try{
            if(productId){
                const productsString = JSON.stringify(filterProduct);
                await fs.promises.writeFile(`${this.fileData}/products.json`, productsString);
                return `El producto con ID: ${id} ha sido eliminado`;
            } else {
                console.log(`No se ha encontrado el producto con el ID: ${id}`)
            }
        } catch(e){
            console.error(`Se ha producido un error al eliminar por ID: ${e}`)
        }
    };

    async deleteAll() {
        const clearProducts = [];
        const productsString = JSON.stringify(clearProducts);
        await fs.promises.writeFile(`./products.json`, productsString);
        return `Todos los productos han sido eliminados`;
    };
}

async function start() {
    const db = new Contenedor("data");
    // const products = await db.save({ title: "Regla", price: 120, thumbnail: 'https://concepto.de/wp-content/uploads/2021/03/regla-graduada-e1614695493648.jpg' })
    // const product = await db.getById(2);
    const products = await db.getAll()
    // const products = await db.deleteAll();
    // const products = await db.deleteById(3);
    console.log(products);
};

start();

module.exports = Contenedor