import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const Login = ({setIsAuthenticated}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleLogin = async () => {
        try {
            const res = await fetch("/api/users/login", {
                method: "POST",
                headers: {"Content-Type":"application-json"},
                body: JSON.stringify({email,password})
            });

            if (res.ok) {
                const user = await res.json();
                localStorage.setItem("user",JSON.strinfigy(user));
                console.log("User logged in!");
                setIsAuthenticated(true);
                navigate("/");
            }else{
                console.error("Did not manage to log in!")
            }
        } catch (error) {
            console.error("Error during login :(:", error);
        }
    };
    return (
        <div>
            <h2>Login</h2>
            <label>
                Email 
                <input
                    type="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    placeholder="abc@123.com"
                />
            </label>
            
            <label>
                Password 
                <input
                    type="password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    placeholder="ab6gd5kKjmmJSc"
                />
            </label>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
};

export default Login;