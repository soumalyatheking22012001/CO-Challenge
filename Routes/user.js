const router = require("express").Router();

router.use("/newuser",require("../API/signup"));
router.use("/login",require("../API/login"));
router.use("/confirmEmail",require("../API/verifyUser"));
module.exports = router;