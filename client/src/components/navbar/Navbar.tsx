import React from 'react';
import styles from '@/components/navbar/navbar.module.scss';
import BarButton from "@/components/barButton/BarButton";
import SongsPageSvg from "@/assets/svg/SongsPageSvg";
import HomePageSvg from "@/assets/svg/HomePageSvg";
import SearchPageSvg from "@/assets/svg/SearchPageSvg";
import PlaylistPageSvg from "@/assets/svg/PlaylistPageSvg";
import {useRouter} from "next/router";
import {AppRoutes} from "@/assets/appRoutes";

const Navbar = () => {

    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.upperBar}>
                <BarButton
                    title={'Search'}
                    onClick={() => router.push(AppRoutes.SEARCH_PAGE)}
                    isActive={router.route === AppRoutes.SEARCH_PAGE}
                    svg={<SearchPageSvg height={'30px'} width={'30px'} isActive={router.route === AppRoutes.SEARCH_PAGE} /> }
                />
                <BarButton
                    title={'Home'}
                    onClick={() => router.push(AppRoutes.HOME_PAGE)}
                    isActive={router.route === AppRoutes.HOME_PAGE}
                    svg={<HomePageSvg width={'30px'} height={'30px'} isActive={router.route === AppRoutes.HOME_PAGE}/>}
                />
            </div>
            <div className={styles.lowerBar}>
                <div className={styles.title}>
                    Your music
                </div>
                <BarButton
                    title={'Songs'}
                    onClick={() => router.push(AppRoutes.SONGS_PAGE)}
                    isActive={router.route === AppRoutes.SONGS_PAGE}
                    svg={<SongsPageSvg width={'30px'} height={'30px'} isActive={router.route === AppRoutes.SONGS_PAGE}/>}
                />
                <BarButton
                    title={'Playlist'}
                    onClick={() => router.push(AppRoutes.PLAYLIST_PAGE)}
                    isActive={router.route === AppRoutes.PLAYLIST_PAGE}
                    svg={<PlaylistPageSvg width={'30px'} height={'30px'} isActive={router.route === AppRoutes.PLAYLIST_PAGE}/>}
                />
            </div>
        </div>
    );
};

export default Navbar;