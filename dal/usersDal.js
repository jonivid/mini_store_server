const db = require("./connection-wrapper");

const login = async (loginValues) => {
  const { email, password } = loginValues;
  const sql =
    "SELECT email,first_name,family_name,is_admin FROM users where email =? AND password = ?;";
  const params = [email, password];
  try {
    const loginResult = await db.executeWithParameters(sql, params);
    if (loginResult.length > 0) {
      return { ...loginResult[0], status: true };
    } else {
      return { status: false, message: "Invalid email or password values " };
    }
  } catch (error) {
    console.error("error: loginValues dal layer", error);
  }
};

const loginWithGoogle = async (payload) => {
  const { email, sub, given_name, family_name } = payload;
  const sql = "SELECT * FROM users where email =? AND password = ?;";
  const params = [email, sub];
  const addNewUserSql =
    "INSERT INTO users (email,password,first_name,family_name) VALUES (?,?,?,?);";
  const addNewUserParams = [email, sub, given_name, family_name];
  try {
    const loginResult = await db.executeWithParameters(sql, params);
    if (loginResult.length === 0) {
      console.log("creating new user");
      await db.executeWithParameters(addNewUserSql, addNewUserParams);
      return {
        email,
        isAdmin: "0",
        first_name: given_name,
        family_name,
      };
    } else {
      return {
        email,
        isAdmin: loginResult[0].is_admin,
        first_name: given_name,
        family_name,
      };
    }
  } catch (err) {
    console.error("error: loginWithGoogle dal layer", err);
  }
};

module.exports = {
  login,
  loginWithGoogle,
};
