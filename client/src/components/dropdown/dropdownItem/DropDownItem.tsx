import React from 'react';
import styles from './dropDownItem.module.scss';

interface IProps {
    id: number | string
    title: string
    isSelected: boolean
}

const DropDownItem: React.FC<IProps> = ({id, title, isSelected}) => {
    return (
        <li className={styles.container + ' ' + (isSelected ? styles.selected : '')}>
            <span>{title}</span>
        </li>
    );
};

export default DropDownItem;