
function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className="flex justify-center space-x-2">
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
        </ul>
      </nav>
    );
  }
  
  export default Pagination;
  