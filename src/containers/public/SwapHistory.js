"use client";

import Navbar from "@/containers/public/Navbar";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Empty, Spin, message } from "antd";
import { getAuth } from "firebase/auth";

const SwapHistoryComponent = () => {
	const [swapData, setSwapData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
		  const auth = getAuth();
		  const user = auth.currentUser;
	  
		  if (!user) return; // or show a login prompt
	  
		  const res = await fetch(`/api/swap-history?uid=${user.uid}`);
		  const data = await res.json();
		  setSwapData(data);
		};
	  
		fetchData();
	}, []);

	return (
		<>
			<Navbar />
			<div className="max-w-4xl mx-auto px-4 py-10">
				<h1 className="text-3xl font-bold mb-6">Your Swap History</h1>

				{loading ? (
					<div className="flex justify-center items-center h-40">
						<Spin size="large" />
					</div>
				) : swapData.length === 0 ? (
					<Empty description="No swap history yet." />
				) : (
					<div className="space-y-6">
						{swapData.map((swap) => (
							<div
								key={swap.id}
								className="p-4 border rounded-lg shadow-md bg-white flex items-center gap-6"
							>
								<Image
									src={swap.image}
									alt="Swap icon"
									width={50}
									height={50}
								/>
								<div className="flex flex-col">
									<p>
										<span className="font-semibold text-maroon-900">Gave:</span>{" "}
										{swap.itemGiven}
									</p>
									<p>
										<span className="font-semibold text-maroon-900">
											Received:
										</span>{" "}
										{swap.itemReceived}
									</p>
									<p className="text-gray-500 text-sm mt-1">
										{new Date(swap.date).toLocaleDateString()}
									</p>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default SwapHistoryComponent;
