const router = require("express").Router();
const usersService = require("../services/usersService");

router.post("/login_with_google", async (req, res, next) => {
  const { credentials } = req.body;

  try {
    const response = await usersService.LoginWithGoogle(credentials);
    res.send(response);
  } catch (err) {
    console.error(err);
  }
});
module.exports = router;
