import React, {useEffect} from 'react';
import styles from './player.module.scss';
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {playerActions} from "@/store/player";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {normalizeTime} from "@/assets/normalizeTime";
import HeartSvg from "@/assets/svg/HeartSvg";
import {LazyImage} from "@/components/LazyImage";

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
        isPlaying,
        isLiked
    } = useTypedSelector(state => state.player);

    const {setDuration, setIsPlaying, setVolume, setCurrentTime} = playerActions;
    const dispatch = useAppDispatch();

    useEffect(() => {
        playingSong.src = audio;
        playingSong.volume = volume;
        playingSong.onloadedmetadata = () => {
            if(isPlaying) {
                dispatch(setIsPlaying(true));
                playingSong.autoplay = true;
            } else {
                playingSong.autoplay = false;
            }
            dispatch(setDuration(playingSong.duration));
            playingSong.currentTime = currentTime;
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
            dispatch(setCurrentTime(Number(e.target.value)));
            playingSong.currentTime = Number(e.target.value);
        }
    }

    const soundHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setVolume(Number(e.target.value)))
        playingSong.volume = Number(e.target.value);
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
                <div className={styles.imageWrapper}>
                    <LazyImage src={image} className={styles.image}/>
                </div>
                <div className={styles.music_info}>
                    <span className={styles.title}>{title}</span>
                    <span className={styles.artist}>{artist}</span>
                </div>
                <div className={styles.like}>
                    <HeartSvg isActive={isLiked} width={'35px'} height={'35px'} />
                </div>
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
                         fill="currentColor" viewBox="0 0 16 16" className={styles.playerButton}>
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