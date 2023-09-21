import React, {useEffect, useRef, useState} from 'react';
import styles from '../../../../styles/admin/song/songCreatePage.module.scss';
import AdminPageBtn from "@/components/admin/adminPageBtn/AdminPageBtn";
import Dropdown from "@/components/dropdown/Dropdown";
import {songsApi} from "@/api/songs";
import AdminPageInput from "@/components/admin/adminPageInput/AdminPageInput";
import SongPageLayout from "@/components/admin/adminPageLayouts/SongPageLayout";

interface IGenre {
    id: number
    genre: string
}

const Index = () => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [description, setDescription] = useState('');
    const [audio, setAudio] = useState<File>();
    const [image, setImage] = useState<File | null>();
    const [selectedSongGenres, setSelectedSongGenres] = useState<{ id: number, title: string }[]>([]);
    const [songGenres, setSongGenres] = useState<IGenre[]>()

    const [genre, setGenre] = useState('');
    const [createGenrePopup, setCreateGenrePopup] = useState(false);

    const imageInputRef = useRef<HTMLInputElement>(null);
    const audioInputRef = useRef<HTMLInputElement>(null);

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

    function songImageCreateHandler() {
        if (imageInputRef.current) (imageInputRef.current as HTMLInputElement).click();
    }

    function submitHandler(e: React.MouseEvent) {
        e.stopPropagation();
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('title', title);
        formdata.append('description', description);
        formdata.append('audio', audio as Blob);
        formdata.append('image', image as Blob);
        formdata.append('artist', artist);
        formdata.append('genre', JSON.stringify(selectedSongGenres.map(item => ({id: item.id, genre: item.title}))));


        songsApi.createSong(formdata).then(response => {
            console.log(response)
            setTitle('');
            setArtist('');
            setDescription('');
            setImage(null);
            setSelectedSongGenres([]);
            if(audioInputRef.current) audioInputRef.current.value = '';
            if(imageInputRef.current) imageInputRef.current.value = '';

        })
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
        <SongPageLayout title={'Create song'}>
            <div className={styles.container}>
                <div style={{width: 'fit-content', marginBottom: '10px'}}>
                    <AdminPageBtn onClick={() => setCreateGenrePopup(true)} title={'Create new song genre'}/>
                </div>


                {createGenrePopup && <div className={styles.createGenrePopup}>
                    <form className={styles.form} onClick={() => setCreateGenrePopup(false)}>
                        <div onClick={(e) => e.stopPropagation()}>
                            <AdminPageInput value={genre} onChange={(e) => setGenre(e.target.value)}/>
                            <AdminPageBtn onClick={() => createGenreHandler()} title={'Create genre'}/>
                        </div>
                    </form>
                </div>}
            </div>

        </SongPageLayout>
    );
};

export default Index;
