class Product {
    constructor(id ='', name ='', price = 0, quantity = 0, imageUrl ='', isOnSale =false) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
        this.isOnSale = isOnSale;
    }

    displayProducts(products){
        if (!areItemsAvailable(products)) {
            alert("No products available.");
            
        }else{
        let productsInfo = "All Products:\n";
        products.forEach(product => {
            productsInfo += `Name: ${product.name}\n`;
            productsInfo += `Price: ${product.price}\n`;
            productsInfo += `Quantity: ${product.quantity}\n`;
            productsInfo += `Image URL: ${product.imageUrl}\n`;
            productsInfo += `Is On Sale: ${product.isOnSale}\n\n`;
        });
    
        alert(productsInfo);
        }

    }
}

