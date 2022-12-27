const router = require("express").Router();
const usersService = require("../services/usersService");

router.post("/login", async (req, res, next) => {
  const { loginValues } = req.body;

  try {
    const response = await usersService.login(loginValues);
    res.send(response);
  } catch (err) {
    console.error(err);
  }
});
router.post("/login_with_google", async (req, res, next) => {
  const { credentials } = req.body;

  try {
    const response = await usersService.loginWithGoogle(credentials);
    res.send(response);
  } catch (err) {
    console.error(err);
  }
});
module.exports = router;
