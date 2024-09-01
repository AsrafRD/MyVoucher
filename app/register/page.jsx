"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/AuthForm/Input";
import Label from "@/components/AuthForm/Label";
import Title from "@/components/AuthForm/Title";
import Button from "@/components/AuthForm/Button";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to handle loading
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password || !email || !name) {
      setError("All fields are required.");
      return;
    }

    setError(""); // Clear previous errors
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email, name }),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        const { message } = await res.json();
        setError(message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <Title>Register</Title>
        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}
