"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";

// Ant Design's Empty component which shows a message when there's no content
import { Empty } from "antd";

// display a grid of product cards
const Explore = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	// Runs after the component is added
	useEffect(() => {
		const fetchProducts = () => {
			const localProducts = JSON.parse(localStorage.getItem("mockProducts")) || [];
			setProducts(localProducts);  // Store fetched products in state
			setLoading(false);           // Loading complete  
		};
		fetchProducts(); 
	}, []); // Empty dependency array = run only once component's added 

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
						<Link
							key={product.id} 
							href="#" // we can make this dynamic later
							className="relative max-w-xs shadow-md duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden h-80 rounded-xl"
						>
							<Image
								src={product.image}
								alt="Product image"
								layout="fill"
								objectFit="cover"
								className="border-black border rounded-xl"
							/>

							{/* Overlay info on hover */}
							<section className="p-4 opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 bg-[#000000d9] text-white flex flex-col justify-end">
								<p className="text-sm">Swap</p>

								{/* Product title */}
								<p className="uppercase tracking-wide text-lg font-bold">
									{product.title}
								</p>

								{/* Category */}
								<p className="capitalize text-sm">
									{product.category}
								</p>

								{/* Product description */}
								<div className="mt-2 text-sm">
									{product.description}
								</div>
							</section>
						</Link>
					))}
				</section>
			) : (
				// If no products, we show the Empty state with a call-to-action!
				<Empty description={<p>No products to display</p>}>
					<Link
						href="/product/add"
						className="p-2 bg-[#101827] text-white rounded"
					>
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
