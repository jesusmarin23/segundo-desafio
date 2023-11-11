class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const product_id = this.generateUniqueId();
        const product = {
            id: product_id,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        };
        this.products.push(product);
        return product;
    }

    getProductById(product_id) {
        const product = this.products.find(product => product.id === product_id);
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        return product;
    }

    updateProduct(product_id, field, value) {
        const product = this.getProductById(product_id);
        product[field] = value;
        return product;
    }

    deleteProduct(product_id) {
        const index = this.products.findIndex(product => product.id === product_id);
        if (index !== -1) {
            this.products.splice(index, 1);
        } else {
            throw new Error("Producto no encontrado");
        }
    }

    generateUniqueId() {
        return Math.random().toString(36).substr(2, 9); // Simple generador de ID único
    }
}

// Creara una instancia de ProductManager
const manager = new ProductManager();

// Llamara a getProducts recién creada la instancia
const products = manager.getProducts();
console.log("Productos iniciales:", products);

// Llamara al método addProduct
const newProduct = manager.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
);
console.log("Producto agregado:", newProduct);

// Llamara a getProducts nuevamente
const updatedProducts = manager.getProducts();
console.log("Productos actualizados:", updatedProducts);

// Llamara a getProductById
try {
    const productById = manager.getProductById(newProduct.id);
    console.log("Producto encontrado por ID:", productById);
} catch (error) {
    console.error(error.message);
}

// Llamara a updateProduct
try {
    const updatedProduct = manager.updateProduct(newProduct.id, 'price', 250);
    console.log("Producto actualizado:", updatedProduct);
} catch (error) {
    console.error(error.message);
}

// Llamara a deleteProduct
try {
    manager.deleteProduct(newProduct.id);
    console.log("Producto eliminado");
} catch (error) {
    console.error(error.message);
}
