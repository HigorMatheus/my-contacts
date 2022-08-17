const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.params;
    const data = await CategoriesRepository.findAll(orderBy);

    response.json(data);
  }

  store(request, response) {
    const { name } = request.body;
    if (!name) {
      return response.status(404).json({ message: 'name is required' });
    }
    const data = CategoriesRepository.create({ name });

    response.json(data);
  }
}
module.exports = new CategoryController();
