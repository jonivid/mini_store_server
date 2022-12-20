const db = require("./connection-wrapper");

const getItems = async () => {
  try {
    const sql = "SELECT * FROM products;";
    const res = await db.execute(sql);
    return res;
  } catch (err) {
    console.error(err);
  }
};
const getItemById = async (id) => {
  try {
    const sql = "SELECT * FROM products where id = ?;";
    const params = [id];
    const res = await db.executeWithParameters(sql, params);
    return res;
  } catch (err) {
    console.error(err);
  }
};
const addNewItem = async (newItem) => {
  console.log(newItem);

  try {
    const sql =
      "INSERT INTO products (name,price,image,description) VALUES(?,?,?,?);";
    const params = [
      newItem.name,
      newItem.price,
      newItem.img,
      newItem.description,
    ];
    const res = await db.executeWithParameters(sql, params);
    console.log(res);
    return true;
  } catch (err) {
    console.error(err);
  }
};
const deleteItem = async (item) => {
  try {
    const sql = "DELETE FROM products WHERE id=?;";
    const params = [item.id];
    const res = await db.executeWithParameters(sql, params);
    return true;
  } catch (err) {
    console.error(err);
  }
};
const updateItems = async (itemDetail) => {
  try {
    const sql =
      "UPDATE products SET name=?, price=?, image=?, description=? where id=?;";
    const params = [
      itemDetail.name,
      itemDetail.price,
      itemDetail.image,
      itemDetail.description,
      itemDetail.id,
    ];
    const res = await db.executeWithParameters(sql, params);
    return true;
  } catch (err) {
    console.error(err);
  }
};
const searchByValue = async (searchValue, category, order) => {
  try {
    let params;
    let sql = `SELECT * FROM products where 
      name LIKE ? `;
    if (category !== "") {
      sql += `ORDER BY ${category} ${order}`;
    }
    params = [`%${searchValue}%`];
    const res = await db.executeWithParameters(sql, params);
    return res;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getItems,
  updateItems,
  searchByValue,
  addNewItem,
  deleteItem,
  getItemById,
};
