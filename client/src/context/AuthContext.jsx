import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loginUser = async (userData) => {
        try {
            const res = await fetch('http://localhost:5000/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...userData })
            });
            const result = await res.json();
            if (!result.error) {
                localStorage.setItem("token", result.token); // Save the token
                setUser(result.user); // Update the user state
            } else {
                alert(result.error);
            }
        } catch (err) {
            console.log(err);
        }
    };
    

    const registerUser = async (userData) => {
        try {
            const res = await fetch('http://localhost:5000/auth/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...userData })
            });
            const result = await res.json();
            if (!result.error) {
                alert("Success");
            } else {
                alert(result.error);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const isAuthenticated = () => {
        const token = localStorage.getItem("token"); // Check for a token
        return !!token; 
    };

    return (
        <AuthContext.Provider value={{ loginUser, registerUser, user, setUser, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
