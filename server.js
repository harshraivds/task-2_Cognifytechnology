const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Set up temporary storage for validated form data
let formData = [];

// Server-side validation and storage of form data
app.post('/submit', (req, res) => {
    // Get form data from request body
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    // Check if username and password are filled in
    if (!fname || !lname || !email || !username || !password) {
        res.status(400).send("Please fill in all fields.");
        return;
    }
    // Check if password meets complexity requirements
    else if (!isPasswordComplex(password)) {
        res.status(400).send("Password must contain at least one uppercase letter, one lowercase letter, one special character, one number, and be at least 8 characters long.");
        return;
    }
    // If all validations pass, store data and send success message
    else {
        formData.push({ username: username, password: password });
        res.send("Form submitted successfully!");
        return;
    }
});

// Serve HTML file containing the form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// Function to check password complexity
function isPasswordComplex(password) {
    // Regular expressions for complexity requirements
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numbercaseRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    // Check if password meets all complexity requirements
    return password.length >= 8 && uppercaseRegex.test(password) && lowercaseRegex.test(password) && specialCharRegex.test(password);
}
