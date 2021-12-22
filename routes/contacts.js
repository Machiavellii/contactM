const express = require("express");
const {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
  getContact,
} = require("../controllers/contacts");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getContacts).post("/add", protect, addContact);
router
  .route("/:id")
  .put(protect, updateContact)
  .delete(deleteContact)
  .get(getContact);

module.exports = router;
