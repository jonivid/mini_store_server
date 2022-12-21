const db = require("./connection-wrapper");

const LoginWithGoogle = async (payload) => {
  const { email, sub, given_name, family_name } = payload;
  const sql = "SELECT * FROM users where email =? AND password = ?;";
  const params = [email, sub];
  const addNewUserSql =
    "INSERT INTO users (email,password,first_name,last_name) VALUES (?,?,?,?);";
  const addNewUserParams = [email, sub, given_name, family_name];
  try {
    const loginResult = await db.executeWithParameters(sql, params);
    if (loginResult.length === 0) {
      console.log("creating new user");
      await db.executeWithParameters(addNewUserSql, addNewUserParams);
      return {
        email,
        isAdmin: "0",
        given_name,
        family_name,
      };
    } else {
      return {
        email,
        isAdmin: loginResult[0].is_admin,
        given_name,
        family_name,
      };
    }
  } catch (err) {
    console.error("error: LoginWithGoogle dal layer", err);
  }
};

module.exports = {
  LoginWithGoogle,
};
