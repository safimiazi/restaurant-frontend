"use client"
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';

const AdminProtect = ({children}: any) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const router = useRouter();
    if (!user) {
        router.push("/login");
    }
    if (user && user.role !== "admin") {
        router.push("/login");
    }

    return (

        <div>
            {children}
        </div>
    );
};

export default AdminProtect;