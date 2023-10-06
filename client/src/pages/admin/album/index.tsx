import React from 'react';
import AlbumPageLayout from "@/components/admin/adminPageLayouts/AlbumPageLayout";
import {InferGetServerSidePropsType} from "next";
import {albumApi} from "@/api/album";
import AdminAlbumList from "@/components/admin/adminAlbumList/AdminAlbumList";

const Index = ({albums}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <AlbumPageLayout title={'Search albums'}>
            {albums && <AdminAlbumList albums={albums}/>}
        </AlbumPageLayout>
    );
};

export default Index;

export const getServerSideProps = async () => {
    try {
        const {data} = await albumApi.getAll({});
        return {
            props: {
                albums: data
            }
        }
    } catch (e) {
        console.log(e);
        return {
            props: {
                albums: []
            }
        }
    }
}