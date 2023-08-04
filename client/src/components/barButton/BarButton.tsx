import React from 'react';
import styles from './barButton.module.scss';

interface IProps {
    title: string,
    onClick: Function,
    isActive: boolean,
    img: {
        active: string,
        unactive: string
    }
}

const BarButton: React.FC<IProps> = ({title, img, isActive, onClick}) => {
    return (
        <div className={styles.container + (isActive ? 'active' : '')}>
            {isActive ?
                <>
                    <img src={img.active} alt={''}/>
                    <button onClick={() => onClick}>{title}</button>
                </>
                :
                <>
                    <img src={img.unactive} alt={''}/>
                    <button onClick={() => onClick}>{title}</button>
                </>
            }

        </div>
    );
};

export default BarButton;