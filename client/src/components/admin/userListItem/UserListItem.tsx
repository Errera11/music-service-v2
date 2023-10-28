import React, {useEffect, useRef, useState} from 'react';
import {User, UserRoles} from "@/assets/types/User";
import styles from './userListItem.module.scss';
import gear from '../../../assets/svg/gear.svg';
import SettingPopup from "@/components/admin/settingPopup/SettingPopup";
import {userApi} from "@/api/user";
import {AxiosResponse} from "axios";
import {router} from "next/client";
import {useRouter} from "next/router";

interface IProps {
    user: User
}

const UserListItem: React.FC<IProps> = ({user: data}) => {
    const [isPopup, setIsPopup] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const settingsRef = useRef<HTMLDivElement>(null);
    const [user, setUser] = useState(data);

    const router = useRouter();

    useEffect(() => {
        const listener = (e: MouseEvent) => {
            if (e.target instanceof HTMLElement &&
                !settingsRef.current?.contains(e.target) &&
                !popupRef.current?.contains(e.target)) setIsPopup(false);
        }
        document.addEventListener('click', listener);
        return () => document.removeEventListener('click', listener);
    }, []);

    const onChangeUserRole = () => {
        if(user.role.includes(UserRoles.ADMIN)) {
            return userApi.revokeAdmin({userId: user.id})
        }
        return userApi.makeAdmin({userId: user.id})
    }

    return (
        <div className={styles.container}>
            <div className={styles.avatar}>
                {user?.avatar && <img  src={user.avatar} />}
            </div>
            <span className={styles.id}>{user.id}</span>
            <span className={styles.email}>{user.email}</span>
            <span className={styles.name}>{user.name}</span>
            <span className={styles.role}>{user.role.map(role => <span>{role}</span>)}</span>
            <span className={styles.emailAuth}>{user.is_email_auth ? 'true' : 'false'}</span>
            <div ref={settingsRef} className={styles.settings} onClick={() => setIsPopup(prev => !prev)}><img src={gear.src}/></div>
            {isPopup && <div className={styles.settingsPopup}>
                <SettingPopup ref={popupRef} properties={[
                    {
                        onClick: () => onChangeUserRole()
                            .then(({data}) => setUser(data)),
                        property: user.role.includes(UserRoles.ADMIN) ? 'Make users' : 'Make admin'
                    },
                    {
                        onClick: () => router.push(`${router.route}/${user.id}`),
                        property: 'Full info'
                    }
                ]}/>
            </div>}
        </div>
    );
};

export default UserListItem;