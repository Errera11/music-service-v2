import React from 'react';
import styles from './adminPageBtn.module.scss';

interface IProps {
    title: string
    onClick?: (e: React.MouseEvent) => void
    disabled?: boolean
}

const AdminPageBtn: React.FC<IProps> = ({title, onClick, disabled}) => {
    return (
        <button className={styles.button} onClick={onClick} disabled={disabled}>{title}</button>
    );
};

export default AdminPageBtn;