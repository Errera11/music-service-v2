import React from 'react';
import SongPageLayout from "@/components/admin/adminPageLayouts/SongPageLayout";
import {songsApi} from "@/api/songs";
import SongForm from "@/components/admin/songForm/SongForm";

const Index = () => {
    const onCreateSong = (formdata: FormData) => songsApi.createSong(formdata)
    return (
        <SongPageLayout title={'Create song'}>
            <SongForm onSubmit={onCreateSong} />
        </SongPageLayout>
    );
};

export default Index;
