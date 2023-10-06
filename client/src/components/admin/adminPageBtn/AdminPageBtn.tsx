import React from 'react';
import styles from './adminPageBtn.module.scss';

interface IProps {
    title: string
    onClick?: (e: React.MouseEvent) => void
    disabled?: boolean
}

const AdminPageBtn: React.FC<IProps> = ({title, onClick, disabled}) => {
    return (
        <div onClick={onClick} className={styles.container}>
            <button disabled={disabled}>{title}</button>
        </div>
    );
};

export default AdminPageBtn;