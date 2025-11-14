"use client";

import React, { useEffect, useState } from "react";
import AddProjectForm from "@/components/AddProjectForm";
import AuthDialog from "@/components/LoginModel";
import { useAuthStore } from "@/store/auth-store";
import AdminAccessPage from "@/components/LoginModel";

const AddProjectPage = () => {
  const { isAuthenticated } = useAuthStore();
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      // open dialog if not authenticated
      setShowAuth(true);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated && !showAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground animate-pulse">
          Checking access...
        </p>
      </div>
    );
  }

  return <>{isAuthenticated ? <AddProjectForm /> : <AdminAccessPage />}</>;
};

export default AddProjectPage;
