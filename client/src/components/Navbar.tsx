import React from 'react';
import styles from '../styles/navbar/navbar.module.scss';
import BarButton from "@/components/barButton/BarButton";

const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.upperBar}>
                <BarButton title={'Search'} onClick={() => 1} isActive={false} img={{
                    active: 'h',
                    unactive: 'h'
                }} />
                <BarButton title={'Home'} onClick={() => 1} isActive={false} img={{
                    active: 'h',
                    unactive: 'h'
                }} />
            </div>
            <div className={styles.lowerBar}>
                <div className={styles.title}>
                    Your music
                </div>
                <BarButton title={'Songs'} onClick={() => 1} isActive={false} img={{
                    active: 'h',
                    unactive: 'h'
                }} />
                <BarButton title={'Playlists'} onClick={() => 1} isActive={false} img={{
                    active: 'h',
                    unactive: 'h'
                }} />
            </div>
        </div>
    );
};

export default Navbar;