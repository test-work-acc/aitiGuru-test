interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

export function Pagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
}: PaginationProps) {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        if (totalPages > 5) {
            if (currentPage <= 3) return i + 1;
            if (currentPage >= totalPages - 2) return totalPages - 4 + i;
            return currentPage - 2 + i;
        }
        return i + 1;
    });

    return (
        <div className="flex items-center justify-between px-6 py-4">
            <div className="text-sm text-gray-500">
                Показано {startItem}-{endItem} из {totalItems}
            </div>

            <div className="flex items-center gap-1">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors ${page === currentPage
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}