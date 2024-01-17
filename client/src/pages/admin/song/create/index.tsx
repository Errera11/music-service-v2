import React from 'react';
import SongPageLayout from "@/components/admin/adminPageLayouts/SongPageLayout";
import {songsApi} from "@/api/songs";
import SongForm from "@/components/admin/songForm/SongForm";
import {ICreateSong} from "@/assets/types/ICreateSong";

const Index = () => {
    const onCreateSong = (dto: ICreateSong) => songsApi.createSong(dto)

    return (
        <SongPageLayout title={'Create song'}>
            <SongForm btnAction={'Create'} onSubmit={(dto: ICreateSong) => onCreateSong(dto)} />
        </SongPageLayout>
    );
};

export default Index;
