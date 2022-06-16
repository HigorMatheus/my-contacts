const { v4 } = require('uuid');

let contacts = [{
  id: v4(),
  name: 'Higor Matheus',
  email: 'higor.matheus@gmail.com',
  phone: '123333543',
  category_id: v4(),
}];

class ContactsRepository {
  async findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  async findById(id) {
    const contactExists = contacts.find((contact) => contact.id === id);
    return new Promise((resolve) => {
      resolve(contactExists);
    });
  }

  async findByEmail(email) {
    const contactExists = contacts.find((contact) => contact.email === email);
    return new Promise((resolve) => {
      resolve(contactExists);
    });
  }

  async update(id, {
    name, email, phone, category_id,
  }) {
    const updateContact = {
      id,
      name,
      email,
      phone,
      category_id,
    };
    contacts = contacts.map((contact) => {
      if (contact.id === id) {
        return updateContact;
      }
      return contact;
    });
    return new Promise((resolve) => {
      resolve(updateContact);
    });
  }

  async create({
    name, email, phone, category_id,
  }) {
    const newContact = {
      id: v4(),
      name,
      email,
      phone,
      category_id,
    };
    contacts = contacts.push(newContact);
    return new Promise((resolve) => {
      resolve(newContact);
    });
  }

  async delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((user) => user.id !== id);
      resolve();
    });
  }
}

module.exports = new ContactsRepository();
