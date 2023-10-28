import React from 'react';
import styles from './adminPageLayout.module.scss';

interface IProps {
    title: string,
    children?: React.ReactNode
}

const UserPageLayout: React.FC<IProps> = ({title, children}) => {
    return (
        <div className={styles.container}>
            <header>
                <h1>{title}</h1>
                <div className={styles.btns}>
                </div>
            </header>
            <div>
                {children}
            </div>
        </div>
    );
};

export default UserPageLayout;