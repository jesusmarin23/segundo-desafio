
class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data, 'utf8');
  }

  addProduct(product) {
    const newProduct = {
      id: this.products.length + 1,
      ...product,
    };

    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  updateProduct(id, updatedFields) {
    const index = this.products.findIndex(product => product.id === id);

    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedFields };
      this.saveProducts();
      return this.products[index];
    }

    return null;
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);

    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1);
      this.saveProducts();
      return deletedProduct[0];
    }

    return null;
  }
}


const productManager = new ProductManager('productos.json');


const newProduct = {
  title: 'Producto de Ejemplo',
  description: 'Descripción del producto de ejemplo',
  price: 19.99,
  thumbnail: 'imagen.jpg',
  code: 'ABC123',
  stock: 50,
};

const addedProduct = productManager.addProduct(newProduct);
console.log('Producto agregado:', addedProduct);


const allProducts = productManager.getProducts();
console.log('Todos los productos:', allProducts);


const productIdToFind = 1;
const foundProduct = productManager.getProductById(productIdToFind);
console.log('Producto encontrado por ID:', foundProduct);


const productIdToUpdate = 1;
const updatedFields = { price: 24.99, stock: 40 };
const updatedProduct = productManager.updateProduct(productIdToUpdate, updatedFields);
console.log('Producto actualizado:', updatedProduct);


const productIdToDelete = 1;
const deletedProduct = productManager.deleteProduct(productIdToDelete);
console.log('Producto eliminado:', deletedProduct);


const remainingProducts = productManager.getProducts();
console.log('Productos restantes:', remainingProducts);
