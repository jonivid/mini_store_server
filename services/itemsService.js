const itemsDal = require("../dal/itemsDal");

const getItems = async () => {
  try {
    const itemsList = await itemsDal.getItems();
    return itemsList;
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
const SearchByValue = async (searchValue) => {
  try {
    const response = await itemsDal.SearchByValue(searchValue);
    return response;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getItems,
  updateItems,
  SearchByValue,
};
