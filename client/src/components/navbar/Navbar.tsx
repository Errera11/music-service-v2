import React, {useState} from 'react';
import styles from '@/components/navbar/navbar.module.scss';
import BarButton from "@/components/barButton/BarButton";
import SongsPageSvg from "@/assets/svg/SongsPageSvg";
import HomePageSvg from "@/assets/svg/HomePageSvg";
import SearchPageSvg from "@/assets/svg/SearchPageSvg";
import PlaylistPageSvg from "@/assets/svg/PlaylistPageSvg";
import {Pages} from "@/assets/types/Pages";
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

    const onClickHandler = (page: Pages) => {
        switch (page) {
            case(Pages.HOME):
                router.push(AppRoutes.HOME_PAGE)
                dispatch(setAppPage(Pages.HOME))
                break;
            case(Pages.SONGS):
                router.push(AppRoutes.SONGS_PAGE)
                dispatch(setAppPage(Pages.SONGS))
                break;
            case(Pages.SEARCH):
                router.push(AppRoutes.SEARCH_PAGE)
                dispatch(setAppPage(Pages.SEARCH))
                break;
            case(Pages.PLAYLIST):
                router.push(AppRoutes.PLAYLIST_PAGE)
                dispatch(setAppPage(Pages.PLAYLIST))
                break;
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.upperBar}>
                <BarButton
                    title={'Search'}
                    onClick={() => onClickHandler(Pages.SEARCH)}
                    isActive={currentPage === Pages.SEARCH}
                    svg={<SearchPageSvg height={'30px'} width={'30px'} isActive={currentPage === Pages.SEARCH} /> }
                />
                <BarButton
                    title={'Home'}
                    onClick={() => onClickHandler(Pages.HOME)}
                    isActive={currentPage === Pages.HOME}
                    svg={<HomePageSvg width={'30px'} height={'30px'} isActive={currentPage === Pages.HOME}/>}
                />
            </div>
            <div className={styles.lowerBar}>
                <div className={styles.title}>
                    Your music
                </div>
                <BarButton
                    title={'Songs'}
                    onClick={() => onClickHandler(Pages.SONGS)}
                    isActive={currentPage === Pages.SONGS}
                    svg={<SongsPageSvg width={'30px'} height={'30px'} isActive={currentPage === Pages.SONGS}/>}
                />
                <BarButton
                    title={'Playlist'}
                    onClick={() => onClickHandler(Pages.PLAYLIST)}
                    isActive={currentPage === Pages.PLAYLIST}
                    svg={<PlaylistPageSvg width={'30px'} height={'30px'} isActive={currentPage === Pages.PLAYLIST}/>}
                />
            </div>
        </div>
    );
};

export default Navbar;