import React from 'react';
import colors from '../colors.module.scss';

const ChevronDownSvg = ({isActive, width, height}: { isActive: boolean, width: string, height: string }) => {
    return (
        <div style={{width, height}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill={isActive ? 'white' : colors.description} className="bi bi-chevron-down"
                 viewBox="0 0 16 16">
                <path fillRule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>
        </div>
    );
};

export default ChevronDownSvg;