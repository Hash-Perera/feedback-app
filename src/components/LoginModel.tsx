"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ShieldCheck } from "lucide-react";

// Secure hash comparison
async function verifyAccessCode(input: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex === process.env.NEXT_PUBLIC_AUTH_HASH;
}

const AdminAccessPage: React.FC = () => {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const [accessCode, setAccessCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const isValid = await verifyAccessCode(accessCode);
      if (isValid) {
        login("admin");
        router.push("/projects/add");
      } else {
        setError("Invalid access code ❌");
      }
    } catch {
      setError("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 
      bg-gradient-to-br from-white via-white to-indigo-50"
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl border border-white/40 shadow-xl backdrop-blur-2xl 
        bg-gradient-to-br from-white/90 to-white/60 px-8 py-10 text-center"
        style={{
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,0.3)",
        }}
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md mb-3">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Admin Access
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Enter your secret access key to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div className="space-y-2">
            <Label
              htmlFor="accessCode"
              className="text-sm font-medium text-gray-700"
            >
              Access Key
            </Label>
            <Input
              id="accessCode"
              type="password"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              required
              className="rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-indigo-500/50 transition-all mt-3"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center bg-red-100/70 p-2 rounded-md">
              {error}
            </p>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/")}
              disabled={loading}
              className="rounded-full border-gray-300 hover:bg-gray-100 transition-all"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
              text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              {loading ? (
                <>
                  <ShieldCheck className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </main>
  );
};

export default AdminAccessPage;
