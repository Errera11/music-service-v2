import React, {useEffect, useState} from 'react';
import AlbumPageLayout from "@/components/admin/adminPageLayouts/AlbumPageLayout";
import AlbumForm from "@/components/admin/albumForm/AlbumForm";
import {albumApi} from "@/api/album";
import {Song} from "@/assets/types/Song";
import {ISongApiResponse, songsApi} from "@/api/songs";
import AdminSearchBar from "@/components/admin/adminSearchBar/AdminSearchBar";
import useFetch from "@/hooks/useFetch";
import AdminSongListItem from "@/components/admin/adminSongListItem/AdminSongListItem";

const Index = () => {

    const [songSearchQuery, setSongSearchQuery] = useState('');

    const [fetchSongs, isLoading, isError, data] = useFetch<ISongApiResponse>(songsApi.getAllSongs);
    const handleSearchSong = (e: React.FormEvent) => {
        e.preventDefault();
        fetchSongs();
    }

    return (
        <AlbumPageLayout title={'Create album'}>
            <AlbumForm btnAction={'Create'} onSubmit={(album) => albumApi.createAlbum(album)}/>
            <div>
                <form onSubmit={handleSearchSong}>
                    <AdminSearchBar value={songSearchQuery} onChange={e => setSongSearchQuery(e.target.value)}/>
                </form>
                {isLoading ? <div>Loading...</div> :
                    data?.songs.length && data.songs.map(item => <div>
                        <AdminSongListItem song={item}/><span>add to album</span>
                    </div>)}
            </div>
        </AlbumPageLayout>
    );
};

export default Index;