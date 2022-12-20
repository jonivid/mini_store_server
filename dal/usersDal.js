const db = require("./connection-wrapper");

const LoginWithGoogle = async (credentials) => {
  try {
    // console.log({ credentials });
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
