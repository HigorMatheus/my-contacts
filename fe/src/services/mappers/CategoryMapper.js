class CategoryMapper {
  toDomain(persistemCategory) {
    return {
      id: persistemCategory.id,
      name: persistemCategory.name,
    };
  }

  // toPersistem() {}
}

export default new CategoryMapper();
