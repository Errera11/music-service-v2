import React, {useRef, useState} from 'react';
import styles from '../../../../styles/admin/song/songCreatePage.module.scss';
import AdminPageBtn from "@/components/adminPageBtn/AdminPageBtn";
import Dropdown from "@/components/dropdown/Dropdown";

const Index = () => {

    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [description, setDescription] = useState('');
    const [audio, setAudio] = useState<File>();
    const [image, setImage] = useState<File>();
    const [songGenres, setSongGenres] = useState([]);

    const imageInputRef = useRef(null);
    function songImageCreateHandler() {
        if(imageInputRef.current) (imageInputRef.current as HTMLInputElement).click();

    }

    return (
        <div className={styles.container}>
            <header>
                <h1>Create song</h1>
                <div className={styles.btns}>
                    <AdminPageBtn title={'Create'}  />
                    <AdminPageBtn title={'Search'}  />
                </div>
            </header>

            <form className={styles.form}>
                <div className={styles.imageSelectWrapper} onClick={songImageCreateHandler}>
                    {image && <img  src={URL.createObjectURL(image)}/>}
                    <div className={styles.imageSelectHover}>Select image</div>
                    <input type={'file'} accept={'image/*'} ref={imageInputRef} onChange={e => setImage(e.target.files[0])} type={'file'} style={{display: "none"}} />
                </div>
                <div className={styles.songInfo}>
                    <input type={'text'} placeholder={'Song title'} value={title}
                           onChange={(e) => setTitle(e.target.value)}/>
                    <input type={'text'} placeholder={'Song artist'} value={artist}
                           onChange={(e) => setArtist(e.target.value)}/>
                    <input type={'text'} placeholder={'Song description'} value={description}
                           onChange={(e) => setDescription(e.target.value)}/>
                    <input type={'file'} accept={'audio/'} placeholder={'Song'} onChange={(e) => setAudio(e.target.files[0])}/>
                    <div className={styles.dropdown}>
                        <Dropdown
                            onAppendItem={(item) => setSongGenres(prev => {
                                if(prev.some(selectedItem => item.id === selectedItem.id)) return prev;
                                return [...prev, item]
                            })}
                            onRemoveItem={(item) => setSongGenres(prev => prev.filter(selectedItem => selectedItem.id !== item.id))}
                            selectedItems={songGenres}
                            title={'Genre'}
                            items={[{id: 1, title: 'Pop'}, {id: 2, title: 'Rock'}, {id: 3, title: 'Indi'}, {id: 4, title: 'Folk'},
                                {id: 5, title: 'Indie-Rock'},
                                {id: 6, title: 'Metal'},
                                {id: 7, title: 'Alt-rock'}]}/>
                    </div>
                    <div className={styles.createBtnWrapper}>
                        <AdminPageBtn title={'Create'} />
                    </div>

                </div>
            </form>
        </div>
    );
};

export default Index;