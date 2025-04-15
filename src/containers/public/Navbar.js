"use client"; 

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios"; 
import { Dropdown } from "antd";  

// Static path to default profile image in public folder
const defaultProfile = "/defaultProfile.svg";


const Navbar = () => {
	// State hooks!!
	const [userDetails, setUserDetails] = useState(null); // Holds user data (currently dummy users)
	const [isLoggedIn, setIsLoggedIn] = useState(true);   // conditionally render profile dropdown
	const [loading, setLoading] = useState(true);          

	// useEffect simulates fetching user info (mocked for now)
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const user = { user: { data: { data: {} } } };

				if (user?.data?.data) {
					setIsLoggedIn(false); // Simulate user not logged in
					const userDetails = user.data.data;
					setUserDetails(userDetails);  
				}
			} catch (error) {
				console.log(error); // logging any fetch error
				setIsLoggedIn(false); // and assume not logged in if error
			} finally {
				setLoading(false); // done loading
			}
		};

		fetchUser();
	}, []);

	// in theory this handles logout request (future use with real auth)
	const handleLogout = async () => {
		try {
			await axios.post("/api/v1/users/logout");
			setIsLoggedIn(false);
		} catch (error) {
			console.error(error.message);
		}
	};

	// for dropdown menu items when user is logged in
	const items = [
		{
			key: "1",
			label: (
				<Link href="/swaphistory" className="p-2">
					Swap History
				</Link>
			),
		},
		{
			key: "2",
			label: (
				<Link href="/favorites" className="p-2">
					Favorited Listings
				</Link>
			),
		},
		{
			key: "3",
			label: (
				<Link href={`/profile/${userDetails?._id}`} className="p-2">
					View Profile
				</Link>
			),
		},
	];

	// render loading state  
	if (loading) {
		return (
			<div className="bg-maroon-900 text-white">
				<div className="mx-auto flex justify-between px-5 py-2 items-center">
					{/* Logo */}
					<Link href="/">
						<Image src="/logo.png" alt="logo" width={100} height={100} />
					</Link>
					{/* Loading structure for nav items */}
					<div className="gap-6 items-center hidden sm:flex">
						<div className="bg-neutral-400/50 w-20 h-4 animate-pulse rounded-md"></div>
						<div className="bg-neutral-400/50 w-20 h-4 animate-pulse rounded-md"></div>
						<div className="bg-neutral-400/50 w-10 h-10 animate-pulse rounded-full"></div>
					</div>
				</div>
			</div>
		);
	}

	// render actual navbar now 
	return (
		<>
			<div className="bg-maroon-900 text-white">
				<div className="mx-auto max-w-7xl flex justify-between px-5 py-2 items-center">
					
					{/* we want the logo to always visible */}
					<Link href="/">
						<Image
							src="/logo.png"
							alt="logo"
							width={100}
							height={100}
						/>
					</Link>

					{/* If user is "logged in", show dropdown menu */}
					{isLoggedIn && (
						<Dropdown
							placement="bottom"
							menu={{
								items: [
									{
										key: "1",
										label: <Link href="/profile">View Profile</Link>,
									},
									// Future items can go here:
									// {
									// 	key: "2",
									// 	label: <Link href="/settings">Settings</Link>,
									// },
									// {
									// 	key: "3",
									// 	label: <Link href="/login" onClick={handleLogout}>Logout</Link>,
									// },
								],
							}}
						>
							<Image
								src={defaultProfile}
								alt="User Avatar"
								className="w-10 h-10 rounded-full object-cover cursor-pointer"
								width={40}
								height={40}
							/>
						</Dropdown>
					)}
				</div>
			</div>
		</>
	);
};

export default Navbar;
