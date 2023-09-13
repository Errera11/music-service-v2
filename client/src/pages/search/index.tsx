import React, { useEffect, useState} from 'react';
import Layout from "@/components/Layout";
import Head from "next/head";
import SearchBar from "@/components/searchBar/SearchBar";
import styles from '../../styles/search/search.module.scss';
import {ISongApiResponse, songsApi} from "@/api/songs";
import SongsList from "@/components/songsList/SongsList";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/loader/Loader";

const Search = () => {

    const [query, setQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1)
    const searchTake = 10;
    const searchSkip = (pageNumber - 1) * searchTake || 0;

    const [fetch, data, isLoading, isError] = useFetch<ISongApiResponse>(() => songsApi.searchSongs(query, searchSkip, searchTake));;

    useEffect(() => {
        fetch()
    }, [query])

    return (
        <Layout>
            <>
                <Head>
                    <title>Search</title>
                </Head>
                <div className={styles.container}>
                    <div className={styles.searchBar}>
                        <SearchBar onSearch={(query: string) => setQuery(query)}/>
                    </div>
                    {data?.songs?.length && <SongsList type={'list'} songs={data.songs}/>}
                    {isLoading && <div className={styles.loader}>
                        <Loader/>
                    </div>}
                </div>
            </>
        </Layout>
    );
};

export default Search;