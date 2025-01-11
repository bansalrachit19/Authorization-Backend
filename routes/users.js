const express = require("express");
const router = express.Router();

//import controllers
const {signUp} = require("../controller/signUp");
const {login} = require("../controller/login");

//map the routers to the controllers
router.post("/login", login);
router.post("/signUp", signUp);

//import middlewares
const {auth, isStudent, isAdmin} = require("../middlewares/auth");

//testing protected routes for single middlewares
router.get("/tests", auth, (req, res) => {
    res.status(200).json({
        success:true,
        message:"welcome to protected routed for tests",
    });
});
//protected routes
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success:true,
        message:"welcome to protected route for students",
    });
});

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success:true,
        message:"welcome to protected route for admins",
    });
});

//export the router
module.exports = router;
