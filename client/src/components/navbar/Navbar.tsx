import React from 'react';
import styles from '@/components/navbar/navbar.module.scss';
import BarButton from "@/components/barButton/BarButton";
import SongsPageSvg from "@/assets/svg/SongsPageSvg";
import HomePageSvg from "@/assets/svg/HomePageSvg";
import SearchPageSvg from "@/assets/svg/SearchPageSvg";
import PlaylistPageSvg from "@/assets/svg/PlaylistPageSvg";
import {useRouter} from "next/router";
import {appRoutes} from "@/assets/appRoutes";

const Navbar = () => {

    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.upperBar}>
                <BarButton
                    title={'Search'}
                    onClick={() => router.push(appRoutes.SEARCH_PAGE)}
                    isActive={router.route === appRoutes.SEARCH_PAGE}
                    svg={<SearchPageSvg height={'30px'} width={'30px'} isActive={router.route === appRoutes.SEARCH_PAGE} /> }
                />
                <BarButton
                    title={'Home'}
                    onClick={() => router.push(appRoutes.HOME_PAGE)}
                    isActive={router.route === appRoutes.HOME_PAGE}
                    svg={<HomePageSvg width={'30px'} height={'30px'} isActive={router.route === appRoutes.HOME_PAGE}/>}
                />
            </div>
            <div className={styles.lowerBar}>
                <div className={styles.title}>
                    Your music
                </div>
                <BarButton
                    title={'Songs'}
                    onClick={() => router.push(appRoutes.SONGS_PAGE)}
                    isActive={router.route === appRoutes.SONGS_PAGE}
                    svg={<SongsPageSvg width={'30px'} height={'30px'} isActive={router.route === appRoutes.SONGS_PAGE}/>}
                />
                <BarButton
                    title={'Playlist'}
                    onClick={() => router.push(appRoutes.PLAYLIST_PAGE)}
                    isActive={router.route === appRoutes.PLAYLIST_PAGE}
                    svg={<PlaylistPageSvg width={'30px'} height={'30px'} isActive={router.route === appRoutes.PLAYLIST_PAGE}/>}
                />
            </div>
        </div>
    );
};

export default Navbar;