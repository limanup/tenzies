import { useState, useEffect } from "react";
import axios from "axios";


const Register = () => {
    // const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
    // const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const REGISTER_URL = "/register";

    const [user, setUser] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setUser((oldUser) => ({
            ...oldUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // const check1 = USER_REGEX.test(user.username);
        // const check2 = PWD_REGEX.test(user.password);

        // if (!check1 || !check2) {
        //     console.log("Invalid Entry");
        // }

        const pwdCheck = user.password === user.confirmPassword

        if (!pwdCheck) {
            console.log("passwords do not match!")
            return;
        }

        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({username: user.username, password: user.password}),
                {
                    headers:{ 'Content-Type': 'application/json'},
                    withCredentials: true
                })
                console.log(response?.data);
                // console.log(response?.accessToken);
                console.log(JSON.stringify(response))
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div>
            <form className="form-container" onSubmit={handleSubmit}>
                <input
                    type="text"
                    autoComplete="off"
                    placeholder="Username"
                    className="form-input"
                    required
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="form-input"
                    required
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    className="form-input"
                    required
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleChange}
                />
                <button className="form-submit">Sign up</button>
            </form>
        </div>
    );
};

export default Register;
