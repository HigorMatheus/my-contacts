const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);
    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ message: 'user not found' });
    }
    response.json(contact);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;
    if (!name) {
      return response.status(404).json({ message: 'name is required' });
    }
    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return response.status(404).json({ message: 'This e-mail address is already in use' });
    }
    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });
    response.status(201).json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ message: 'contact not found' });
    }
    if (!name) {
      return response.status(404).json({ message: 'name is required' });
    }
    const contactEmailExists = await ContactsRepository.findByEmail(email);

    if ((contactEmailExists && contactEmailExists.id !== id)) {
      return response.status(404).json({ message: 'This e-mail address is already in use' });
    }
    const contact = await ContactsRepository.update(id, {

      name,
      email,
      phone,
      category_id,
    });

    response.status(200).json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    await ContactsRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
