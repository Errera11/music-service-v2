import React from 'react';
import Layout from "@/components/Layout";
import Head from "next/head";
import SearchBar from "@/components/searchBar/SearchBar";
import styles from '../../styles/search/search.module.scss';

const Search = () => {
    return (
        <Layout>
            <>
                <Head>
                    <title>Search</title>
                </Head>
                <div className={styles.container}>
                    <div className={styles.searchBar}>
                        <SearchBar />
                    </div>
                    <div className={styles.songList}>

                    </div>

                </div>
            </>
        </Layout>
    );
};

export default Search;