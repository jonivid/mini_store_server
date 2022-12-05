const itemsDal = require("../dal/itemsDal");

const getItems = async () => {
  try {
    const itemsList = await itemsDal.getItems();
    return itemsList;
  } catch (err) {
    console.error(err);
  }
};
const addNewItem = async (newItem) => {
  try {
    const response = await itemsDal.addNewItem(newItem);
    return response;
  } catch (err) {
    console.error(err);
  }
};
const deleteItem = async (item) => {
  try {
    const response = await itemsDal.deleteItem(item);
    return response;
  } catch (err) {
    console.error(err);
  }
};
const updateItems = async (itemDetail) => {
  try {
    const response = await itemsDal.updateItems(itemDetail);
    return response;
  } catch (err) {
    console.error(err);
  }
};
const searchByValue = async (searchValue, category, order) => {
  try {
    const response = await itemsDal.searchByValue(searchValue, category, order);
    return response;
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
};
