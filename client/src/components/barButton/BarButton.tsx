import React from 'react';
import styles from './barButton.module.scss';

interface IProps {
    title: string,
    onClick: Function,
    isActive: boolean,
    svg: any
}

const BarButton: React.FC<IProps> = ({title, svg, isActive, onClick}) => {
    return (
        <div
            onClick={() => onClick()}
            className={styles.container}>
            {svg}
            <input className={isActive ? styles.active : ''} type={'submit'} value={title}/>
        </div>
    );
};

export default BarButton;