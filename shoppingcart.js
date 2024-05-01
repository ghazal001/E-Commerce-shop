class ShoppingCart {
    constructor(items,totalCost) {
        this.items = items || [];
        this.totalCost = parseFloat(totalCost) || 0;
    }


    addItem(userIndex,users,products) {
        let productId, productIndex, requiredQuantity, productExistIndex
        let idNotExist = true;
        let productNotAvailable = true;
        let notValidQuantity = true;
        let productExist = false;

        let items = users[userIndex].shoppingCart.items;
        let totalCost = users[userIndex].shoppingCart.totalCost;
        console.log(items);
        productId = promptForNumber(`Please provide the Id of the product that you want to buy`,1);
        // Validate if the product exists and is available
        while (idNotExist) {
            for (let i = 0; i < products.length; i++) {
                if (productId == products[i].id) {
                    idNotExist = false
                    productIndex = i
                    if (products[i].isAvailable == "No") {
                        productNotAvailable = false
                    }
                    break
                }
            }
            if (idNotExist == true) {
                productId = promptForNumber("The ID you provided does not exist. Please enter a valid product ID:",1);
            }
            if (!productNotAvailable) {
                alert("The product that you want isn't available , choose another one ");
                return users;
            }
        }
        // Prompt for the quantity of the product to be added to the cart
        const product = products[productIndex]
        while (notValidQuantity) {
            requiredQuantity = promptForNumber(`give the quantity you want to add but < ${product.quantity}`,1);
            if (!isNaN(requiredQuantity) && requiredQuantity > 0 && requiredQuantity < parseInt(product.quantity)) {
                notValidQuantity = false
            }
        }
        // Check if the product already exists in the cart
        for (let i = 0; i < items.length; i++) {
            if (productId == items[i].product.id) {
                productExist = true
                productExistIndex = i
                break
            }
        }
        // Update cart based on whether the product already exists
        if (productExist) {
            items[productExistIndex].requiredQuantity += requiredQuantity
            alert("Quantity updated in your shopping cart")
        }
        else {
            items.push({ product, requiredQuantity })
            alert("The product has been added to your shopping cart")
        }
        totalCost = requiredQuantity * product.price;

        users[userIndex].shoppingCart.items = items;
        users[userIndex].shoppingCart.totalCost = users[userIndex].shoppingCart.totalCost + totalCost;
        return users;
    }

    removeItem(userIndex, users) {
        let requiredProducts = users[userIndex].shoppingCart.items;
        let productId = promptForNumber("Please enter the ID of the product that you want to remove:",1);
        const productIndex = requiredProducts.findIndex(item => item.product.id == productId);
        if (productIndex !== -1) {
            const removedProduct = requiredProducts.splice(productIndex, 1)[0];
            alert(`Product with ID ${productId} has been removed from the shopping cart.`);
            users[userIndex].shoppingCart.totalCost -= (removedProduct.product.price * removedProduct.requiredQuantity);
        } else {
            alert(`Product with ID ${productId} does not exist in the shopping cart.`);
        }
        return users
    }

    displayCart(userIndex , users) {
        console.log("Shopping Cart:");
        let items = users[userIndex].shoppingCart.items
        let totalCost = users[userIndex].shoppingCart.totalCost
        if (!areItemsAvailable(items)) {
            alert("your shopping cart is empty.!")
        }
        else {
            // Prepare the message to display the items and total cost in the shopping cart
            let cartItemsMessage = ""
            for (let item of items) {
                cartItemsMessage += `${item.requiredQuantity} ${item.product.name} with total price ${item.requiredQuantity * item.product.price}
`
            }
            cartItemsMessage += `Total Cost: ${totalCost}`;
            alert(cartItemsMessage);
            }
        }

    // placeOrder(userIndex,users,products){
    //     let totalCost = users[userIndex].shoppingCart.totalCost;
    //     let history = users[userIndex].shoppingCart.history;
    //     let requiredProducts = users[userIndex].shoppingCart.items;
        
    //     for (let i = 0; i < requiredProducts.length; i++) {
    //         const item = requiredProducts[i];
    //         const productId = item.product.id;
    //         const requiredQuantity = item.requiredQuantity;
    //         const productIndex = products.findIndex(product => product.id === productId);
            
    //         // If the product is not available or its quantity exceeds the available stock, remove it from the order
    //         if (productIndex === -1 || products[productIndex].isOnSale === "0") {
    //             alert(`${item.product.name} is not available in the store anymore. It will be removed from the order.`);
    //             users[userIndex].shoppingCart.items.splice(i, 1);
    //             users[userIndex].shoppingCart.totalCost -= requiredQuantity * item.product.price
    //             totalCost -= requiredQuantity * item.product.price
    //             i--;
    //             if (requiredProducts.length == 0) {
    //                 alert("There are no products in the Shopping Cart anymore!")
    //                 break
    //             }
    //         } else {
    //             const product = products[productIndex];
    //             let oldQuantity = requiredQuantity
    //             // Prompt the user for a valid quantity if the entered quantity is invalid
    //             while (isNaN(requiredQuantity) || requiredQuantity <= 0 || requiredQuantity > product.quantity) {
    //                 alert(`The quantity of the ${product.name} is more than in the store currently. Please enter a valid quantity.`);
    //                 requiredQuantity = parseInt(prompt(`Enter quantity for ${product.name}:`));
    //             }
    //             // Update the product quantity and total cost based on the updated quantity
    //             product.quantity -= requiredQuantity;
    //             if (oldQuantity != requiredQuantity) {
    //                 totalCost -= (product.price * oldQuantity);
    //                 totalCost += (product.price * requiredQuantity);
    //             }
    //         }
    //     }
    //     // Apply discount if the total cost is more than 50
    //     if (totalCost > 50) {
    //         totalCost *= 0.9;
    //         alert(`A 10% discount has been applied to the order because it is more than $50. The new cost is $${totalCost.toFixed(2)}.`);
    //     }
    //     let items = users[userIndex].shoppingCart.items;
    //     if (items.length > 0) {
    //         history.push({ items, totalCost });
    //         alert(`The order has been finished.`);
    //     }

    //     // Clear the shopping cart after completing the order
    //     users[userIndex].shoppingCart.items = [];
    //     users[userIndex].shoppingCart.totalCost = 0;
    //     return users;

    // }

    placeOrder(userIndex,users,products){
    let totalCost = 0;
    let requiredProducts = users[userIndex].shoppingCart.items;
    let productsToRemove = [];
    let orders = users[userIndex].orders;

    console.log("orders",orders);

    for (let i = 0; i < requiredProducts.length; i++) {
        const item = requiredProducts[i];
        const productId = item.product.id;
        const requiredQuantity = item.requiredQuantity;
        const productIndex = products.findIndex(product => product.id === productId);

        if (productIndex === -1 || products[productIndex].isOnSale === "No" || requiredQuantity > products[productIndex].quantity) {
            // If the product is not available or its quantity exceeds the available stock, mark it for removal
            productsToRemove.push(item);
            alert(`${item.product.name} is not available in the store or its quantity exceeds the available stock. It will be removed from the order.`);
        } else {
            const product = products[productIndex];
            // Update the product quantity and total cost based on the updated quantity
            product.quantity -= requiredQuantity;
            totalCost += product.price * requiredQuantity;
        }
    }
    // Remove products marked for removal
    for (let product of productsToRemove) {
        const index = requiredProducts.findIndex(item => item.product.id === product.product.id);
        users[userIndex].shoppingCart.items.splice(index, 1);
    }

    // If there are items remaining in the shopping cart, add the order to history
    if (users[userIndex].shoppingCart.items.length > 0) {
        console.log(11);
        console.log(orders);
        orders.push({items:users[userIndex].shoppingCart.items,totalCost});

        alert(`The order has been finished.`);
    } else {
        alert("There are no products in the Shopping Cart anymore!");
    }

    // Clear the shopping cart after completing the order
    users[userIndex].shoppingCart.items = [];
    users[userIndex].shoppingCart.totalCost = 0;

    return users;
    }
    
    displayHistory(users,userIndex){
        // let orderHistory = users[userIndex].shoppingCart.history;
        let orders = users[userIndex].orders;
        console.log(orders);
        let alertMessage = "Order History:\n";
        if (orders.length == 0) {
            alert("There is no order in the history yet! \nMake an order to see this special feature")
        }
        for (let i = 0; i < orders.length; i++) {
            const order = orders[i];
            alertMessage += `Order ${i + 1}:\n`;
            for (let j = 0; j < order.items.length; j++) {
                const item = order.items[j];
                alertMessage += `Product: ${item.product.name}\n`;
                alertMessage += `Required Quantity: ${item.requiredQuantity}\n`;
            }
            alertMessage += `Total Cost of Order ${i + 1}: $${order.totalCost}\n`;
        }

        alert(alertMessage);
    }
    

}

function areItemsAvailable(items) {
    return items && items.length > 0;
}
function promptForValue(promptMessage) {
    let value;
    do {
        value = prompt(promptMessage);
    } while (!value);
    return value;
}
function promptForNumber(promptMessage, minValue) {
    let value;
    do {
        value = parseFloat(prompt(promptMessage));
    } while (isNaN(value) || value < minValue);
    return value;
}
function promptForValidIndex(items, itemName) {
    let validId = false;
    let index = -1;
    let id = prompt(`Please enter a valid ID of an existing ${itemName}:`);
    do {
        for (let i = 0; i < items.length; i++) {
            if (id === String(items[i].id)) {
                validId = true;
                index = i;
                break;
            }
        }
        if (!validId) {
            id = prompt(`The ${itemName} ID is not valid. Please enter another valid ID:`);
        }
    } while (!validId);
    return { id, index };
}