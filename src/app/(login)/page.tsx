"use client";

import Login from "@/components/Login/Login";
import { login } from "@/services/login";
import { productsUrl } from "@/contants/urls";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MainPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleLogin = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    setError(undefined);

    setTimeout(() => {
      login(username, password)
        .then((response) => {
          if (response?.data?.success) {
            router.push(productsUrl);
          } else if (response?.data?.error) {
            setError(response?.data?.error);
          }
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return (
    <Login loading={loading} error={error || undefined} onLogin={handleLogin} />
  );
}
