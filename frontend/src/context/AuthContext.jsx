import { createContext } from "react";

export const AuthDataContext = createContext();

function AuthProvider({ children }) {
  const serverUrl = "http://localhost:3000";

  return (
    <AuthDataContext.Provider value={{ serverUrl }}>
      {children}
    </AuthDataContext.Provider>
  );
}

export default AuthProvider;
