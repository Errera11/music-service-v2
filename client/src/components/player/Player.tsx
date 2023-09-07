import React, {useEffect} from 'react';
import styles from './player.module.scss';
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {playerActions} from "@/store/player";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {normalizeTime} from "@/assets/normalizeTime";

const playingSong: HTMLAudioElement = document.createElement('audio');

const Player = () => {

    const {
        id: songId,
        audio,
        duration,
        volume,
        artist,
        image,
        title,
        currentTime,
        isPlaying
    } = useTypedSelector(state => state.player);

    const {setDuration, setIsPlaying, setVolume, setCurrentTime} = playerActions;
    const dispatch = useAppDispatch();

    useEffect(() => {
        playingSong.src = audio;
        playingSong.volume = volume;
        playingSong.currentTime = currentTime;
        playingSong.onloadedmetadata = () => {
            playingSong.autoplay = true;
            dispatch(setDuration(playingSong.duration));
            dispatch(setIsPlaying(true));
        }

        playingSong.onended = () => {
            dispatch(setIsPlaying(false));
        }

        playingSong.ontimeupdate = () => {
            dispatch(setCurrentTime(playingSong.currentTime));
        }

        playingSong.onvolumechange = () => {
            dispatch(setVolume(playingSong.volume));
        }

    }, [songId])

    const timeLineHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (duration) {
            console.log(e.target.value);
            dispatch(setCurrentTime(Number(e.target.value)));
            playingSong.currentTime = Number(e.target.value);
        }
    }

    const soundHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(playingSong.id);
        dispatch(setVolume(Number(e.target.value)))
        playingSong.volume = volume;
    }

    const playHandler = () => {
        if (duration) {
            dispatch(setIsPlaying(!isPlaying));
            isPlaying ? playingSong.pause() : playingSong.play();
        }
    }

    if (!title) return <></>

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <img src={image}/>
                <div className={styles.music_info}>
                    <span className={styles.title}>{title}</span>
                    <span className={styles.artist}>{artist}</span>
                </div>
                {/*Like*/}
                <svg onClick={() => 1} xmlns="http://www.w3.org/2000/svg"
                     className={styles.like + ' ' + (true ? styles.active : '')} viewBox="-1 0 20 16">
                    <path
                        d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>
            </div>
            <div className={styles.playback}>
                <div className={styles.controllers}>
                    {/*Player skip back*/}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                         className={styles.back} viewBox="0 0 16 16">
                        <path
                            d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.713 3.31 4 3.655 4 4.308v7.384c0 .653.713.998 1.233.696L11.5 8.752V12a.5.5 0 0 0 1 0V4zM5 4.633 10.804 8 5 11.367V4.633z"/>
                    </svg>
                    <svg onClick={playHandler} xmlns="http://www.w3.org/2000/svg"
                         fill="currentColor" viewBox="0 0 16 16">
                        {isPlaying ? <>
                                {/*Player stop*/}
                                <path
                                    d="M3.5 5A1.5 1.5 0 0 1 5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5zM5 4.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H5z"/>
                            </>
                            :
                            <>
                                {/*Player play*/}
                                <path
                                    d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
                            </>
                        }
                    </svg>
                    {/*Player skip*/}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                         className={styles.skip} viewBox="0 0 16 16">
                        <path
                            d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.713 3.31 4 3.655 4 4.308v7.384c0 .653.713.998 1.233.696L11.5 8.752V12a.5.5 0 0 0 1 0V4zM5 4.633 10.804 8 5 11.367V4.633z"/>
                    </svg>
                </div>
                <div className={styles.timeline}>
                    <span>{normalizeTime(currentTime)}</span>
                    <input className={styles.timelineSlider} type={'range'} min={0} max={duration} value={currentTime} step={0.001}
                           onChange={timeLineHandler}
                    />
                    <span>{normalizeTime(duration)}</span>
                </div>
            </div>
            <div className={styles.sound}>
                {/*Volume*/}
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                     className={styles.volume} viewBox="0 0 16 16">
                    <path
                        d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12V4zM6.312 6.39 8 5.04v5.92L6.312 9.61A.5.5 0 0 0 6 9.5H4v-3h2a.5.5 0 0 0 .312-.11zM12.025 8a4.486 4.486 0 0 1-1.318 3.182L10 10.475A3.489 3.489 0 0 0 11.025 8 3.49 3.49 0 0 0 10 5.525l.707-.707A4.486 4.486 0 0 1 12.025 8z"/>
                </svg>
                <input className={styles.timelineSlider} type={'range'} min={0} max={1} value={volume} step={0.01}
                       onChange={soundHandler}/>
            </div>
        </div>
    );
};


export default Player;