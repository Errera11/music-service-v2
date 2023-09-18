import React from 'react';
import styles from './dropdownActiveItem.module.scss';

interface IProps {
    title: string
    id: string | number,
    onRemove: (item: any) => void
}

const DropdownActiveItem: React.FC<IProps> = ({title, onRemove, id}) => {
    return (
        <div className={styles.container}>
            <span>{title}</span>
            <span onClick={() => onRemove({id, title})}>x</span>
        </div>
    );
};

export default DropdownActiveItem;