import React, {LegacyRef} from 'react';
import {Album} from "@/assets/types/Album";
import AlbumPlate from "@/components/album/AlbumPlate";

interface IProps {
    albums: Album[],
    lastElementRef?: LegacyRef<any>
}

const AlbumList: React.FC<IProps> = ({albums, lastElementRef}) => {

    return (
        <>
            {albums.map((album, index) => {
                if (index === (albums.length - 1) && lastElementRef)
                    return <div ref={lastElementRef} key={album.id}>
                        <AlbumPlate album={album}/>
                    </div>
                return <div key={album.id}>
                    <AlbumPlate album={album}/>
                </div>
            })
            }
        </>
    );
};

export default AlbumList;