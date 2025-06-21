
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface LoginFormProps {
  onLogin: (email: string, password: string, isAdmin?: boolean) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password, isAdmin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cliento-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-cliento-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-heading font-bold text-xl">C</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-heading">Welcome to Cliento</CardTitle>
          <CardDescription>Sign in to your CRM account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="w-4 h-4 text-cliento-blue"
              />
              <Label htmlFor="admin" className="text-sm">Admin Portal Access</Label>
            </div>
            <Button type="submit" className="w-full bg-cliento-blue hover:bg-cliento-blue-dark">
              Sign In
            </Button>
            <Separator />
            <div className="text-center text-sm text-cliento-gray-500">
              Don't have an account? <a href="#" className="text-cliento-blue hover:underline">Sign up</a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
