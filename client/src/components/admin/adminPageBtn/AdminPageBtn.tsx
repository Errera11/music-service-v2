import React from 'react';
import styles from './adminPageBtn.module.scss';

interface IProps {
    title: string
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const AdminPageBtn: React.FC<IProps> = ({title, onClick}) => {
    return (
        <div className={styles.container}>
            <button onClick={onClick}>{title}</button>
        </div>
    );
};

export default AdminPageBtn;