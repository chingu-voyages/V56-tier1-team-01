import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CircleAlert } from 'lucide-react';
import { useAuth } from "../context/AuthProvider";
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
    const [errors, setErrors] = useState({});
    const [isUserFound, setIsUserFound] = useState(null);

    const validateLogin = () => {
        const newErrors = {}
        if (!username.trim())
            newErrors.username = "Username is required";
        if (!password.trim())
            newErrors.password = "Password is required";
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    };

    const { login, isAuthenticated, userAccess, setUserAccess } = useAuth();
    const navigate = useNavigate();

    function onLogin(submittedUsername, submittedPassword) {
        const userFound = credentials.find(credential =>
            credential.username === submittedUsername.toLowerCase() && credential.password === submittedPassword
        )

        if (!userFound) {
            setIsUserFound(false)
            setUsername("")
            setPassword("")
            return
        }

        setIsUserFound(true)
        setUserAccess(userFound.access)
        login()
    }


    function handleSubmit(e) {
        e.preventDefault();
        if (!validateLogin()) return;
        onLogin(username, password)
    }

    useEffect(() => {
        if (isAuthenticated) {
            if (userAccess === "admin") {
                navigate("/admin-home")
            } else if (userAccess == "team") {
                navigate("/stm-home")
            }
        }
    }, [isAuthenticated, userAccess, navigate])

    return (
        <main className="flex flex-col items-center justify-center">
            <section className="max-w-xl w-full text-center border border-gray-200 rounded-lg shadow-md sm:p-10">
                <p className="max-w-sm m-auto pt-10 pb-12">
                    To enter a new patient into this system or to update 
                    the status of an existing patient please enter your 
                    authentication information below. 
                </p>
                {/* Display error message if user is not found */}
                {isUserFound === false && (
                    <Alert className="grid grid-col-2 content-center max-w-sm m-auto mb-6 bg-red-50" variant="destructive" >
                        <CircleAlert />
                        <AlertTitle>
                            Invalid username or password
                        </AlertTitle>
                    </Alert>

                )}

                <form
                    className="max-w-sm m-auto"
                    onSubmit={handleSubmit}
                >
                    <Label>Username:</Label>
                    <Input
                        className="mb-2"
                        placeholder="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    {errors.username && (
                        <p className="text-sm text-red-500">{errors.username}</p>
                    )}
                    <Label>Password:</Label>
                    <Input
                        className="mb-2"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500">{errors.password}</p>
                    )}
                    <Button className="mt-8" type="submit">Authorize Login</Button>
                </form>



                <p className="text-sm text-gray-500 mt-8">Looking for the status of a loved one?</p>
                <p className="text-sm text-gray-500">Click <a className="underline" href="/patient-status">here</a> to view the patient status board.</p>
             </section>
        </main>


    )
}