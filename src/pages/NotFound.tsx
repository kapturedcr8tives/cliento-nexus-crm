
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cliento-gray-50">
      <div className="text-center">
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 bg-cliento-blue rounded-lg flex items-center justify-center">
            <span className="text-white font-heading font-bold text-2xl">C</span>
          </div>
        </div>
        
        <h1 className="text-6xl font-heading font-bold text-cliento-gray-900 mb-4">
          404
        </h1>
        
        <h2 className="text-2xl font-heading font-semibold text-cliento-gray-700 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-cliento-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back to your dashboard.
        </p>
        
        <div className="space-x-4">
          <Button asChild className="bg-cliento-blue hover:bg-cliento-blue-dark">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
