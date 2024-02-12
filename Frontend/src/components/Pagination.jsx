function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  const maxPageNumberVisible = 5; // Máximo de números de página visibles a la vez
  const maxPagesBeforeCurrentPage = Math.floor(maxPageNumberVisible / 2);
  const maxPagesAfterCurrentPage = Math.ceil(maxPageNumberVisible / 2) - 1;

  let startPage = Math.max(currentPage - maxPagesBeforeCurrentPage, 1);
  let endPage = Math.min(startPage + maxPageNumberVisible - 1, totalPages);

  if (totalPages > maxPageNumberVisible) {
    if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      startPage = totalPages - maxPageNumberVisible + 1;
      endPage = totalPages;
    } else if (currentPage - maxPagesBeforeCurrentPage <= 0) {
      startPage = 1;
      endPage = maxPageNumberVisible;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex justify-center space-x-2">
        {currentPage > 1 && (
          <li>
            <button
              onClick={() => onPageChange(1)}
              className="py-2 px-4 bg-gray-200 text-black rounded"
            >{"<<"}</button>
          </li>
        )}
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`py-2 px-4 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} rounded`}
            >
              {number}
            </button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
            <button
              onClick={() => onPageChange(totalPages)}
              className="py-2 px-4 bg-gray-200 text-black rounded"
            >{">>"}</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
