import React from 'react';

interface IProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}

const AdminSearchBar: React.FC<IProps> = ({value, onChange, placeholder}) => {
    return (
        <input style={{
            border: '2px solid gray',
            borderRadius: '15px',
            padding: '15px',
            width: '100%',
            height: '100%'
        }} placeholder={placeholder} value={value} onChange={onChange}/>
    );
};

export default AdminSearchBar;