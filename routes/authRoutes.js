const { Router } = require("express");
const { admin_login, auth } = require("../controllers/authControllers");

const router = Router();

router.get("/auth",auth);   
// router.get("/auth",(req,res)=>{
//     res.send('helloFromAuth');
// });
router.post("/login/admin", admin_login);

module.exports = router;
