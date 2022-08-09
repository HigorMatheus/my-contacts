import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://192.168.15.29:3333');
  }

  listCategories = async () => {
    return this.httpClient.get(`/categories`);
  };
}

export default new CategoriesService();
