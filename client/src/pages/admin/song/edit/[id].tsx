import React from 'react';
import SongPageLayout from "@/components/admin/adminPageLayouts/SongPageLayout";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {songsApi} from "@/api/songs";
import SongForm from "@/components/admin/songForm/SongForm";

const Song = ({song}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const onSubmit = (formdata: FormData) => songsApi.updateSong(formdata);

    return (
        <SongPageLayout title={'Edit song'}>
            <SongForm onSubmit={(formdata) => onSubmit(formdata)} song={song} btnAction={'Update'}/>
        </SongPageLayout>
    );
};

export default Song;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    try {
        if(params?.id) {
            const {data} = await songsApi.getSongById(Number.parseInt(params.id as string))
            return {
                props: {
                    song: data
                }
            }
        }
        return {
            props: {
                song: null
            }
        }
    } catch (e) {
        console.log(e);
        return {
            props: {
                song: null
            }
        }
    }
}