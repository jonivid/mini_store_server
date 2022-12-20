const db = require("./connection-wrapper");

const LoginWithGoogle = async (userDetails) => {
  try {
    console.log({ userDetails });
    // const sql = "SELECT * FROM products;";
    // const params = [];
    // const res = await db.executeWithParameters(sql, params);
    // return res;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  LoginWithGoogle,
};
