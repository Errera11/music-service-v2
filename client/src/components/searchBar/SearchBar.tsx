import React from 'react';
import styles from './searchBar.module.scss';

const SearchBar = () => {
    return (
        <div className={styles.container}>
            <input type={'text'} placeholder={'Search song'}/>
        </div>
    );
};

export default SearchBar;