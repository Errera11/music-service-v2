import React from 'react';
import AlbumForm from "@/components/admin/albumForm/AlbumForm";
import {albumApi} from "@/api/album";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";

const Id = ({album}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div>
            <AlbumForm onSubmit={() => 1} btnAction={'Edit'} album={album}/>
        </div>
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