const Pagination = ({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
}) => {
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className="row mt-2 mb-2">
      <div className="col-12 text-center">
        <button
          className="btn btn-success"
          onClick={handlePreviousPage}
          disabled={isPreviousDisabled}
        >
          Previous Page
        </button>
        <button
          className="btn btn-success ms-4"
          onClick={handleNextPage}
          disabled={isNextDisabled}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Pagination;
