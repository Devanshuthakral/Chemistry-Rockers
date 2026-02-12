import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Atom } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";

export default function Login() {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setLocation("/admin");
    }
  }, [isLoading, isAuthenticated, setLocation]);

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-background to-background" />
      
      <Card className="w-full max-w-md relative z-10 border-white/10 bg-card/50 backdrop-blur-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center">
            <Atom className="w-10 h-10 text-primary animate-spin-slow" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-white">Admin Access</CardTitle>
            <CardDescription className="text-slate-400">
              Sign in to manage student results and inquiries.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Button 
            className="w-full h-12 bg-white text-slate-900 hover:bg-slate-200 font-medium"
            onClick={() => window.location.href = "/api/login"}
          >
            Sign in with Replit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
