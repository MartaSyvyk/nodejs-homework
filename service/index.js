const { Contact } = require("./schemas/contact");
const {User} = require ("./schemas/user.js")

const listContacts = async () => {
  return Contact.find({});
};

const getContactById = async (contactId) => {
 
  const contact = await Contact.findById(contactId);
  
  return contact
};

const removeContact = async (contactId) => {
  return Contact.findOneAndRemove({ _id: contactId });
};

const addContact = async (body) => {
  return Contact.create(body);
};

const updateContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};

const createUser = async (body) => {
  // const {email, password, subscription} = req.body
  // const user = await User.findOne({email});
  return User.create(body);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  createUser
};
