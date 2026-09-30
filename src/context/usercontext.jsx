import { createContext, useState, useEffect } from "react";
import { getStoredUser } from "../utils/cookie";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
});

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
