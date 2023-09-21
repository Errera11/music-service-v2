import React from 'react';
import SongPageLayout from "@/components/admin/adminPageLayouts/SongPageLayout";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {songsApi} from "@/api/songs";

const Song = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <SongPageLayout title={'Edit song'}>

        </SongPageLayout>
    );
};

export default Song;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    try {
        console.log(params);
        const {data} = await songsApi.getSongById(params)
        return {
            props: {
                song: data
            }
        }
    } catch(e) {
        console.log(e);
        return {
            props: {
                song: null
            }
        }
    }
}