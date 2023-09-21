import React, {forwardRef} from 'react';
import styles from './adminPageInput.module.scss';

interface IProps {
    type?: string,
    placeholder?: string,
    value?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    accept?: string,
    style?: any
}

// const AdminPageInput: React.ForwardRefRenderFunction<HTMLInputElement, IProps> = forwardRef(({type, style, placeholder, value, onChange, accept}, ref) => {
//     if(ref) return <input style={style} ref={ref} className={styles.input} type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e)} accept={accept}/>
//     return (
//         <input style={style} className={styles.input} type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e)} accept={accept}/>
//     );
// });

const AdminPageInput: React.ForwardRefRenderFunction<HTMLInputElement, IProps> = (
    { type, style, placeholder, value, onChange, accept },
    ref
) => {
    return (
        <input
            style={style}
            ref={ref}
            className={styles.input}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            accept={accept}
        />
    );
};


export default forwardRef(AdminPageInput);