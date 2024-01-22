import React, {useEffect, useRef, useState} from 'react';
import AdminPageInput from "@/components/admin/adminPageInput/AdminPageInput";
import Dropdown from "@/components/dropdown/Dropdown";
import AdminPageBtn from "@/components/admin/adminPageBtn/AdminPageBtn";
import {songsApi} from "@/api/songs";
import {AxiosResponse} from "axios";
import {Song} from "@/assets/types/Song";
import styles from './songForm.module.scss';
import {ICreateSong} from "@/assets/types/ICreateSong";
import {IUpdateSong} from "@/assets/types/IUpdateSong";

export interface IGenre {
    id: number
    genre: string
}

export interface IProps {
    onSubmit: (dto: IUpdateSong | ICreateSong) => Promise<AxiosResponse<Song>>
    song?: Song
    btnAction: 'Create' | 'Update'
}

const SongForm: React.FC<IProps> = ({onSubmit, song, btnAction}) => {

    const [isDisabled, setIsDisabled] = useState(false);

    const [title, setTitle] = useState(song?.title);
    const [artist, setArtist] = useState(song?.artist);
    const [description, setDescription] = useState(song?.description);
    const [audio, setAudio] = useState<File | string | null>();
    const [image, setImage] = useState<File | string | null>();
    const [selectedSongGenres, setSelectedSongGenres] = useState<{id: number, title: string}[] | []>(song?.genre.map(item => ({title: item.genre, id: item.id})) || []);
    const [songGenres, setSongGenres] = useState<IGenre[]>()

    const imageInputRef = useRef<HTMLInputElement>(null);
    const audioInputRef = useRef<HTMLInputElement>(null);

    const [createGenrePopup, setCreateGenrePopup] = useState(false);
    const [genre, setGenre] = useState('');

    function songImageAddHandler() {
        if (imageInputRef.current) (imageInputRef.current as HTMLInputElement).click();
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const {data} = await songsApi.getAllGenres();
                setSongGenres(data);
            } catch (e) {
                console.log(e);
            }
        }
        fetch();
    }, [])

    function submitHandler(e: React.MouseEvent) {
        setIsDisabled(true);
        e.stopPropagation();
        e.preventDefault();

         onSubmit({
            title,
            audio: audio || '',
            artist,
            id: song?.id,
            image: image || '',
            description
        }).finally(() => setIsDisabled(false))
    }

    function createGenreHandler() {
        songsApi.createGenre(genre).then(response => setSongGenres(prev => {
            if (prev?.length) return [...prev, response.data];
            return [response.data]

        }));
        setCreateGenrePopup(false)
        setGenre('')
    }

    return (
        <>
            <div className={styles.container}>
                <div style={{width: 'fit-content', marginBottom: '10px'}}>
                    <AdminPageBtn onClick={() => setCreateGenrePopup(true)} title={'Create new song genre'}/>
                </div>
                <form className={styles.form}>
                    <div className={styles.imageSelectWrapper} onClick={songImageAddHandler}>
                        {image ? <img src={ typeof image === 'string' ? image : URL.createObjectURL(image)}/> :
                            <img src={song?.image}/>}
                        <div className={styles.imageSelectHover}>Select image</div>
                        <input type={'file'} accept={'image/*'} ref={imageInputRef}
                               onChange={e => setImage(e.target.files![0])} style={{display: "none"}}/>
                    </div>
                    <div className={styles.songInfo}>
                        <div className={styles.input}>
                            <AdminPageInput type={'text'} placeholder={'Song title'} value={title}
                                            onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                        <div className={styles.input}>
                            <AdminPageInput type={'text'} placeholder={'Song artist'} value={artist}
                                            onChange={(e) => setArtist(e.target.value)}/>
                        </div>
                        <div className={styles.input}>
                            <AdminPageInput type={'text'} placeholder={'Song description'} value={description}
                                            onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                        <div className={styles.input}>
                            <AdminPageInput ref={audioInputRef} type={'file'} accept={'audio/*'} placeholder={'Song'}
                                            onChange={(e) => setAudio(e.target.files![0])}/>
                        </div>
                        <div className={styles.dropdown}>
                            <Dropdown
                                onAppendItem={(item) => setSelectedSongGenres(prev => {
                                    if (prev.some(selectedItem => item.id === selectedItem.id)) return prev;
                                    return [...prev, item]
                                })}
                                onRemoveItem={(item) => setSelectedSongGenres(prev => prev.filter(selectedItem => selectedItem.id !== item.id))}
                                selectedItems={selectedSongGenres?.map(item => ({id: item.id, title: item.title}))}
                                title={'Genre'}
                                emptyMessage={'No genrescreated'}
                                items={songGenres?.map(item => ({id: item.id, title: item.genre}))}/>
                        </div>
                        <div className={styles.createBtnWrapper}>
                            <AdminPageBtn disabled={isDisabled} onClick={(e) => submitHandler(e)} title={btnAction}/>
                        </div>
                    </div>
                </form>
            </div>
            {createGenrePopup && <div className={styles.createGenrePopup} onClick={() => setCreateGenrePopup(false)}>
                <form className={styles.form} >
                    <div onClick={(e) => e.stopPropagation()}>
                        <AdminPageInput value={genre} onChange={(e) => setGenre(e.target.value)}/>
                        <AdminPageBtn onClick={() => createGenreHandler()} title={'Create genre'}/>
                    </div>
                </form>
            </div>}

        </>
    );
};

export default SongForm;

