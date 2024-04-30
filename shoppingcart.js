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

    // calculateTotalCost() {
    //     this.totalCost = this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    // }

    // applyDiscount(discount) {
    //     this.totalCost -= discount;
    // }

}
// promptAdminActions();
// promptUserActions()
// getUsersFromLocalStorage();
// createUserAccount();
// viewAccountDetailsUser() ;
// deleteUser();
// addProductToCart();
// removeItemFromCart();
// updateQuantityInCart();
// promptLoginOrSignup();
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