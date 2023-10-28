import React from 'react';
import UserListItem from "@/components/admin/userListItem/UserListItem";
import {User} from "@/assets/types/User";
import styles from './userList.module.scss';

interface IProps {
    users: User[]
}

const UserList: React.FC<IProps> = ({users}) => {
    return (
        <>
            <div className={styles.container}>
                <span className={styles.avatar}>Avatar</span>
                <span className={styles.id}>Id</span>
                <span className={styles.email}>Email</span>
                <span className={styles.name}>Name</span>
                <span className={styles.role}>Roles</span>
                <span className={styles.emailAuth}>Email authentication</span>
            </div>
            {users.map(user => <UserListItem user={user} />)}
        </>
    );
};

export default UserList;