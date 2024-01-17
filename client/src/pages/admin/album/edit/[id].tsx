import React from 'react';
import AlbumForm from "@/components/admin/albumForm/AlbumForm";
import {albumApi} from "@/api/album";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {IUpdateAlbum} from "@/assets/types/IUpdateAlbum";
import AlbumPageLayout from "@/components/admin/adminPageLayouts/AlbumPageLayout";

const Id = ({album}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const onUpdateAlbum = (dto: IUpdateAlbum) => {
        return albumApi.updateAlbum(dto);
    }

    return (
        <AlbumPageLayout title={'Edit albumDto'}>
            <AlbumForm onSubmit={(dto) => onUpdateAlbum(dto as IUpdateAlbum)} btnAction={'Edit'} album={album}/>
        </AlbumPageLayout>
    );
};

export default Id;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    try {
        const {data} = await albumApi.getAlbumById(Number.parseInt(params?.id as string))
        return {
            props: {
                album: data
            }
        }
    } catch (e) {
        console.log(e);
        return {
            props: {
                album: {}
            }
        }
    }
}