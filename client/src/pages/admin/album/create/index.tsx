import React from 'react';
import AlbumPageLayout from "@/components/admin/adminPageLayouts/AlbumPageLayout";
import AlbumForm from "@/components/admin/albumForm/AlbumForm";
import {albumApi} from "@/api/album";
import {CreateAlbumDto} from "@/assets/dto/CreateAlbumDto";

const Index = () => {

    const onSubmit = (dto: CreateAlbumDto) => {
        return albumApi.createAlbum(dto)
    }

    return (
        <AlbumPageLayout title={'Create album'}>
            <AlbumForm btnAction={'Create'} onSubmit={onSubmit}/>
        </AlbumPageLayout>
    );
};

export default Index;
