import React from 'react';
import styles from './input.module.scss';

interface IProps {
    placeholder: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
}

const Input: React.FC<IProps> = ({placeholder, value, onChange}) => {
    return (
        <div className={styles.container}>
            <input value={value} placeholder={placeholder} onChange={onChange}/>
        </div>
    );
};

export default Input;