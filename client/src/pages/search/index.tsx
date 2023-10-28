import React, {useEffect, useState} from 'react';
import Head from "next/head";
import SearchBar from "@/components/searchBar/SearchBar";
import styles from '../../styles/search/search.module.scss';
import {ISongApiResponse, songsApi} from "@/api/songs";
import SongsList from "@/components/songsList/SongsList";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/loader/Loader";
import {useDynamicPagination} from "@/hooks/useDynamicPagination";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {songActions} from "@/store/song";

const Search = () => {
    const searchTake = 10;
    const [query, setQuery] = useState('')
    const {
        fetch,
        isLoading,
        isError,
        data
    } = useFetch<ISongApiResponse, Parameters<typeof songsApi.searchSongs>[0]>(songsApi.searchSongs);
    const {lastElementRef, currentPage, setPage} = useDynamicPagination({
        volume: searchTake,
        totalCount: data?.totalCount || 0
    })

    const songs = useTypedSelector(state => state.songs.songs);
    const {setSongs} = songActions;
    const dispatch = useAppDispatch();

    useEffect(() => {
        setPage(1);
        fetch({
            take: searchTake,
            currentPage: 1,
            query
        }).then(response => dispatch(setSongs(response.songs)))
    }, [query])

    useEffect(() => {
        if(query) fetch({
            query,
            take: searchTake,
            currentPage
        }).then((response) => setSongs([...songs, ...response.songs]))
    }, [currentPage])

    return (
        <>
            <Head>
                <title>Search</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.searchBar}>
                    <SearchBar onSearch={(query: string) => setQuery(query)}/>
                </div>
                {!isLoading && (songs) &&
                    <SongsList lastElementRef={lastElementRef} type={'list'} songs={songs}/>}
                {(!songs.length && !isLoading) &&
                    <div className={styles.searchFailureMessage}>No songs found</div>}
                {isLoading && <div className={styles.loader}>
                    <Loader/>
                </div>}
                {isError && <div>Some error happened</div>}
            </div>
        </>
    );
};

export default Search;
