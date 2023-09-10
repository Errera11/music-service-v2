import React, {useState} from 'react';
import Layout from "@/components/Layout";
import Head from "next/head";
import SearchBar from "@/components/searchBar/SearchBar";
import styles from '../../styles/search/search.module.scss';
import {songsApi} from "@/api/songs";
import {Song} from "@/assets/types/Song";
import SongsList from "@/components/songsList/SongsList";

const Search = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [songs, setSongs] = useState<Song[]>();
    const onSearch = async (query: string) => {
        setIsLoading(true);
        console.log((await songsApi.searchSongs(query)));
        const {songs: dbSongs, totalCount} = (await songsApi.searchSongs(query)).data;
        setIsLoading(false);
        setSongs(dbSongs)
    }
    return (
        <Layout>
            <>
                <Head>
                    <title>Search</title>
                </Head>
                <div className={styles.container}>
                    <div className={styles.searchBar}>
                        <SearchBar onSearch={(query: string) => onSearch(query)}/>
                    </div>
                    {songs?.length && <SongsList type={'list'} songs={songs}/>}
                </div>
            </>
        </Layout>
    );
};

export default Search;