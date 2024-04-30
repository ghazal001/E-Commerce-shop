class User {
    constructor(id,username, email, password ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.shoppingCart = {items:[],totalCost:0};

    }
    logIn(users) {
        let email, userIndex, password;
        let emailNotExist = true;
        let incorrectPassword = true;

        email = promptForValue("Please enter your email")

        // Check if the user is an admin
        if (email === "admin1@gmail.com") {
            alert("Welcome back Admin")
            return { email, password, type: "admin" }
        }
        else {
            // Loop until a valid email is entered
            do {
                for (let i = 0; i < users.length; i++) {
                    if (email == String(users[i].email)) {
                        emailNotExist = false
                        userIndex = i
                        break
                    }
                }
                if (emailNotExist === true) {
                    if (email === "admin1@gmail.com") {
                        alert("Welcome back Admin")
                        return { email, password, type: "admin" }
                    }
                    email = prompt("the email is invalid\n Please try again ")
                }
            } while (emailNotExist)
            // Loop until a valid password is entered
            while (incorrectPassword) {
                password = prompt("please enter the correct password")
                if (users[userIndex].password == password) {
                    incorrectPassword = false
                }
            }
            const username = users[userIndex].username
            return { email, password, username, type: "user", userIndex }
        }
    }
    
    signUp(users) {
        let username, password, email;
        username = promptForValue("please enter your user name");
        email = promptForValue("Please enter your email");
        password = promptForValue("please enter your password");
        
        let usedEmail = true
        while (usedEmail) {
            let existingEmail = users.some(user => user.email === email);
            
            if (existingEmail) {
                alert("This email is already in use.");
                email = promptForValue("Please enter another email:");
            } else {
                usedEmail = false;
            }
        }
    
        // Generate a unique userId
        let userId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
    
        // Create a new user object if username, email, and password are provided
        let newUser;
        
        if (username && email && password) {
            newUser = new User(userId, username, email, password);
            alert("Your account has been created. Choose option 1 to log in to your account.");
        }
    
        users.push(newUser);
        setItemsToLocalStorage(users, "users");
    }
    
    browseInfo(user) {
        alert(`username: ${user.username}\n Email: ${user.email}\n Password: ${user.password}`)
    }

}

