import React from 'react';
import UserPageLayout from "@/components/admin/adminPageLayouts/UserPageLayout";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {userApi} from "@/api/user";
import UserList from "@/components/admin/userList/UserList";
import useSsgPagination from "@/components/admin/useSsgPagination/useSsgPaginaton";
import PaginationBar from "@/components/admin/paginationBar/PaginationBar";
import styles from '@/styles/admin/users/users.module.scss';

const Index = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const usersTakeVolume = 5;
    const {setPage, currentPage, totalPages} = useSsgPagination({
        totalItemsCount: data.totalItemsCount,
        takeVolume: usersTakeVolume,
    })
    return (
        <UserPageLayout title={'Users'}>
            <div className={styles.container}>
                <UserList users={data.users}/>
                <div className={styles.paginationBar}>
                    <PaginationBar currentPage={currentPage} totalPages={totalPages} setPage={setPage}/>
                </div>
            </div>
        </UserPageLayout>
    );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const {data} = await userApi.getAllUsers({
            take: 5,
            skip: 0
        });
        return {
            props: {
                data
            }
        }
    } catch (e) {
        console.log(e);
        return {
            props: {
                data: {}
            }
        }
    }
}