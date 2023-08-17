import React from 'react';
import styles from './authError.module.scss';

const AuthError= ({error}: {error: string}) => {
    return (
        <div className={styles.container}>
            {error}
        </div>
    );
};

export default AuthError;