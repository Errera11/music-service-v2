import React from 'react';
import colors from '../colors.module.scss';

const SongsPageSvg = ({isActive, width, height}: { isActive: boolean, width: string, height: string }) => {
    return (
        <div style={{width, height}}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 className="bi bi-music-note" viewBox="0 0 16 16" fill={isActive ? 'white' : colors.description}>
                <path
                    d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
                <path fillRule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
                <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z"/>
            </svg>
        </div>
    );
};

export default SongsPageSvg;