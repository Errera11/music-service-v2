import React, {useState} from 'react';
import styles from '@/components/navbar/navbar.module.scss';
import BarButton from "@/components/barButton/BarButton";
import SongsPageSvg from "@/assets/svg/SongsPageSvg";
import HomePageSvg from "@/assets/svg/HomePageSvg";
import SearchPageSvg from "@/assets/svg/SearchPageSvg";
import PlaylistPageSvg from "@/assets/svg/PlaylistPageSvg";
import {NavbarPages} from "@/assets/types/Navbar";
import {useRouter} from "next/router";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppStore} from "@/store/store";
import {setAppPage} from "@/store/appPage";
import {AppRoutes} from "@/assets/appRoutes";

const Navbar = () => {

    const router = useRouter();

    const sel: TypedUseSelectorHook<ReturnType<AppStore["getState"]>> = useSelector;
    const { currentPage } = sel(state => state.AppPage)
    const dispatch = useDispatch();

    const onClickHandler = (page: NavbarPages) => {
        switch (page) {
            case(NavbarPages.HOME):
                router.push(AppRoutes.HOME_PAGE)
                dispatch(setAppPage(NavbarPages.HOME))
                break;
            case(NavbarPages.SONGS):
                router.push(AppRoutes.SONGS_PAGE)
                dispatch(setAppPage(NavbarPages.SONGS))
                break;
            case(NavbarPages.SEARCH):
                router.push(AppRoutes.SEARCH_PAGE)
                dispatch(setAppPage(NavbarPages.SEARCH))
                break;
            case(NavbarPages.PLAYLIST):
                router.push(AppRoutes.PLAYLIST_PAGE)
                dispatch(setAppPage(NavbarPages.PLAYLIST))
                break;
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.upperBar}>
                <BarButton
                    title={'Search'}
                    onClick={() => onClickHandler(NavbarPages.SEARCH)}
                    isActive={currentPage === NavbarPages.SEARCH}
                    svg={<SearchPageSvg height={'30px'} width={'30px'} isActive={currentPage === NavbarPages.SEARCH} /> }
                />
                <BarButton
                    title={'Home'}
                    onClick={() => onClickHandler(NavbarPages.HOME)}
                    isActive={currentPage === NavbarPages.HOME}
                    svg={<HomePageSvg width={'30px'} height={'30px'} isActive={currentPage === NavbarPages.HOME}/>}
                />
            </div>
            <div className={styles.lowerBar}>
                <div className={styles.title}>
                    Your music
                </div>
                <BarButton
                    title={'Songs'}
                    onClick={() => onClickHandler(NavbarPages.SONGS)}
                    isActive={currentPage === NavbarPages.SONGS}
                    svg={<SongsPageSvg width={'30px'} height={'30px'} isActive={currentPage === NavbarPages.SONGS}/>}
                />
                <BarButton
                    title={'Playlist'}
                    onClick={() => onClickHandler(NavbarPages.PLAYLIST)}
                    isActive={currentPage === NavbarPages.PLAYLIST}
                    svg={<PlaylistPageSvg width={'30px'} height={'30px'} isActive={currentPage === NavbarPages.PLAYLIST}/>}
                />
            </div>
        </div>
    );
};

export default Navbar;