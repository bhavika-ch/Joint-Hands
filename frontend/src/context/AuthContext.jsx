import { createContext } from "react";

export const AuthDataContext = createContext();

function AuthProvider({ children }) {
  const serverUrl = import.meta.env.VITE_API_BASE_URL;

  return (
    <AuthDataContext.Provider value={{ serverUrl }}>
      {children}
    </AuthDataContext.Provider>
  );
}

export default AuthProvider;
