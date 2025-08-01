import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";

const credentials = [
    {
        username: "admin@hospital.com",
        password: "Admin411",
        access: "admin"
    },
    {
        username: "team@hospital.com",
        password: "Team123",
        access: "team"
    }
]

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { login, isAuthenticated, userAccess, setUserAccess } = useAuth();
    const navigate = useNavigate();

    function onLogin(submittedUsername, submittedPassword) {
        const userFound = credentials.find(credential =>
            credential.username === submittedUsername && credential.password === submittedPassword
        )

        if (!userFound) {
            alert("Invalid username or password");
            return
        }

        setUserAccess(userFound.access)
        login()
    }


    function handleSubmit(e) {
        e.preventDefault();
        onLogin(username, password)
    }

    useEffect(() => {
        if (isAuthenticated) {
            if (userAccess === "admin") {
                navigate("/patient-information")
            } else if (userAccess == "team") {
                navigate("/patient-status-update")
            }
        }
    }, [isAuthenticated, userAccess, navigate])

    return (
        <main className="min-h-screen flex flex-col items-center justify-center">
            <section className="max-w-xl w-full text-center border border-gray-200 p-8 rounded-lg shadow-md sm:p-10">
                <p className="max-w-sm m-auto pt-10 pb-12">
                    To enter a new patient into this system or to update 
                    the status of an existing patient please enter your 
                    authentication information below. 
                </p>
                <form 
                    className="max-w-sm m-auto"
                    onSubmit={handleSubmit}
                >
                    <Label>Username:</Label>
                    <Input
                        className="mb-6"
                        placeholder="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        />
                    <Label>Password:</Label>
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button className="mt-8" type="submit">Authorize Login</Button>
                </form>

                <p className="text-sm text-gray-500 mt-8">Looking for the status of a loved one?</p>
                <p className="text-sm text-gray-500">Click <a className="underline" href="/patient-status">here</a> to view the patient status board.</p>
             </section>
        </main>


    )
}