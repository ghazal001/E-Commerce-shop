class Admin extends User {
    constructor(username, email, password, accessLevel) {
        super(username, email, password);
        this.accessLevel = accessLevel;
        this.allProducts = JSON.parse(localStorage.getItem('products')) || [];;
        this.allUsers = JSON.parse(localStorage.getItem('users')) || [];

    }
    addProduct(products) {
        let id = parseInt(JSON.parse(localStorage.getItem('productId')));
        id++;
        // Prompt user for product details
        let available;
        let name = promptForValue("Please enter the Name of the product");
        let price = promptForNumber(`Please enter the price of  ${name} `, 0);
        let image = promptForValue(`Please enter the image URL of the ${name}`);
        let quantity = promptForNumber(`Please enter the quantity of the ${name}`, 0);
        do {
            available = prompt(`enter Yes if the ${name} is available, No if not`);
        } while (available !== "Yes" && available !== "No");
        // Create a new product object with the provided details , update the prodict list and product identifier
        const newProduct = new Product(id, name, price, quantity, image, available)
        products.push(newProduct);
        localStorage.setItem('productId', JSON.stringify(id))
        alert(`${name} is added to the system`)
        return products
    }

    editProduct(products){
        if (!areItemsAvailable(products)) {
            alert("there is no Products")
        }
        else {
            const { index } = promptForValidIndex(products, "product");

            // Prompt user for new product details
            let name, price, image, quantity, available;
            name = prompt("Please enter the New Name of the product");
            do {
                price = promptForNumber(`Please enter the new price of the ${name} `);
            } while (!isNaN(price) && price < 0);
            image = promptForValue(`Please enter the new image URL of the ${name}`);
            do {
                quantity = promptForNumber(`Please enter the new quantity of the ${name}`);
            } while (!isNaN(quantity) && quantity < 0);
            do {
                available = prompt(`Please enter Yes if the ${name} is available, No if not`);
            } while (available !== "Yes" && available !== "No");

            // Update product details if provided
            if (name !== "") {
                products[index].name = name
            }
            if (image !== "") {
                products[index].imageUrl = image
            }
            if (!isNaN(price)) {
                products[index].price = price
            }
            if (!isNaN(quantity)) {
                products[index].quantity = quantity
            }
            if (available !== "") {
                products[index].isAvailable = available
            }
            alert("The product has been edited")
            return products
        }
    }

    deleteProduct(products){
        if (!areItemsAvailable(products)) {
            alert("there are no products!!")
        }
        else {
            const { index } = promptForValidIndex(products, "product");
            // Remove the product from the products array
            products.splice(index, 1);
            alert("The product has been deleted")
            return products
        }
    }

    displayUsers(users) {
        if (!areItemsAvailable(users)) {
            alert("there are no users in the system yet!")
        }
        else {
            // Prepare the message to display available users
            let availabeUsers = "The available users are:\n"
            for (let user of users) {
                availabeUsers += `${user.username} : ${user.email}\n`
            }
            alert(availabeUsers)
        }
    }

    deleteUser(users) {
        if (!areItemsAvailable(users)) {
            alert("there are no users ")
        }
        else {
            const { index } = promptForValidIndex(users, "user");
            // Remove the user from the users array
            users.splice(index, 1);
            localStorage.setItem('users', JSON.stringify(users))
            alert("The user has been deleted")
        }
        return users
    }
}

