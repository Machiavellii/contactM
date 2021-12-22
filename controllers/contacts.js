const Contact = require("../models/Contact");

const ErrorResponse = require("../middleware/errorResponse");
const asyncHandler = require("express-async-handler");

//@desc  Get All Contacts
//@route GET /api/v1/contacts
//@access Public
exports.getContacts = asyncHandler(async (req, res, next) => {
  const contacts = await Contact.find().populate("user");

  if (contacts) {
    res.json(contacts);
  } else {
    return next(new ErrorResponse("Contacts not found"));
  }
});

//@desc  Get Contact
//@route GET /api/v1/contacts/:id
//@access Public
exports.getContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (contact) {
    res.json(contact);
  } else {
    return res.status(400).json({ msg: "Contact not found" });
  }
});

//@desc  Add Contact
//@route POST /api/v1/contacts/add
//@access Private
exports.addContact = asyncHandler(async (req, res, next) => {
  const { name, email, phone } = req.body;
  const userId = req.user.id;

  //Create user
  const contact = await Contact.create({ name, email, phone, user: userId });

  res.status(201).json(contact);
});

//@desc  Update Contact
//@route PUT /api/v1/contacts/:id
//@access Private
exports.updateContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (contact) {
    const { name, email, phone } = req.body;

    contact.name = name;
    contact.email = email;
    contact.phone = phone;

    const updateContact = await contact.save();
    res.json(updateContact);
  } else {
    return next(new ErrorResponse("Contact not found"));
  }
});

//@desc  Delete Contact
//@route DELETE /api/v1/contacts/:id
//@access Private
exports.deleteContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (contact) {
    await contact.remove();
    res.json({ message: "Contact removed" });
  } else {
    return next(new ErrorResponse("Contact not found"));
  }
});
