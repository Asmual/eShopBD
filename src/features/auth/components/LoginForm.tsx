"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { loginSchema } from "../schemas";
import { LoginFormData } from "../types";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);

    toast.success(`Welcome back, ${data.email.split("@")[0]}! Signed in successfully.`);
  };

  const handleSocialLogin = (provider: string) => {
    toast(`Connecting with ${provider}...`, {
      icon: "🔐",
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 flex flex-col justify-center">
      {/* Header */}
      <div className="mb-6 text-left">
        <span className="text-xs font-bold uppercase tracking-wider text-brand">
          Welcome Back
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-text-main mt-1 tracking-tight">
          Sign In to eShopBD
        </h2>
        <p className="text-xs sm:text-sm text-text-muted mt-1">
          Access your personalized dashboard, orders, and wishlist.
        </p>
      </div>

      {/* Social Login Options */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <button
          type="button"
          onClick={() => handleSocialLogin("Google")}
          className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white border border-border-light hover:border-brand/40 hover:bg-brand-light/30 rounded-xl text-xs sm:text-sm font-semibold text-text-main transition-all cursor-pointer shadow-2xs"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Google</span>
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin("Facebook")}
          className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white border border-border-light hover:border-brand/40 hover:bg-brand-light/30 rounded-xl text-xs sm:text-sm font-semibold text-text-main transition-all cursor-pointer shadow-2xs"
        >
          <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span>Facebook</span>
        </button>
      </div>

      <div className="relative flex items-center justify-center mb-5">
        <div className="w-full border-t border-border-light" />
        <span className="bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-text-muted absolute">
          Or with email
        </span>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div>
          <label
            htmlFor="login-email"
            className="block text-xs font-semibold text-text-main mb-1.5"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              {...register("email")}
              className={`w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-text-main bg-white border rounded-xl focus:outline-hidden transition-all placeholder:text-text-muted/60 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-border-light focus:border-brand focus:ring-1 focus:ring-brand"
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="login-password"
              className="block text-xs font-semibold text-text-main"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => toast("Password reset link will be sent to your email.", { icon: "🔑" })}
              className="text-xs font-medium text-brand hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              {...register("password")}
              className={`w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm text-text-main bg-white border rounded-xl focus:outline-hidden transition-all placeholder:text-text-muted/60 ${
                errors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-border-light focus:border-brand focus:ring-1 focus:ring-brand"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-main cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            {...register("rememberMe")}
            className="w-4 h-4 text-brand border-border-light rounded focus:ring-brand cursor-pointer"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-xs font-medium text-text-muted cursor-pointer"
          >
            Remember me on this browser
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-3 px-4 bg-brand hover:bg-brand-hover text-white rounded-xl text-sm font-semibold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Mobile / Fallback switch link */}
      <div className="mt-6 text-center lg:hidden">
        <p className="text-xs text-text-muted">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-bold text-brand hover:underline cursor-pointer ml-1"
          >
            Create an Account
          </button>
        </p>
      </div>
    </div>
  );
}
