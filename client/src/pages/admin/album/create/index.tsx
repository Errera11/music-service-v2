import React from 'react';
import AlbumPageLayout from "@/components/admin/adminPageLayouts/AlbumPageLayout";
import AlbumForm from "@/components/admin/albumForm/AlbumForm";

const Index = () => {
    return (
        <AlbumPageLayout title={'Create album'}>
            <AlbumForm />
        </AlbumPageLayout>
    );
};

export default Index;