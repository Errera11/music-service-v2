import React from 'react';
import styles from './adminSidebarBtn.module.scss';

interface IProps {
    title: string
    onClick: () => void
}

const AdminSidebarBtn: React.FC<IProps> = ({title, onClick}) => {
    return (
        <div onClick={onClick} className={styles.container}>
            <button>{title}</button>
        </div>
    );
};

export default AdminSidebarBtn;