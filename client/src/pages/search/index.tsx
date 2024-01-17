import React, {useEffect, useState} from 'react';
import Head from "next/head";
import SearchBar from "@/components/searchBar/SearchBar";
import styles from '../../styles/search/search.module.scss';
import {songsApi} from "@/api/songs";
import SongsList from "@/components/songsList/SongsList";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/loader/Loader";
import {useDynamicPagination} from "@/hooks/useDynamicPagination";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {songActions} from "@/store/song";

const Search = () => {

    const searchTake = 10;
    const [songsTotalCount, setSongsTotalCount] = useState(0);
    const [query, setQuery] = useState('')

    const {
        fetch,
        isLoading,
        isError
    } = useFetch<typeof songsApi.getAllSongs>(songsApi.getAllSongs);

    const {lastElementRef, currentPage, setPage} = useDynamicPagination({
        volume: searchTake,
        totalCount: songsTotalCount
    })

    const songs = useTypedSelector(state => state.songs.songs);
    const {setSongs} = songActions;
    const dispatch = useAppDispatch();

    useEffect(() => {
        setPage(1);
        fetch({
            take: searchTake,
            skip: (currentPage - 1) * searchTake,
            query,
        }).then(response => {
            dispatch(setSongs(response.data.items));
            setSongsTotalCount(response.data.totalCount);
        })
    }, [query])

    useEffect(() => {
        if(query) fetch({
            take: searchTake,
            skip: (currentPage - 1) * searchTake,
            query
        }).then((response) => setSongs([...songs, ...response.data.items]))
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
                {!isLoading && songs.length &&
                    <SongsList lastElementRef={lastElementRef} songs={songs}/>}
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
