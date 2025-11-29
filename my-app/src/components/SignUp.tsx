import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import { Folder } from "lucide-react";

export function SignUp() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Navigation Bar */}
      <nav className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="flex items-center gap-2 text-zinc-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <Folder className="h-5 w-5 text-white" />
              </div>
              Pressure Lab
            </h1>
          </div>
        </div>
      </nav>

      {/* Sign Up Form */}
      <main className="flex items-center justify-center px-6 py-16">
        <ClerkSignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-zinc-900 border border-zinc-800",
            },
          }}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
        />
      </main>
    </div>
  );
}
