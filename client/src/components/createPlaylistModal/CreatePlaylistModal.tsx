import React, {useRef, useState} from 'react';
import styles from './createPlaylistModal.module.scss';
import Input from "@/components/input/Input";
import Image from "next/image";
import Button from "@/components/button/Button";
import {ICreatePlaylist} from "@/api/playlist";

interface IProps {
    closeModal: () => void
    onCreatePlaylist: (playlist: ICreatePlaylist) => void
}

const CreatePlaylistModal: React.FC<IProps> = ({closeModal, onCreatePlaylist}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>();
    const imageRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        onCreatePlaylist({
            title,
            description,
            image: image || undefined
        })
        closeModal()
    }

    return (
            <div className={styles.wrapper}>
                <div className={styles.bg} onClick={() => closeModal()}/>
                <div className={styles.container}>
                    <form className={styles.form}>
                        <input ref={imageRef} onChange={e => setImage(e.target.files && e.target.files[0])}
                               type={'file'}
                               style={{display: 'none'}}/>
                        <div className={styles.playlistImage}
                             onClick={() => imageRef.current && imageRef.current.click()}>
                            {image &&
                                <Image width={100} height={100} src={URL.createObjectURL(image)} alt={'Playlist img'}/>}
                            <span>Set playlist image</span>
                        </div>
                        <Input placeholder={'Playlist name'} onChange={e => setTitle(e.target.value)} value={title}/>
                        <Input placeholder={'Playlist description'} onChange={e => setDescription(e.target.value)} value={description}/>
                        <Button title={'Create playlist'} onClick={() => handleSubmit()}/>
                    </form>
                </div>
            </div>
    );
};

export default CreatePlaylistModal;