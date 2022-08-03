import React, { useState, useEffect } from "react";
import axios from "../api/axios";

const REGISTER_URL = "/register";
const Register = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUser((oldUser) => ({
            ...oldUser,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const pwdCheck = user.password === user.confirmPassword;

        if (!pwdCheck) {
            console.log("passwords do not match!");
            return;
        }

        axios
            .post(REGISTER_URL, user)
            .then((res) => {
                if (res.status === 200) {
                    alert("success");
                    console.log(res.data);
                } else Promise.reject();
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <form className="form-container" onSubmit={handleSubmit}>
                <h1>Register</h1>
                <label>Username</label>
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
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    className="form-input"
                    required
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                />
                <label>Confirm Password</label>
                <input
                    type="password"
                    placeholder="Confirm password"
                    className="form-input"
                    required
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleChange}
                />
                <button className="form-submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
