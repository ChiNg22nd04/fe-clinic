// src/hooks/useUser.ts
import { useState, useEffect } from "react";

export const useUser = () => {
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	return user;
};
