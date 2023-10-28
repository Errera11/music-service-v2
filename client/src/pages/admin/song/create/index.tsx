import React from 'react';
import SongPageLayout from "@/components/admin/adminPageLayouts/SongPageLayout";
import {songsApi} from "@/api/songs";
import SongForm from "@/components/admin/songForm/SongForm";
import {CreateSongDto} from "@/assets/dto/CreateSongDto";

const Index = () => {
    const onCreateSong = (dto: CreateSongDto) => songsApi.createSong(dto)

    return (
        <SongPageLayout title={'Create song'}>
            <SongForm btnAction={'Create'} onSubmit={(dto: CreateSongDto) => onCreateSong(dto)} />
        </SongPageLayout>
    );
};

export default Index;
