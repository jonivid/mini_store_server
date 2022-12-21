const usersDal = require("../dal/usersDal");
const { OAuth2Client } = require("google-auth-library");
const Hashes = require("jshashes");
const SHA256 = new Hashes.SHA256();
const jwt = require("jsonwebtoken");

const LoginWithGoogle = async (credentials) => {
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
    const res = await usersDal.LoginWithGoogle(payload);
    const { email, isAdmin, given_name, family_name } = res;
    return {
      token: generateToken(res),
      email,
      isAdmin,
      given_name,
      family_name,
    };
  } catch (err) {
    console.error("error at LoginWithGoogle service layer", err);
  }
};
const generateToken = (res) => {
  const token = jwt.sign(res, `${process.env.TOKEN_SECRET_KEY}`);
  return token;
};
module.exports = {
  LoginWithGoogle,
};
