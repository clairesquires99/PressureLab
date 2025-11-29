import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateCase } from "./components/CreateCase";
import { Home } from "./components/Home";
import { Playground } from "./components/Playground";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ResultsPage } from "./components/ResultsPage";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { AuthProvider } from "./contexts/AuthContext";

const AUTH_ENABLED = import.meta.env.VITE_AUTH_ENABLED === "true";
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export default function App() {
  const AppContent = (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          {AUTH_ENABLED && <Route path="/sign-in/*" element={<SignIn />} />}
          {AUTH_ENABLED && <Route path="/sign-up/*" element={<SignUp />} />}

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cases/create"
            element={
              <ProtectedRoute>
                <CreateCase />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cases/:id/results"
            element={
              <ProtectedRoute>
                <ResultsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/playground"
            element={
              <ProtectedRoute>
                <Playground />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );

  // If auth is disabled, render without ClerkProvider
  if (!AUTH_ENABLED) {
    return AppContent;
  }

  // If auth is enabled but no key provided, show error
  if (!CLERK_PUBLISHABLE_KEY) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <h1>Configuration Error</h1>
        <p>
          VITE_AUTH_ENABLED is set to true, but VITE_CLERK_PUBLISHABLE_KEY is
          missing.
        </p>
        <p>
          Please add your Clerk publishable key to the .env file or set
          VITE_AUTH_ENABLED=false
        </p>
      </div>
    );
  }

  // If auth is enabled, wrap with ClerkProvider
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      {AppContent}
    </ClerkProvider>
  );
}
