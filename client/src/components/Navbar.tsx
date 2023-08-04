import React from 'react';
import styles from '../styles/navbar/navbar.module.scss';
import BarButton from "@/components/barButton/BarButton";

const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.upperBar}>
                <BarButton title={'Songs'} onClick={() => 1} isActive={false} img={{
                    active: 'h',
                    unactive: 'h'
                }} />
            </div>
            <div className={styles.lowerBar}>

            </div>
        </div>
    );
};

export default Navbar;