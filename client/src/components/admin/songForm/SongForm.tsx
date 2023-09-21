import React from 'react';
import styles from "@/styles/admin/song/songCreatePage.module.scss";
import AdminPageInput from "@/components/admin/adminPageInput/AdminPageInput";
import Dropdown from "@/components/dropdown/Dropdown";
import AdminPageBtn from "@/components/admin/adminPageBtn/AdminPageBtn";

const SongForm = () => {
    return (
        <form className={styles.form}>
            <div className={styles.imageSelectWrapper} onClick={songImageCreateHandler}>
                {image && <img src={URL.createObjectURL(image)}/>}
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
                        items={songGenres?.map(item => ({id: item.id, title: item.genre}))}/>
                </div>
                <div className={styles.createBtnWrapper}>
                    <AdminPageBtn onClick={(e) => submitHandler(e)} title={'Create'}/>
                </div>
            </div>
        </form>
    );
};

export default SongForm;