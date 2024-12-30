import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="bg-white shadow-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center">
						<h1 className="text-2xl font-bold text-gray-900">YourLogo</h1>
					</div>
					<div className="flex items-center">
						<div className="flex-end hidden w-auto md:block">
							<div className="ml-auto flex items-baseline space-x-4">
								<Link
									href="/"
									className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
								>
									Home
								</Link>
								<Link
									href="/about"
									className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
								>
									About
								</Link>
								<Link
									href="/services"
									className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
								>
									Services
								</Link>
								<Link
									href="/contact"
									className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
								>
									Contact
								</Link>
							</div>
						</div>
					</div>
					<div className="-mr-2 flex md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							type="button"
							className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 hover:bg-gray-800 focus:outline-none focus:bg-gray-800 focus:text-white"
						>
							<span className="sr-only">Open main menu</span>
							{isOpen ? (
								<svg
									className="h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							) : (
								<svg
									className="h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16m-7 6h7"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>
			</div>
			{isOpen && (
				<div className="md:hidden">
					<div className="px-2 pt-2 pb-3 flex justify-between sm:px-3 text-center">
						<Link
							href="/"
							className="text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
						>
							Home
						</Link>
						<Link
							href="/about"
							className="text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
						>
							About
						</Link>
						<Link
							href="/services"
							className="text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
						>
							Services
						</Link>
						<Link
							href="/contact"
							className="text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
						>
							Contact
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
}
