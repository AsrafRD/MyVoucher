"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/AuthForm/Input";
import Label from "@/components/AuthForm/Label";
import Title from "@/components/AuthForm/Title";
import Button from "@/components/AuthForm/Button";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem("auth-token", token);
      localStorage.setItem("user", username);
      router.push("/");
    } else {
      const { message } = await res.json();
      setError(message);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-sm">
        <Title>Login</Title>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <Button>Login</Button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}