"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Empty } from "antd";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/utils/firebase";


// path to default profile image in public folder
const defaultProfile = "/defaultProfile.svg";

const Explore = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		//get and display the products
		const fetchProducts = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, "listings"));
				const fetchedProducts = [];
				querySnapshot.forEach((doc) => {
					fetchedProducts.push({ id: doc.id, ...doc.data() });
				});
				setProducts(fetchedProducts);
			} catch (error) {
				console.error("Error fetching products:", error);
			} finally {
				setLoading(false);
			}
		};
		
	
		fetchProducts();
	}, []);
	

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

	return (
		<>
			{products.length > 0 ? (
				<section className="mx-auto max-w-7xl p-8 grid gap-8 grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]">
					{products.map((product) => (
						<Link
							key={product.id}
							href={`/product/${product.id}`}
							className="relative max-w-xs shadow-md duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden h-80 rounded-xl"
						>
							<div className="relative w-full h-full">
							<Image
								src={product.image}
								alt="Product image"
								fill
								className="object-cover rounded-xl border border-black"
							/>
							</div>

							<section className="p-4 opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 bg-[#000000d9] text-white flex flex-col justify-end">
							<p className="text-sm">
								{product.giveAway ? "Giveaway" : "Swap"}
							</p>

								<p className="uppercase tracking-wide text-lg font-bold">
									{product.title}
								</p>
								<p className="capitalize text-sm">
									{product.category}
								</p>
								<div className="mt-2 flex items-center gap-2">
									<Image
										src={product.owner?.avatar || defaultProfile}
										width={100}
										height={100}
										alt={`Image of trader ${product.owner?.name || "Unknown"}`}
										className="object-cover object-center w-10 h-10 rounded-full"
									/>
									<div className="font-bold capitalize">
										{product.owner?.name || "Unknown"}
									</div>
								</div>
							</section>
						</Link>
					))}
				</section>
			) : (
				<Empty description={<p>No products to display</p>}>
					<Link
						href="/product/add"
						className="p-2 bg-[#101827] text-white rounded"
					>
						Create Now
					</Link>
				</Empty>
			)}

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
