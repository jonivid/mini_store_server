const usersDal = require("../dal/usersDal");
const { OAuth2Client } = require("google-auth-library");
const Hashes = require("jshashes");
const SHA256 = new Hashes.SHA256();
const jwt = require("jsonwebtoken");

const login = async (loginValues) => {
  try {
    loginValues = {
      ...loginValues,
      password: SHA256.hex(loginValues.password),
    };
    const res = await usersDal.login(loginValues);

    if (res.status === true) {
      const { email, is_admin, first_name, family_name } = res;
      return {
        token: generateToken(res),
        email,
        isAdmin: is_admin,
        firstName: first_name,
        familyName: family_name,
      };
    } else {
      return res;
    }
  } catch (err) {
    console.error("error at login service layer", err);
  }
};

const loginWithGoogle = async (credentials) => {
  try {
    const client = new OAuth2Client(credentials.clientId);
    const ticket = await client.verifyIdToken({
      idToken: credentials.credential,
      audience: credentials.clientId, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    let payload = ticket.getPayload();
    payload = { ...payload, sub: SHA256.hex(payload.sub) };
    const res = await usersDal.loginWithGoogle(payload);
    const { email, isAdmin, first_name, family_name } = res;
    return {
      token: generateToken(res),
      email,
      isAdmin,
      firstName: first_name,
      familyName: family_name,
    };
  } catch (err) {
    console.error("error at loginWithGoogle service layer", err);
  }
};
const generateToken = (res) => {
  const token = jwt.sign(res, `${process.env.TOKEN_SECRET_KEY}`);
  return token;
};
module.exports = {
  login,
  loginWithGoogle,
};
