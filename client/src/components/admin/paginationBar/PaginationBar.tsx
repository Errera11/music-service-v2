import React from 'react';
import styles from './paginationBar.module.scss';

interface IProps {
    currentPage: number,
    totalPages: number,
    setPage: (page: number) => void
}

const PaginationBar: React.FC<IProps> = ({currentPage, totalPages, setPage}) => {
    return (
        <div className={styles.container}>
            {new Array(totalPages).map((_, page) => <span
                className={styles.pageNumber + ' ' + (currentPage === page + 1 ? styles.active : '')}
                onClick={() => setPage(page + 1)}>
                {page + 1}
            </span>)}
        </div>
    );
};

export default PaginationBar;