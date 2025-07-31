import React from "react";
import { Metadata } from "next";
import LoginPageClient from "@/components/LoginPageClient";

export const metadata: Metadata = {
  title: "Login - Gignet",
  description: "Sign in to Gignet and connect with developers worldwide. Secure GitHub authentication.",
  keywords: "login, signin, authentication, github, oauth",
};

// This is a Server Component
const LoginPage = () => {
  return <LoginPageClient />;
};

export default LoginPage;
