"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { auth } from "@/utils/firebase";
import toast, { Toaster } from "react-hot-toast";

// shows a message when there's no content
import { Empty } from "antd";

// display a grid of product cards
const Explore = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	// Runs after the component is added
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, "listings"));
				const listings = [];
				querySnapshot.forEach((doc) => {
					listings.push({ id: doc.id, ...doc.data() });
				});
				setProducts(listings);
			} catch (error) {
				console.error("Error fetching listings:", error);
			} finally {
				setLoading(false);
			}
		};
	
		fetchProducts();
	}, []);
	
	//show loader if loading
	if (loading) {
		return (
			<section className="max-w-7xl mx-auto p-8 grid gap-8 grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]">
				{Array.from({ length: 10 }).map((_, index) => (
					<div
						key={index}
						className="p-4 bg-neutral-400/50 max-w-xs h-80 animate-pulse rounded-xl border-black border"
					></div>
				))}
			</section>
		);
	}

	//once loading is complete
	return (
		<>
			<Navbar />

			{/* display products */}
			{products.length > 0 ? (
				<section className="mx-auto max-w-7xl p-8 grid gap-8 grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]">
					{products.map((product) => (
					<div
						key={product.id}
						className="relative max-w-xs shadow-md duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden h-80 rounded-xl"
					>
						<Link href="#">
						<div className="relative w-full h-full">
							<Image
							src={product.image || "/noImage.svg"} // fallback if image is missing
							alt="Product image"
							fill
							className="object-cover rounded-xl border border-black"
							/>
						</div>

						<section className="p-4 opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 bg-[#000000d9] text-white flex flex-col justify-end">
							<p className="text-sm">Swap</p>

							<p className="uppercase tracking-wide text-lg font-bold">
							{product.title}
							</p>

							<p className="capitalize text-sm">{product.category}</p>

							<div className="mt-2 text-sm">{product.description}</div>
						</section>
						</Link>

						{/* DELETE button if current user owns the listing!!! */}
						{auth.currentUser?.uid === product.user_id && (
						<button
							onClick={async (e) => {
							e.preventDefault(); // prevent navigating on click
							try {
								await deleteDoc(doc(db, "listings", product.id));
								setProducts(products.filter((p) => p.id !== product.id));
								toast.success("Listing deleted!");
							} catch (err) {
								console.error("Error deleting:", err);
								toast.error("Error deleting listing");
							}
							}}
							className="absolute top-2 right-2 z-20 bg-red-600 text-white rounded-full p-1 hover:bg-red-800"
						>
							✕
						</button>
						)}
					</div>
					))}
				</section>
				) : (
				<Empty description={<p>No products to display</p>}>
					<Link href="/product/add" className="p-2 bg-[#101827] text-white rounded">
					Create Now
					</Link>
				</Empty>
				)}


			{/* add a product */}
			<Link href="/product/add">
				<Image
					src="/icons/plus.svg"
					alt="Add product icon"
					width={60}
					height={60}
					className="z-50 fixed bottom-5 right-5 cursor-pointer hover:scale-110 duration-500"
				/>
			</Link>
		</>
	);
};

export default Explore;
