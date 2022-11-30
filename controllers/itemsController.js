const router = require("express").Router();
const itemsService = require("../services/itemsService");

router.get("/", async (req, res, next) => {
  try {
    const itemsList = await itemsService.getItems();
    res.send(itemsList);
  } catch (err) {
    console.error(err);
  }
});
router.put("/update_item", async (req, res, next) => {
  const { editedItem } = req.body;
  try {
    const response = await itemsService.updateItems(editedItem);
    if (response) {
      res.status(200).json("Item updated");
    }
  } catch (err) {
    console.error(err);
  }
});
router.post("/search_by_value", async (req, res, next) => {
  const { searchValue } = req.body;
  try {
    const searchResult = await itemsService.SearchByValue(searchValue);
    res.send(searchResult);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
