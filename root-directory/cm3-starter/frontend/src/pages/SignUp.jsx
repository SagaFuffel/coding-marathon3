import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [licenseNumber, setLicenseNumber] = useState("");
    const [date_of_birth, setDateOfBirth] = useState("");

    const [licenseExpiryDate, setLicenseExpiryDate] = useState("");
    const [city, setCity] = useState("");
    const [yearsOfExperience, setYearsOfExperience] = useState("");

    const [error, setError] = useState(null);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const response = await fetch("/api/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                password,
                username,
                name,
                phone_number,
                licenseNumber,
                date_of_birth,
                licenseExpiryDate,
                city,
                yearsOfExperience
            }),
        });
        const user = await response.json();

        if (!response.ok) {
            setError(user.error);
            return;
        }


        localStorage.setItem("user", JSON.stringify(user));
        setIsAuthenticated(true);
        console.log("success");
        navigate("/");
    };

    return (
        <div className="create">
            <h2>Sign Up</h2>
            <form onSubmit={handleFormSubmit}>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
                <label>Phone Number:</label>
                <input type="text" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
                <label>Date of Birth:</label>
                <input type="date" value={date_of_birth} onChange={(e) => setDateOfBirth(e.target.value)} />
                <label>License Number:</label>
                <input type="text" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} />
                <label>License Expriry Date:</label>
                <input type="date" value={licenseExpiryDate} onChange={(e) => setLicenseExpiryDate(e.target.value)} />
                <label>City:</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                <label>Years Of Experience:</label>
                <input type="number" value={yearsOfExperience} onChange={(e) => setYearsOfExperience(e.target.value)} />

                <button>Sign up</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default Signup;