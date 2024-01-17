import React from 'react';
import UserPageLayout from "@/components/admin/adminPageLayouts/UserPageLayout";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {userApi} from "@/api/user";
import UserList from "@/components/admin/userList/UserList";
import useSsgPagination from "@/components/admin/useSsgPagination/useSsgPaginaton";
import PaginationBar from "@/components/admin/paginationBar/PaginationBar";
import styles from '@/styles/admin/users/users.module.scss';
import {IGetItemsList} from "@/assets/types/IGetItemsList";
import {User} from "@/assets/types/User";

const Index = ({items, totalCount}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const usersTakeVolume = 5;
    const {setPage, currentPage, totalPages} = useSsgPagination({
        totalItemsCount: totalCount,
        takeVolume: usersTakeVolume,
    })
    console.log(items);
    return (
        <UserPageLayout title={'Users'}>
            <div className={styles.container}>
                {!!items.length && <UserList users={items}/>}
                <div className={styles.paginationBar}>
                    <PaginationBar currentPage={currentPage} totalPages={totalPages} setPage={setPage}/>
                </div>
            </div>
        </UserPageLayout>
    );
};

export default Index;

export const getServerSideProps: GetServerSideProps<IGetItemsList<User>> = async (context) => {
    try {
        const {data} = await userApi.getAllUsers({
            take: 5,
            skip: 0
        }, {
            headers: context.req.headers
        });
        return {
            props: data
        }
    } catch (e) {
        console.log(e);
        return {
            props: {
                items: [],
                totalCount: 0
            }
        }
    }
}