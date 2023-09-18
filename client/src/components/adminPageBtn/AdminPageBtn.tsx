import React from 'react';
import styles from './adminPageBtn.module.scss';

interface IProps {
    title: string
    onClick?: () => void
}

const AdminPageBtn: React.FC<IProps> = ({title, onClick}) => {
    return (
        <div className={styles.container} onClick={onClick}>
            <button>{title}</button>
        </div>
    );
};

export default AdminPageBtn;