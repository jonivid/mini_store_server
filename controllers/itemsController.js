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
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const item = await itemsService.getItemById(id);
    res.send(item);
  } catch (err) {
    console.error(err);
  }
});
router.post("/delete_item", async (req, res, next) => {
  const { item } = req.body;

  try {
    const response = await itemsService.deleteItem(item);
    if (response) {
      res.status(200).json("Item deleted");
    }
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
  const { category, order } = req.body.sortValues;

  try {
    const searchResult = await itemsService.searchByValue(
      searchValue,
      category,
      order,
    );
    res.send(searchResult);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
