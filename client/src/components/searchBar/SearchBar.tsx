import React, {useMemo, useState} from 'react';
import styles from './searchBar.module.scss';

let timeoutId: ReturnType<typeof setTimeout>;

const SearchBar = ({onSearch}: { onSearch: (query: string) => void }) => {

    const [query, setQuery] = useState<string>('');

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value)
    }

    useMemo(() => {

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            onSearch(query);
        }, 700);

    }, [query])

    return (
        <div className={styles.container}>
            <input value={query} onChange={onChangeHandler} type={'text'} placeholder={'Search song'}/>
        </div>
    );
};

export default SearchBar;