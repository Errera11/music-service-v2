import React from 'react';

interface IProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const AdminSearchBar: React.FC<IProps> = ({value, onChange}) => {
    return (

        <input style={{
            border: '2px solid gray',
            borderRadius: '15px',
            padding: '15px'
        }} value={value} onChange={onChange}/>
    );
};

export default AdminSearchBar;