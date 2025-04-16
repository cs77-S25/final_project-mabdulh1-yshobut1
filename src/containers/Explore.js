// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Empty } from "antd";
// import { getDocs, collection } from "firebase/firestore";
// import { db } from "@/utils/firebase";



// // path to default profile image in public folder
// const defaultProfile = "/defaultProfile.svg";

// const Explore = () => {
// 	const [products, setProducts] = useState([]);
// 	const [loading, setLoading] = useState(true);

// 	useEffect(() => {
// 		//get and display the products
// 		const fetchProducts = async () => {
// 			try {
// 				const querySnapshot = await getDocs(collection(db, "listings"));
// 				const fetchedProducts = [];
// 				querySnapshot.forEach((doc) => {
// 					fetchedProducts.push({ id: doc.id, ...doc.data() });
// 				});
// 				setProducts(fetchedProducts);
// 			} catch (error) {
// 				console.error("Error fetching products:", error);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};
		
	
// 		fetchProducts();
// 	}, []);
	

// 	if (loading) {
// 		return (
// 			<section className="max-w-7xl mx-auto p-8 grid gap-8 grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]">
// 				{Array.from({ length: 10 }).map((_, index) => (
// 					<div
// 						key={index}
// 						className="p-4 bg-neutral-400/50 max-w-xs h-80 animate-pulse rounded-xl border-black border"
// 					></div>
// 				))}
// 			</section>
// 		);
// 	}

// 	return (
// 		<>
// 			{products.length > 0 ? (
// 				<section className="mx-auto max-w-7xl p-8 grid gap-8 grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]">
// 					{products.map((product) => (
// 						<Link
// 							key={product.id}
// 							href={`/product/${product.id}`}
// 							className="relative max-w-xs shadow-md duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden h-80 rounded-xl"
// 						>
// 							<div className="relative w-full h-full">
// 							<Image
// 								src={product.image}
// 								alt="Product image"
// 								fill
// 								className="object-cover rounded-xl border border-black"
// 							/>
// 							</div>

// 							<section className="p-4 opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 bg-[#000000d9] text-white flex flex-col justify-end">
// 							<p className="text-sm">
// 								{product.giveAway ? "Giveaway" : "Swap"}
// 							</p>

// 								<p className="uppercase tracking-wide text-lg font-bold">
// 									{product.title}
// 								</p>
// 								<p className="capitalize text-sm">
// 									{product.category}
// 								</p>
// 								<div className="mt-2 flex items-center gap-2">
// 									<Image
// 										src={product.owner?.avatar || defaultProfile}
// 										width={100}
// 										height={100}
// 										alt={`Image of trader ${product.owner?.name || "Unknown"}`}
// 										className="object-cover object-center w-10 h-10 rounded-full"
// 									/>
// 									<div className="font-bold capitalize">
// 										{product.owner?.name || "Unknown"}
// 									</div>
// 								</div>
// 							</section>
// 						</Link>
// 					))}
// 				</section>
// 			) : (
// 				<Empty description={<p>No products to display</p>}>
// 					<Link
// 						href="/product/add"
// 						className="p-2 bg-[#101827] text-white rounded"
// 					>
// 						Create Now
// 					</Link>
// 				</Empty>
// 			)}

// 			<Link href="/product/add">
// 				<Image
// 					src="/icons/plus.svg"
// 					alt="Add product icon"
// 					width={60}
// 					height={60}
// 					className="z-50 fixed bottom-5 right-5 cursor-pointer hover:scale-110 duration-500"
// 				/>
// 			</Link>
// 		</>
// 	);
// };

// export default Explore;

// src/app/product/[id]/page.js
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import Image from 'next/image';
import Link from 'next/link';

const defaultProfile = "/defaultProfile.svg";

const ProductDetails = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const docRef = doc(db, "listings", id);
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					setProduct({ id: docSnap.id, ...docSnap.data() });
				} else {
					console.error("No such product!");
				}
			} catch (error) {
				console.error("Error fetching product:", error);
			} finally {
				setLoading(false);
			}
		};

		if (id) fetchProduct();
	}, [id]);

	if (loading) return <div className="p-10 text-center">Loading product...</div>;

	if (!product) return <div className="p-10 text-center">Product not found.</div>;

	return (
		<div className="max-w-4xl mx-auto p-8">
			<h1 className="text-3xl font-bold mb-4">{product.title}</h1>

			<div className="flex flex-col md:flex-row gap-8">
				<div className="relative w-full md:w-1/2 h-96 border rounded-xl overflow-hidden">
					<Image
						src={product.image}
						alt={product.title}
						fill
						className="object-cover"
					/>
				</div>

				<div className="md:w-1/2">
					<p className="mb-2">
						<strong>Description:</strong> {product.description || 'No description'}
					</p>
					<p className="mb-2">
						<strong>Category:</strong> {product.category}
					</p>
					<p className="mb-2">
						<strong>Type:</strong> {product.giveAway ? 'Giveaway' : 'Swap'}
					</p>

					<div className="flex items-center gap-3 mt-4">
						<Image
							src={product.owner?.avatar || defaultProfile}
							alt="Owner Avatar"
							width={50}
							height={50}
							className="rounded-full object-cover w-12 h-12"
						/>
						<div className="font-semibold capitalize">
							{product.owner?.name || 'Unknown'}
						</div>
					</div>

					{/* Swap button */}
					<Link
						href={`/swap/${product.id}`} // Or any future swap handling page
						className="inline-block mt-6 bg-[#101827] text-white px-6 py-2 rounded hover:bg-[#1f2937]"
					>
						Request Swap
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
