import React, {useState} from 'react';
import {Song} from "@/assets/types/Song";
import styles from "@/components/song/song.module.scss";
import MusicNoteSvg from "@/assets/svg/MusicNoteSvg";
import {useSong} from "@/hooks/useSong";
import HeartSvg from "@/assets/svg/HeartSvg";
import {useRemoveFromFavorite} from "@/hooks/useRemoveFromFavorite";
import PopupSuccess from "@/components/popupSuccess/PopupSuccess";
import {songsApi} from "@/api/songs";

interface IProps {
    song: Song
}

const Song: React.FC<IProps> = ({song}) => {

    const {currentSong, setSong} = useSong();

    const [popupMessageData, setPopupMessageData] = useState({
        message: '',
        isSuccess: false
    })

    const addToFavorite = () => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            setPopupMessageData({
                message: 'You must authorize!',
                isSuccess: false
            })
            return
        }
        songsApi.addToFavorite({
            authToken,
            songId: song.id
        })
            .then(() => setPopupMessageData({
                message: 'Success',
                isSuccess: true
            }))
            .catch(() => setPopupMessageData({
                message: 'Some error occurred',
                isSuccess: false
            }))
    }

    return (
        <div className={styles.container}>
            <PopupSuccess setShow={setPopupMessageData} show={popupMessageData}/>
            <div className={styles.song + ' ' + (currentSong.id === song.id ? styles.active : '')}>
                <div className={styles.songNote}>
                    <MusicNoteSvg width={'25px'} height={'25px'} isActive={false}/>
                </div>
                <div className={styles.songInfo} onClick={() => setSong(song)}>
                    <span className={styles.title}>
                        {song.title}
                    </span>
                    <span className={styles.artist}>
                        {song.artist}
                    </span>
                </div>
                <div onClick={() => addToFavorite()}>
                    <HeartSvg isActive={currentSong.isLiked} width={'25px'} height={'25px'} />
                </div>
                <div className={styles.duration}>
                    {song.duration}
                </div>
            </div>
        </div>
    );
};

export default React.memo(Song);