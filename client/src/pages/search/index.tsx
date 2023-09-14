import React, {useCallback, useEffect, useRef, useState} from 'react';
import Layout from "@/components/Layout";
import Head from "next/head";
import SearchBar from "@/components/searchBar/SearchBar";
import styles from '../../styles/search/search.module.scss';
import {ISongApiResponse, songsApi} from "@/api/songs";
import SongsList from "@/components/songsList/SongsList";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/loader/Loader";
import {AxiosResponse} from "axios";
import {Song} from "@/assets/types/Song";
import song from "@/components/song/Song";

const Search = () => {

    const [pageNumber, setPageNumber] = useState(1);
    const searchTake = 10;
    const searchSkip = (pageNumber - 1) * searchTake;
    const [query, setQuery] = useState('')
    const [fetch, isLoading, isError] = useFetch((...args) => songsApi.searchSongs(query, ...args))
    const [songs, setSongs] = useState<Song[]>([]);
    const [hasMoreSongs, setHasMoreSongs] = useState(false)

    console.log(hasMoreSongs);
    const observer = useRef<null | IntersectionObserver>(null)
    const lastElementRef = useCallback((node: HTMLElement) => {
        if(isLoading && !node) return;
        observer.current?.disconnect()
        observer.current?.observe(node)
    }, [])

    useEffect(() => {
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                console.log(1);
                setPageNumber(prev => prev + 1)
            }
        })
    }, [])

    useEffect(() => {
        if(query) fetch().then(data => {
            if(data) {
                if(data.data.songs.length) setSongs(prev => [...prev, ...data.data.songs]);
                else setSongs([])
            }

        })
    }, [query])

    useEffect(() => {
        if(hasMoreSongs) fetch(searchSkip, searchTake).then(data => {
            if(data) {
                setSongs(prev => [...prev, ...data.data.songs])
                setHasMoreSongs(searchSkip < data.data.totalCount)
            }
        })
    }, [pageNumber])

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
                    {songs?.length ? <SongsList lastElementRef={lastElementRef} type={'list'} songs={songs}/>
                        : <div className={styles.searchFailureMessage}>No songs found</div>}
                    {isLoading && <div className={styles.loader}>
                        <Loader/>
                    </div>}
                </div>
            </>
        </Layout>
    );
};

export default Search;