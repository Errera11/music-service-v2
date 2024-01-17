import React from 'react';
import styles from './button.module.scss';

interface IProps {
    title: string
    onClick: () => void
}

const Button: React.FC<IProps> = ({title, onClick}) => {
    return (
        <input className={styles.input} type={'button'} onClick={onClick} value={title}/>
    );
};

export default Button;