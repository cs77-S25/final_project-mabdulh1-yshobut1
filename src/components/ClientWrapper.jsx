"use client";
import { useEffect } from "react";
import { setupUserListener } from "@/utils/authUtils";

export default function ClientWrapper({ children }) {
	useEffect(() => {
		setupUserListener(); // ✅ Set up auth listener on load
	}, []);

	return <>{children}</>;
}
