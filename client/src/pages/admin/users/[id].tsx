import React from 'react';
import UserPageLayout from "@/components/admin/adminPageLayouts/UserPageLayout";
import {ExtendedUserInfo, userApi} from "@/api/user";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import styles from '../../../styles/admin/users/userById.module.scss';
import Avatar from '../../../assets/svg/UserIconSvg';

const user = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    if(!data?.user) return <UserPageLayout title={'User info'}>
        <div className={styles.container}>
            User not found!
        </div>
    </UserPageLayout>

    return (
        <UserPageLayout title={'User info'}>
            <div className={styles.container}>
                <div className={styles.avatar}>
                    {data.user?.avatar ? <img src={data.user.avatar}/> :
                        <Avatar isActive={false} width={'auto'} height={'auto'} />
                    }
                </div>
                <div className={styles.userInfoSample}>
                    <span>User id</span>
                    <span>Username</span>
                    <span>Email</span>
                    <span>Is email authenticated</span>
                    <span>User roles</span>
                </div>
                <div className={styles.userInfo}>
                    <span>{data.user.id}</span>
                    <span>{data.user.name}</span>
                    <span>{data.user.email}</span>
                    <span>{data.user.is_email_auth ? 'True' : 'False'}</span>
                    <span>{data.user.role.map((role) => <span>{role}</span>)}</span>
                </div>
            </div>
        </UserPageLayout>
    );
};

export const getServerSideProps: GetServerSideProps<{data: ExtendedUserInfo}> = async ({params}) => {
    try {
        const data = (await userApi.getUserById({
            userId: String(params?.id)
        })).data as ExtendedUserInfo
        return {
            props: {
                data
            }
        };
    } catch (e) {
        console.log(e);
        return {
            props: {
                data: {} as ExtendedUserInfo
            }
        }
    }
}

export default user;
