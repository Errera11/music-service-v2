import React from 'react';
import SongPageLayout from "@/components/admin/adminPageLayouts/SongPageLayout";
import {songsApi} from "@/api/songs";
import {InferGetServerSidePropsType} from "next";
import AdminSongList from "@/components/admin/adminSongList/AdminSongList";

const Index = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <SongPageLayout title={'Search songs'}>
            <div style={{width: '90%'}}>
                {data?.songs && <AdminSongList songs={data.songs} /> }
            </div>
        </SongPageLayout>
    );
};

export default Index;

export const getServerSideProps = async () => {
    try {
        const {data} = await songsApi.getAllSongs();
        return {
            props: {
                data
            }
        }
    } catch(e) {
        console.log(e);
        return {
            props: {
                data: null
            }
        }
    }
}