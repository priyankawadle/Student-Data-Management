const paginate = (totalRecords, page, limit) => {
  const totalPages = Math.ceil(totalRecords / limit);
  return {
    totalRecords,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

module.exports = { paginate };
