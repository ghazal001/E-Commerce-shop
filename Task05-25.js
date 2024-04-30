
class product {
    constructor(id, name, price, quantity, imageUrl, isOnSale) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
        this.isOnSale = isOnSale;
    }
}

class shoppingCart {
    constructor() {
        this.items = [];
        this.totalCost = 0;
    }


    addItem(product, quantity) {
        if (product.quantity >= quantity) {
            this.items.push({ product, quantity });
            product.quantity -= quantity;
            this.calculateTotalCost();
            return true;
        } else {
            console.log("Not enough quantity available.");
            return false;
        }
    }

    removeItem(product, quantity) {
        const index = this.items.findIndex(item => item.product === product);
        if (index !== -1) {
            if (this.items[index].quantity > quantity) {
                this.items[index].quantity -= quantity;
            } else {
                this.items.splice(index, 1);
            }
            product.quantity += quantity;
            this.calculateTotalCost();
            return true;
        } else {
            console.log("Product not found in cart.");
            return false;
        }
    }
    displayCart() {
        console.log("Shopping Cart:");
        this.items.forEach(item => {
            console.log(`${item.product.name} - ${item.quantity} - $${item.product.price}`);
        });
        console.log(`Total Cost: $${this.totalCost}`);
    }

    calculateTotalCost() {
        this.totalCost = this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    }

    applyDiscount(discount) {
        this.totalCost -= discount;
    }

}
//user class
class user {
    constructor(username, email, password ,shoppingCart =[]) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.shoppingCart = shoppingCart;

    }


}

//function to save users to local storage
function saveUsersToLocalStorage(users) {
    localStorage.setItem("users", JSON.stringify(users));

}

//function to retrieve users from local storage
function getUsersFromLocalStorage() {
    const usersJSON = localStorage.getItem('users');
    return usersJSON ? JSON.parse(usersJSON) : [];
}

//admin class
class admin extends user {
    constructor(username, email, password, accessLevel) {
        super(username, email, password);
        this.accessLevel = accessLevel;
        this.allProducts = [];
        this.allUsers = [];
        this.allProducts = [];
    }

}


//the sign up and login first prompt page  --------------------
function promptLoginOrSignup() {
    const choice = prompt("Welcome to our e-commerce website!\n1. Login\n2. Sign Up");
    if (choice === "1") {
        userLogin();
    } else if (choice === "2") {
        userCreateAccount();
    } else {
        alert("Invalid choice. Please try again.");
        promptLoginOrSignup();
    }
}
//Function to log in a user-------------------------------------------------------------
let  currentUser = null;
function userLogin() {
    
    const username = prompt("Enter your username:");
    const password = prompt("Enter your password:");

    const user = authenticateUser(username, password);
    if (user) {
        currentUser = user;
        if (user.username === "admin") {
            promptAdminActions(user);
        } else {
            promptUserActions(user);
        }
    } else {
        alert("Invalid username or password.");
        promptLoginOrSignup();
    }

    if (username && password) {
        return true;
    } else {
        return false;
    }
}

//------------------------------------------------------------------------------
function authenticateUser(username, password) {
    const admin = admins.find(admin => admin.username === username && admin.password === password);
    if (admin) {
        return admin;
    }
    const user = users.find(user => user.username === username && user.password === password);
    return user;
}

let users = getUsersFromLocalStorage();
if (!Array.isArray(users)) {
    users = [];
}
function userCreateAccount() {
    const username = prompt("Enter your username:");
    const email = prompt("Enter your email:");
    const password = prompt("Enter your password:");

    const newUser = new user(username, email, password);

    users.push(newUser);
    console.log("users array :", users);

    // saveUsersToLocalStorage(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Users saved to localStorage:", JSON.parse(localStorage.getItem('users')));
    promptUserActions(newUser);
    // promptAdminActions();
}




// Function to prompt user for actions after login --------------------------------------
function promptUserActions() {
    const choice = prompt("Choose an action:\n1. Show all products\n2. Add product to cart\n3. Remove product from cart\n4. View account details\n5.Log Out");
    switch (choice) {
        case "1":
            console.log("show all Products");
            displayAllProducts();
            promptUserActions();
            break;
        case "2":
            console.log("Add Product to the cart");
            addProductCardForUser();
            promptUserActions();
            break;
        case "3":
            console.log("Remove product  from the cart");
            deleteProductUser();
            promptUserActions();
            break;
        case "4":
            console.log("View Account details");
            viewAccountDetailsUser();
            promptUserActions();
            break;
        case "5":
            console.log("Log Out");
            promptLoginOrSignup();
            break;
    }
}
//admin create acccccccccccccccccc 
function adminCreateAccount() {
    const username = prompt("Enter admin username:");
    const email = prompt("Enter admin email:");
    const password = prompt("Enter admin password:");
    const accessLevel = prompt("Enter admin access level:");

    const newAdmin = new admin(username, email, password, accessLevel);
    admins.push(newAdmin);
    promptAdminActions();
}


// Function to prompt admin for actions after login ---------------------------------------
function promptAdminActions() {
    const choice = prompt("Choose an action:\n1. Add product\n2. Show All Products\n3. Edit product\n4. Delete product\n5. Delete user\n6.view acc details\n7.logout");
    switch (choice) {
        case "1":
            console.log("Add products");
            addProductAdmin();
            promptAdminActions();
            break;
        case "2":
            console.log("Show All Products");
            displayAllProducts();
            promptAdminActions();
            break;
        case "3":
            console.log("Edit Product");
            editProductAdmin();
            promptAdminActions();
            break;
        case "4":
            console.log("Delete product");
            deleteAdminProduct();
            promptAdminActions();
            break;
        case "5":
            console.log("Delete user");
            deleteUser();
            promptAdminActions();
            break;
        case "6":
            console.log("view acc details");
            // promptLoginOrSignup(); view acc lal user mn khilel admin ee
            viewAccountDetailsAdmin();
            promptAdminActions();
            break;
        case "7":
            console.log('Logout');
            promptLoginOrSignup();
            break;
        default:
            alert("Invalid choice . Please try again.");
            promptAdminActions(admin);

    }
}

// Function to generate a unique product ID
function generateProductId() {
    // Generate a random number
    const randomNumber = Math.floor(Math.random() * 10000);
    // Concatenate with a prefix to ensure uniqueness
    return "PROD" + randomNumber;
}
let products =[];
// add product admin after editing -------------------------------------------
function addProductAdmin() {

    const name = prompt("Enter product name:");
    const price = parseFloat(prompt("Enter product price:"));
    const quantity = parseInt(prompt("Enter product quantity:"));
    const imageUrl = prompt("Enter product image URL:");
    const isOnSale = confirm("Is the product on sale? Click OK for Yes, Cancel for No.");

    // Create a new product object using the entered values
    const newProduct = new product(generateProductId(), name, price, quantity, imageUrl, isOnSale);
    
    // Add the new product to the list of products
    products.push(newProduct);

    // Display an alert indicating that the product has been added successfully
    alert(`Product "${name}" added successfully.`);
    

}


//function lall deleteproduct  .......................-----------------------------------------
function deleteAdminProduct() {
 
    const name = prompt("Enter the name of the product you want to delete:");
    const index = products.findIndex(product => product.name === name);
    
    if (index !== -1) {
        const deletedProduct = products.splice(index, 1)[0];
        alert(`Product "${deletedProduct.name}" deleted successfully.`);
    } else {
        alert("Product not found.");
    }
}



//-----------------------------function--------------------Edit product -------------------------------------------------
function editProductAdmin() {
    
    const pname = prompt("Enter the name  of the product you want to edit:");
    if (pname === null || pname.trim() === "") {
        return;
    }
    const newName = prompt("Enter the new name for the product:", product.name);
    const newPrice = parseFloat(prompt("Enter the new price for the product:", product.price));
    const newQuantity = parseInt(prompt("Enter the new quantity for the product:", product.quantity));
    const newImageUrl = prompt("Enter the new image URL for the product:", product.imageUrl);
    const newIsOnSale = confirm("Is the product on sale? Click OK for Yes, Cancel for No.");
    product.name = newName || product.name;
    product.price = isNaN(newPrice) ? product.price : newPrice;
    product.quantity = isNaN(newQuantity) ? product.quantity : newQuantity;
    product.imageUrl = newImageUrl || product.imageUrl;
    product.isOnSale = newIsOnSale;
    
    // alert(`Product "${product}" updated successfully.`);
    alert(`Product Name: ${newName}\nPrice: ${newPrice}\nQuantity: ${newQuantity}\nImage URL: ${newImageUrl}\nIs On Sale: ${newIsOnSale ? 'Yes' : 'No'}`);


}
//function add product to the card for the users
function addProductCardForUser() {
    const productName = prompt("Enter product name:");
    if (productName === null || productName.trim() === "") {
        return;
    }

    const productPriceInput = prompt("Enter product price:");
    const productPrice = parseFloat(productPriceInput);
    if (productPriceInput === null || isNaN(productPrice)) {
        alert("Invalid price. Please enter a valid number.");
        return;
    }

    const productImageUrl = prompt("Enter product image URL:");
    if (productImageUrl === null || productImageUrl.trim() === "") {
        return;
    }
    const quantityInput = prompt("Enter product quantity:");
    const quantity = parseInt(quantityInput);
    if (quantityInput === null || isNaN(quantity) || quantity <= 0) {
        alert("Invalid quantity. Please enter a valid number greater than 0.");
        return;
    }

    // Create a new product object
    const prod = new product(productName, productPrice, quantity, productImageUrl, false);
    
    if (!currentUser.shoppingCart) {
        currentUser.shoppingCart = [];
    }
    // Add the product to the user's shopping cart
    currentUser.shoppingCart.push({ product:prod, quantity:quantity });

    // Show success message
    alert(`${productName} added to your cart successfully.`);
}



function viewAccountDetailsUser() {
    if (currentUser && currentUser.shoppingCart) {
        let userDetails = `Username: ${currentUser.username}\nEmail: ${currentUser.email}\n`;

        if (currentUser.shoppingCart.length > 0) {
            userDetails += "Products in Cart:\n";
            currentUser.shoppingCart.forEach(item => {
                userDetails += `-ProductName: ${item.product.name} - Quantity: ${item.quantity}\n`;
            });
        } else {
            userDetails += "No products in cart.";
        }

        alert(userDetails);
    } else {
        alert("User information is not available.");
    }
}

// remove products from card
function deleteProductUser(){
    const productName = prompt("Enter the name of the product you want to delete from your cart:");
    const quantityToRemove = parseInt(prompt("Enter the quantity to remove:"));

    if (!productName || isNaN(quantityToRemove) || quantityToRemove <= 0) {
        alert("Invalid input. Please provide valid values.");
        return;
    }

    if (currentUser && currentUser.shoppingCart) {
        const index = currentUser.shoppingCart.findIndex(item => item.product.name === productName);
        
        if (index !== -1) {
            const cartItem = currentUser.shoppingCart[index];
            const remainingQuantity = cartItem.quantity - quantityToRemove;
            if (remainingQuantity <= 0) {
                currentUser.shoppingCart.splice(index, 1);
            } else {
                cartItem.quantity = remainingQuantity;
            }
            alert(`Quantity of "${productName}" removed from your cart.`);
        } else {
            alert("Product not found in your cart.");
        }
    } else {
        alert("User information is not available.");
    }
}

//function view acc for admin--------------------------------------------------------
function viewAccountDetailsAdmin() {

    const admin = admins[0];
    if (admin) {
        alert("Admin Name: " + admin.username + "\nAdmin Email: " + admin.email);
    } else {
        alert("No admin found.");
    }
}
//function for delete user of admin ------------------------------------------------
function deleteUser() {
    const username = prompt("Enter the username of the user you want to delete:");
    if (!username) {
        return;
    }
    let usersData = JSON.parse(localStorage.getItem('users')) || {};
    if (usersData.hasOwnProperty(username)) {
        delete usersData[username];
        localStorage.setItem('users', JSON.stringify(usersData));
        console.log(`User "${username}" deleted from localStorage.`);
    } else {
        console.log(`User "${username}" not found in localStorage.`);
    }


    const index = users.findIndex(user => user.username === username);
    if (index !== -1) {
        const confirmDelete = confirm(`Are you sure you want to delete the user "${username}"?`);

        if (confirmDelete) {
            users.splice(index, 1);
           

            alert(`User "${username}" deleted successfully.`);
        } else {
            alert("Deletion cancelled.");
        }
    } else {
        alert("User not found.");

}

}

//------------------------------------------------------------------------------------

function displayAllProducts() {
    if (products.length === 0) {
        alert("No products available.");
        return;
    }

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





const admins = [
    new admin("admin", "admin1@example.com", "1234", "full")
];



promptLoginOrSignup();
