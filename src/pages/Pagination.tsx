import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  totalItems: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  rowsPerPageOptions,
  totalItems,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const handleClick = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`px-2 min-w-8 min-h-8 py-1 border rounded-md transition 
            ${
              currentPage === i
                ? "bg-blueBackground text-white border-primaryBlue rounded-3xl flex items-center justify-center"
                : "text-gray-800 hover:bg-blue-100 rounded-3xl"
            }
          `}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-between items-center w-full p-4 border-gray-300">
      <div className="flex items-center space-x-2">
        <label className="text-textGray text-xs">Rows per page</label>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(parseInt(e.target.value, 10))}
          className="p-1 border rounded-md bg-gray-100 text-xs"
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-textGray text-xs">
          {`Showing ${(currentPage - 1) * rowsPerPage + 1}–${Math.min(
            currentPage * rowsPerPage,
            totalItems
          )} of ${totalItems}`}
        </span>
        <button
          onClick={() => handleClick(currentPage - 1)}
          className="px-2 py-1 border rounded-md bg-gray-100 text-textGray text-sm hover:bg-blue-100 disabled:bg-gray-200 disabled:cursor-not-allowed"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handleClick(currentPage + 1)}
          className="px-2 py-1 border rounded-md bg-gray-100 text-textGray text-sm hover:bg-blue-100 disabled:bg-gray-200 disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
