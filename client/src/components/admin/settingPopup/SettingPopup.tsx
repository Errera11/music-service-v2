import React from 'react';
import styles from './settingsPopup.module.scss';

interface IProps {
    properties: {property: string, onClick: () => void}[]
    ref?: React.Ref<any>
}

const SettingPopup: React.FC<IProps> = ({properties, ref}) => {
    return (
        <div className={styles.container} ref={ref}>
            <ul>
                {properties.map(property => <li onClick={() => property.onClick()}>{property.property}</li>)}
            </ul>
        </div>
    );
};

export default SettingPopup;