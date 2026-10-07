const Pagination = ({ page, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
  
    return (
      <div className="flex items-center justify-center gap-4 my-6">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
  
        <span className="text-sm text-gray-300">
          Page {page} of {totalPages}
        </span>
  
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  