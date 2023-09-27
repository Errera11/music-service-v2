import React from 'react';
import {AxiosResponse} from "axios";
import {Album} from "@/assets/types/Album";
import {NextPageContext} from "next";

export interface IProps {
    onSubmit: (formdata: FormData) => Promise<AxiosResponse<Album>>,
    btnAction: 'Create' | 'Update'
}

const AlbumForm = () => {
    return (
        <div>
            
        </div>
    );
};

AlbumForm.getInitialProps = async (ctx: NextPageContext) => {
    try {
        const
    } catch (e) {
        console.log(e);
        return {
            props: {
                album: {}
            }
        }
    }
}

export default AlbumForm;