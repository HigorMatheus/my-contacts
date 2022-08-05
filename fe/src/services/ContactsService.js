import HttpClient from './utils/HttpClient';
// http://localhost:3333
class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  listContacts = async (orderBy = 'asc') => {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
  };

  createContact = async (contact) => {
    return this.httpClient.post(`/contacts`, contact);
  };
}

export default new ContactsService();
