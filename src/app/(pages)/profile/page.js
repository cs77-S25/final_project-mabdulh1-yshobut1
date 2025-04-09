
"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "/home/mabdulh1/cs77/final_project-mabdulh1-yshobut1/src/containers/public/Navbar.js";

const ProfilePage = () => {
	return (
		<>
			<Navbar />
			<div className="bg-maroon-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-6">
					<div className="flex flex-col items-center">
						<Image
							src="/sukrit.jpg"
							alt="User Avatar"
							width={120}
							height={120}
							className="rounded-full border-4 border-maroon-900 shadow-md"
						/>
						<h1 className="mt-4 text-3xl font-bold text-gray-900">Sukrit Venkatagiri</h1>
						<p className="text-gray-600">swatuser@swarthmore.edu</p>
					</div>

					<div className="grid gap-6 md:grid-cols-3 mt-10">
						<Link
							href="/product/add"
							className="text-center p-6 bg-maroon-900 hover:bg-maroon-600 text-white rounded-xl shadow transition"
						>
							Add Product
						</Link>

						<Link
							href="/favorites"
							className="text-center p-6 bg-maroon-900 hover:bg-maroon-600 text-white rounded-xl shadow transition"
						>
							Favorited Listings
						</Link>

						<Link
							href="/swap-history"
							className="text-center p-6 bg-maroon-900 hover:bg-maroon-600 text-white rounded-xl shadow transition"
						>
							Swap History
						</Link>
					</div>

					<div className="mt-10 border-t pt-6 text-center text-gray-500">
						<p className="text-sm">
							Need help? <Link href="/contact" className="text-maroon-700 hover:underline">Contact Us</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfilePage;
