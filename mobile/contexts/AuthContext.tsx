import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Text, View } from "react-native";


type User = {
  personnelId: string;
}

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  loginn: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children} : {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!user;

  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const storedToken = await AsyncStorage.getItem("token");

        if(storedToken && storedUser){
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch (err) {
        console.error("Failed to load session:", err);
      } finally {
        setLoading(false);
      }
    };
    loadSession();
  }, []);

  const loginn = async (userData: User, jwtToken: string) => {
    try {
      setUser(userData);
      setToken(jwtToken);

      await AsyncStorage.setItem("user", JSON.stringify(userData));
      await AsyncStorage.setItem("token", jwtToken);
    } catch (err) {
      console.error("Failed to save session:", err);
    }
  }

  const logout = async () => {
    try {
      setUser(null);
      setToken(null);
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
    } catch (err) {
      console.error("Failed to clear session:", err);
    }
  }

  if (loading) return <View><Text>Loading...</Text></View>

  return (
    <AuthContext.Provider value={{isLoggedIn, user, token, loginn, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)!;
}
