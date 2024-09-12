import React from 'react';

export default function Pagination({ totalPosts, postPerPage, paginate, currentPage }) {
    const totalPages = Math.ceil(totalPosts / postPerPage);
    let pageNumbers = [];

    const displayPageNumbers = () => {
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        if (startPage > 1) {
            pageNumbers.push(1);
            if (startPage > 2) pageNumbers.push("...");
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pageNumbers.push("...");
            pageNumbers.push(totalPages);
        }
    };

    displayPageNumbers();

    return (
        <div className='flex justify-center mt-4 mb-5'>
            {pageNumbers.map((number, index) => (
                <button
                    key={index}
                    onClick={() => typeof number === 'number' && paginate(number)}
                    className={`px-3 py-1 mx-1 rounded-xl  ${currentPage === number ? 'bg-slate-800 text-yellow-300 font-semibold' : 'bg-gray-300'}`}
                    disabled={number === '...'}
                >
                    {number}
                </button>
            ))}
        </div>
    );
}
