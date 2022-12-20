const router = require("express").Router();
const usersService = require("../services/usersService");

router.post("/login_with_google", async (req, res, next) => {
  const { userDetails } = req.body;

  try {
    const response = await usersService.LoginWithGoogle(userDetails);
    res.send(response);
  } catch (err) {
    console.error(err);
  }
});
module.exports = router;
