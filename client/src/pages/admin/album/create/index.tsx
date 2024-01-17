import React from 'react';
import AlbumPageLayout from "@/components/admin/adminPageLayouts/AlbumPageLayout";
import AlbumForm from "@/components/admin/albumForm/AlbumForm";
import {albumApi} from "@/api/album";
import {ICreateAlbum} from "@/assets/types/ICreateAlbum";

const Index = () => {

    const onSubmit = (dto: ICreateAlbum) => {
        return albumApi.createAlbum(dto)
    }

    return (
        <AlbumPageLayout title={'Create albumDto'}>
            <AlbumForm btnAction={'Create'} onSubmit={(dto) => onSubmit(dto as ICreateAlbum)}/>
        </AlbumPageLayout>
    );
};

export default Index;
