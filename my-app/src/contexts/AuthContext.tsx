import { useAuth, useUser } from "@clerk/clerk-react";
import { createContext, useContext, ReactNode } from "react";

interface AuthContextType {
  userId: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_ENABLED = import.meta.env.VITE_AUTH_ENABLED === "true";
const RESERVED_USER_ID = import.meta.env.VITE_RESERVED_USER_ID || "guest-user-000";

export function AuthProvider({ children }: { children: ReactNode }) {
  // If auth is disabled, return a mock auth context
  if (!AUTH_ENABLED) {
    const mockAuthContext: AuthContextType = {
      userId: RESERVED_USER_ID,
      isAuthenticated: true, // Always "authenticated" when auth is disabled
      isLoading: false,
      getToken: async () => null, // No token when auth is disabled
    };

    return (
      <AuthContext.Provider value={mockAuthContext}>
        {children}
      </AuthContext.Provider>
    );
  }

  // If auth is enabled, use Clerk
  return <ClerkAuthProvider>{children}</ClerkAuthProvider>;
}

function ClerkAuthProvider({ children }: { children: ReactNode }) {
  const { userId, isLoaded, getToken } = useAuth();
  const { user } = useUser();

  const authContext: AuthContextType = {
    userId: userId || null,
    isAuthenticated: !!userId,
    isLoading: !isLoaded,
    getToken: async () => {
      try {
        return await getToken();
      } catch (error) {
        console.error("Error getting token:", error);
        return null;
      }
    },
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
