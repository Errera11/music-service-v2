import React, {useRef, useState} from 'react';
import {Album, AlbumById} from "@/assets/types/Album";
import styles from './albumForm.module.scss';
import AdminPageInput from "@/components/admin/adminPageInput/AdminPageInput";
import AdminPageBtn from "@/components/admin/adminPageBtn/AdminPageBtn";
import AdminSongList from "@/components/admin/adminSongList/AdminSongList";
import {CreateAlbumDto} from "@/assets/dto/CreateAlbumDto";

export interface IProps {
    onSubmit: (dto: CreateAlbumDto) => void,
    btnAction: 'Create' | 'Edit',
    album?: AlbumById
}

const AlbumForm: React.FC<IProps> = ({onSubmit, album, btnAction}) => {

    const [title, setTitle] = useState(album?.title || '');
    const [author, setAuthor] = useState(album?.author || '');
    const [description, setDescription] = useState(album?.description || '');
    const [image, setImage] = useState<File | string | null>(album?.image || '')

    const imageRef = useRef<HTMLInputElement>(null);

    const onFormSubmit = (e: React.MouseEvent) => {
        e.preventDefault()
        if(title && author && (image instanceof File)) {
            onSubmit({title, image, description, author, album_songs: []})
        }
    }

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
                        placeholder={'Album title'}
                        value={title}
                        onChange={e => setTitle(e.target.value)}/>
                    <AdminPageInput
                        placeholder={'Album author'}
                        value={author}
                        onChange={e => setAuthor(e.target.value)}/>
                    <AdminPageInput
                        placeholder={'Album description'}
                        value={description}
                        onChange={e => setDescription(e.target.value)}/>
                    <div className={styles.submitBtn}>
                        <AdminPageBtn onClick={e => onFormSubmit(e)} title={btnAction}/>
                    </div>
                </div>
            </form>
            {album?.songs && <AdminSongList songs={album?.songs} />}
        </div>
    );
};

export default AlbumForm;