import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<section className="bg-maroon-900">
				<div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
					<div className="mr-auto place-self-center lg:col-span-7">
						<h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
						Declutter with purpose. Trade with SwatSwap.
						</h1>
						<p className="max-w-2xl mb-6 font-light  lg:mb-8 md:text-lg lg:text-xl text-white">
							 Swarthmore students, swap what you don’t need for what you do
							  — sustainably, ethically, and for free.

						</p>
						<Link
							href="/login"
							className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center  border  rounded-lg  focus:ring-4  text-white border-white-700 hover:bg-maroon-700 focus:ring-white"
						>
							Get Started
						</Link>
					</div>
					<div className="lg:col-span-5 flex justify-center items-center">
						<Image
							src="/logo1.png"
							alt="SwatSwap Phoenix Logo"
							width={5000}
							height={5000}
							className="w-full h-auto max-w-[700px]"
							priority
						/>
					</div>
				</div>
			</section>

			{/* Categories */}

			<h2 className="text-4xl font-bold text-center text-black my-4">
				Popular Categories
			</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 w-full">
				<div className="relative p-4 w-full bg-white rounded-lg overflow-hidden hover:shadow flex flex-col justify-center items-center">
					<div className="w-16 h-16 rounded-lg">
						<Image
							src="/icons/electronics.png"
							width={100}
							height={100}
							alt="Electronics image"
						/>
					</div>

					<p className="mt-2 text-gray-800 text-sm font-semibold line-clamp-1">
						Tech
					</p>
				</div>

				<div className="relative p-4 w-full bg-white rounded-lg overflow-hidden hover:shadow flex flex-col justify-center items-center">
					<div className="w-16 h-16 rounded-lg">
						<Image
							src="/icons/books.png"
							width={100}
							height={100}
							alt="Books image"
						/>
					</div>

					<p className="mt-2 text-gray-800 text-sm font-semibold line-clamp-1">
						Books
					</p>
				</div>

				<div className="relative p-4 w-full bg-white rounded-lg overflow-hidden hover:shadow flex flex-col justify-center items-center">
					<div className="w-16 h-16 rounded-lg">
						<Image
							src="/icons/jacket.png"
							width={100}
							height={100}
							alt="Jacket image"
						/>
					</div>

					<p className="mt-2 text-gray-800 text-sm font-semibold line-clamp-1">
						Clothing
					</p>
				</div>

				<div className="relative p-4 w-full bg-white rounded-lg overflow-hidden hover:shadow flex flex-col justify-center items-center">
					<div className="w-16 h-16 rounded-lg">
						<Image
							src="/icons/furniture.png"
							width={100}
							height={100}
							alt="Furniture image"
						/>
					</div>

					<p className="mt-2 text-gray-800 text-sm font-semibold line-clamp-1">
						Furniture
					</p>
				</div>

				<div className="relative p-4 w-full bg-white rounded-lg overflow-hidden hover:shadow flex flex-col justify-center items-center">
					<div className="w-16 h-16 rounded-lg">
						<Image
							src="/icons/sports.png"
							width={100}
							height={100}
							alt="Sports image"
						/>
					</div>

					<p className="mt-2 text-gray-800 text-sm font-semibold line-clamp-1">
						Sports
					</p>
				</div>

				<div className="relative p-4 w-full bg-white rounded-lg overflow-hidden hover:shadow flex flex-col justify-center items-center">
					<div className="w-16 h-16 rounded-lg">
						<Image
							src="/icons/car.png"
							width={100}
							height={100}
							alt="Vehicle image"
						/>
					</div>

					<p className="mt-2 text-gray-800 text-sm font-semibold line-clamp-1">
						Miscellaneous
					</p>
				</div>
			</div>

			{/* Steps with SwapSwap */}

			<section className="p-6 bg-maroon-100 text-white">
				<div className="container mx-auto">
					<span className="block mb-2 text-xs font-medium tracking-widest text-center uppercase text-gray-900">
						How it works
					</span>
					<h2 className="text-5xl font-bold text-center text-black">
						Working with SwatSwap is simple
					</h2>
					<div className="grid gap-6 my-16 lg:grid-cols-3">
						<div className="flex flex-col p-8 space-y-4 rounded-md bg-maroon-900">
							<div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full bg-white text-gray-900">
								1
							</div>
							<p className="text-2xl">
								<b>Join SwatSwap. </b>
								Click get started and Join
								the Swarthmore Community!
							</p>
						</div>
						<div className="flex flex-col p-8 space-y-4 rounded-md bg-maroon-900">
							<div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full bg-white text-gray-900">
								2
							</div>
							<p className="text-2xl">
								<b>Upload items.</b> Click a picture of your
								item and upload it.
							</p>
						</div>
						<div className="flex flex-col p-8 space-y-4 rounded-md bg-maroon-900">
							<div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full bg-white text-gray-900">
								3
							</div>
							<p className="text-2xl">
								<b>Swap it.</b> Connect with other students and
								start trading your items!
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}

			<div className="w-full p-4 text-center border shadow sm:p-8 bg-maroon-900 border-maroon-800">
				<h5 className="mb-2 text-3xl font-bold text-white">
					Start SwatSwapping Today
				</h5>
				<p className="mb-5 text-base  sm:text-lg text-white">
					SwatSwap is campus-first and community-built 
					— stay tuned for mobile access!
				</p>
			</div>

			<footer className="py-6 bg-maroon-900 text-white">
				<div className="container px-6 mx-auto space-y-6 divide-y divide-maroon-400 md:space-y-12 divide-opacity-50">
					<div className="grid justify-center pt-6 lg:justify-between">
						<div className="flex flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6">
							<span>©2025 All rights reserved</span>
							<Link href="#">Privacy policy</Link>
							<Link href="#">Terms of service</Link>
							<Link href="/contact">Contact Us</Link>
						</div>
						<div className="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13">
							<Link
								rel="noopener noreferrer"
								href="mailto:maryam.taha2003@gmail.com"
								title="Email"
								className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-900"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									className="w-5 h-5"
								>
									<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
									<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
								</svg>
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}
