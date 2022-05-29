const express = require("express");
const router = express.Router();
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate")
const cookieParser = require("cookie-parser");


require("../db/conn");
router.use(cookieParser());

// Register route
router.post("/register", async (req, res) => {

    try {
        const { name, email, phone, work, password, cpassword } = req.body;

        if (!name || !email || !phone || !work || !password || !cpassword) {
            return res.status(422).json({ error: "Please fill all field." });
        }

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already Exist." });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Password are not matching." });
        } else {
            const newUser = new User({ name, email, phone, work, password, cpassword });

            await newUser.save();

            res.status(201).json({ message: "User registered successfully." });
        }
    } catch (error) {
        console.log(error)
    }
});

// logout function
router.get("/logout", (req,res) => {
    res.clearCookie("jwtoken", {path: "/"});
    res.status(200).send("User Logged Out");
})


//login Route
router.post("/signin", async (req, res) => {

    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ error: "Please fill all data." });
        }

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {

            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            // console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                return res.status(422).json({ error: "Invalid Credentials" });
            } else {
                return res.status(201).json({ message: "Logged In Successfully" });
            }
        } else {
            res.status(422).json({ error: "Invalid Credentials" });
        }

    } catch (error) {
        console.log(error);
    }
});

// About us page

router.get("/about", authenticate, (req, res) => {
    res.send(req.rootUser);
});

// Getting data for contact page
router.get("/getData", authenticate, (req, res) => {
    res.send(req.rootUser);
});

router.post("/contact", authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            console.log("Error in contact form");
            return res.status(422).json({ error: "plzz fill the contact form" });
        }

        const userContact = await User.findOne({ _id: req.userId });

        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);

            await userContact.save();

            res.status(201).json({message: "user contact successfully"});
        }


    } catch (error) {

    }
});

module.exports = router;

