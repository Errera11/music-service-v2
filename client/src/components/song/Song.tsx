import React from 'react';
import {Song} from "@/assets/types/Song";
import styles from "@/components/song/song.module.scss";
import MusicNoteSvg from "@/assets/svg/MusicNoteSvg";
import {useSong} from "@/hooks/useSong";
import HeartSvg from "@/assets/svg/HeartSvg";
import {useRemoveFromFavorite} from "@/hooks/useRemoveFromFavorite";
import PopupSuccess from "@/components/popupSuccess/PopupSuccess";

interface IProps {
    song: Song
}

const Song: React.FC<IProps> = ({song}) => {

    const [playerSong, setSong] = useSong();
    const [removeSongFromFavorite, error, isSuccess] = useRemoveFromFavorite();

    return (
        <div className={styles.container}>
            {error && <PopupSuccess message={error} isFailure={!!error} isSuccess={isSuccess}/>}
            <div className={styles.song + ' ' + (playerSong.id === song.id ? styles.active : '')}>
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
                <div onClick={() => removeSongFromFavorite(song.id)}>
                    <HeartSvg isActive={playerSong.isLiked} width={'25px'} height={'25px'} />
                </div>
                <div className={styles.duration}>
                    {song.duration}
                </div>
            </div>
        </div>
    );
};

export default React.memo(Song);