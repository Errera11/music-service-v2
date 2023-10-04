import React, {useRef, useState} from 'react';
import {AxiosResponse} from "axios";
import {Album, AlbumById} from "@/assets/types/Album";
import styles from './albumForm.module.scss';
import AdminPageInput from "@/components/admin/adminPageInput/AdminPageInput";
import AdminPageBtn from "@/components/admin/adminPageBtn/AdminPageBtn";
import AdminSongList from "@/components/admin/adminSongList/AdminSongList";
import {Song} from "@/assets/types/Song";
import {CreateAlbumDto} from "@/assets/dto/CreateAlbumDto";

export interface IProps {
    onSubmit: (dto: CreateAlbumDto) => Promise<AxiosResponse<Album>>,
    btnAction: 'Create' | 'Update',
    album?: AlbumById
}

const AlbumForm: React.FC<IProps> = ({onSubmit, album, btnAction}) => {

    const [title, setTitle] = useState(album?.title || '');
    const [author, setAuthor] = useState(album?.author || '');
    const [description, setDescription] = useState(album?.description || '');
    const [image, setImage] = useState<File | string | null>(album?.image || '')

    const imageRef = useRef<HTMLInputElement>(null);

    return (
        <div className={styles.container}>
            <h1>{btnAction + ' album'}</h1>
            <form className={styles.form}>
                <div className={styles.imageSelect}>
                    <input onChange={e => setImage(e.target.files![0])} style={{display: 'none'}} type={'file'}
                           accept={'image/*'} ref={imageRef}/>
                    <div className={styles.imageCreate} onClick={() => imageRef.current?.click()}>
                        {image && <img src={typeof image === 'string' ? image : URL.createObjectURL(image)}/>}
                        <div className={styles.hover}>Select image</div>
                    </div>
                </div>
                <div>
                    <AdminPageInput
                        value={title}
                        onChange={e => setTitle(e.target.value)}/>
                    <AdminPageInput
                        value={author}
                        onChange={e => setAuthor(e.target.value)}/>
                    <AdminPageInput
                        value={description}
                        onChange={e => setDescription(e.target.value)}/>
                    <div className={styles.submitBtn}>
                        <AdminPageBtn title={btnAction} onClick={() => onSubmit}/>
                    </div>
                </div>
            </form>
            {album?.songs.length && <AdminSongList songs={album?.songs} />}
        </div>
    );
};

export default AlbumForm;