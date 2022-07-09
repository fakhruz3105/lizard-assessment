import 'src/styles/Pagination.scss';

export default function Pagination({
  currentPage,
  totalPages,
  changePage,
}: {
  currentPage: number;
  totalPages: number;
  changePage: (page: number) => void;
}) {
  const className = (page: number) => {
    return page === currentPage ? 'current' : '';
  };

  const pages = () => {
    let startPage = 0;
    let endPage = 0;

    if (totalPages < 10) {
      startPage = 2;
      endPage = Math.min(8, totalPages - 1);
    } else {
      startPage = currentPage > totalPages - 5 ? totalPages - 7 : Math.max(2, currentPage - 3);
      endPage = currentPage < 5 ? 8 : Math.min(currentPage + 3, totalPages - 1);
    }

    const pages: number[] = [];

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  return (
    <div className="pagination-container">
      <div className="pagination">
        <span onClick={() => changePage(currentPage - 1)}>{'<'}</span>
        <span className={className(1)} onClick={() => changePage(1)}>{1}</span>
        {currentPage > 1 + 4 && totalPages > 9 ? <span onClick={() => changePage(currentPage - 4)}>{'...'}</span> : null}
        {pages().map((page) => (
          <span
            key={page}
            className={className(page)}
            onClick={() => changePage(page)}
          >
            {page}
          </span>
        ))}
        {currentPage < totalPages - 4 && totalPages > 9 ? <span onClick={() => changePage(currentPage + 4)}>{'...'}</span> : null}
        {totalPages > 1 ? <span className={className(totalPages)} onClick={() => changePage(totalPages)}>{totalPages}</span> : null}
        <span onClick={() => changePage(currentPage + 1)}>{'>'}</span>
      </div>
    </div>
  );
}
