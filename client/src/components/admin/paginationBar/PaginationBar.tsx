import React from 'react';
import styles from './paginationBar.module.scss';

interface IProps {
    currentPage: number,
    totalPages: number,
    setPage: (page: number) => void
}

const PaginationBar: React.FC<IProps> = ({currentPage, totalPages, setPage}) => {
    const pagesRange = 3;
    const pages = [];
    for (let i = currentPage - pagesRange; i < currentPage + pagesRange + 1; i++) {
        if(i <= 0) continue;
        if(i > totalPages) break
        pages.push(i);
    }
    return (
        <div className={styles.container}>
            {(currentPage - pagesRange > 1) && <span
                className={styles.pageNumber}
                onClick={() => setPage(1)}>
                {1}<span>...</span>
            </span>}
            {pages.map((page) => <span
                className={styles.pageNumber + ' ' + (currentPage === page ? styles.active : '')}
                onClick={() => setPage(page)}>
            {page} </span>)}
            {(currentPage + pagesRange < totalPages) && <span
                className={styles.pageNumber}
                onClick={() => setPage(totalPages)}>
                <span>...</span>{totalPages}
            </span>}
        </div>
    );
};

export default PaginationBar;