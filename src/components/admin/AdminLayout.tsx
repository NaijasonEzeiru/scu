import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../AuthContext';
import AdminDashboardNav from './AdminDashboardNav';
import styles from '@/styles/Dashboard.module.css';
import { useRouter } from 'next/router';
import Spinner from '../Spinner';

const AdminLayout = ({ children }: any) => {
	const { getAllUsers, user, authChecking }: any = useContext(AuthContext);
	const [loading, setLoading] = useState(true);
	const [open, setOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setOpen(window.matchMedia('(min-width: 1050px)').matches);
		// checkUserLoggedIn();
		// getAllUsers();
	}, []);

	useEffect(() => {
		if (!authChecking && user?.isAdmin) {
			setLoading(false);
			getAllUsers();
		} else if (!authChecking && !user?.isAdmin) {
			router.push('/login');
		}
	}, [user, authChecking]);

	const checkUserLoggedIn = async () => {
		const res = await fetch('https://somercu.onrender.com/auth/me', {
			method: 'GET',
			credentials: 'include'
		});
		const data = await res.json();
		if (res.ok) {
			console.log({ acc_no: data.fullName });
			if (!data?.isAdmin) {
				console.log({ admin: data });
				router.push('/login');
			}
			if (data?.isAdmin) {
				setLoading(false);
			}
		} else {
			console.log('failed');
			router.push('/login');
		}
	};

	if (!loading) {
		return (
			<section className={styles.dashboardLayout}>
				<span onClick={() => setOpen(!open)} className={styles.toggle}>
					{open ? '<' : '>'}
				</span>
				<div className={styles.layout}>
					<span className={open ? styles.nav : styles.navClose}>
						<AdminDashboardNav />
					</span>
					{children}
				</div>
			</section>
		);
	} else {
		return <Spinner />;
	}
};

export default AdminLayout;
