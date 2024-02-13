import { useEffect, useState, createContext, useContext } from "react";

import * as authApi from "../../../api/auth";
import * as userApi from "../../../utils/local-storage";
import { toast } from "react-toastify";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (userApi.getToken()) {
      authApi
        .fetchMe()
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          toast.error(err.response?.data.message);
        })
        .finally(() => setInitialLoading(false));
    } else {
      setInitialLoading(false);
    }
  }, []);

  const register = async (user) => {
    const res = await authApi.register(user);
    setUser(res.data.newUser);
    userApi.storeToken(res.data.accessToken);
  };

  const login = async (credential) => {
    const res = await authApi.login(credential);
    setUser(res.data.user);
    userApi.storeToken(res.data.accessToken);
  };

  const logout = () => {
    setUser(null);
    clearToken();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        register,
        login,
        initialLoading,
        setInitialLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
