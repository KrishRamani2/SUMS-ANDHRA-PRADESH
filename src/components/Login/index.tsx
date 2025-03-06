import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Lock } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/loginStore';
import Login from "../../icons/login.jpg";
import School1 from "../images/School11.jpg";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { login, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      switch (user.role) {
        case 'AndhraPradesh':
          navigate('/super-admin');
          break;
        case 'PRINCIPAL':
          navigate('/');
          break;
        default:
          navigate('/');
          break;
      }
    }
  }, [isAuthenticated, navigate, user]);

  const onFinish = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = login(username, password, code);
      
      if (!success) {
        setPassword("");
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error('Login error:', error);
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
        <img
          src={Login}
          alt="Login Illustration"
          className="rounded-2xl"
        />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
        <Card className="w-full max-w-md bg-white">
          <div className="flex justify-center -mt-12 mb-4">
            <div className="w-21 h-21 bg-white rounded-xl flex items-center justify-center">
              <img
                src={School1}
                alt="Company Logo"
                className="w-24 h-24 rounded-xl object-contain"
              />
            </div>
          </div>
          <CardHeader className="text-center">
            <CardTitle className="text-center">Sign In</CardTitle>
            <CardDescription className="text-center">Enter your username and password to log in</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onFinish}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="code"
                    placeholder="Institute Code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="border border-gray-300 bg-white focus:ring-2"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="username"
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-gray-300 bg-white focus:ring-2"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 bg-white focus:ring-2"
                    required
                  />
                </div>
                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember-me"
                      checked={rememberMe}
                      onCheckedChange={() => setRememberMe(!rememberMe)}
                      style={{ borderRadius: "35%" }}
                    />
                    <label
                      htmlFor="remember-me"
                      className="text-sm font-medium leading-none"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/forgotpassword"
                    className="flex items-center text-sm text-blue-600 hover:underline"
                  >
                    <Lock className="mr-1 h-4 w-4" />
                    Forgot Password
                  </Link>
                </div>
              </div>
              <Button
                className="w-full mt-4 bg-black text-white hover:bg-gray-800"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;