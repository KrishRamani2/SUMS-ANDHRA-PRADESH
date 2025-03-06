import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import NewPass from '../../icons/reset.jpg';
import { Link } from 'react-router-dom';

const passwordStrengthIndicator = (password: string): string[] => {
  const strengthClasses = ['bg-gray-300', 'bg-gray-300', 'bg-gray-300'];
  if (password.length < 8) {
    strengthClasses[0] = 'bg-red-500';
  } else if (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password)
  ) {
    strengthClasses[0] = 'bg-green-500';
    strengthClasses[1] = 'bg-green-500';
    strengthClasses[2] = 'bg-green-500';
  } else if (password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password)) {
    strengthClasses[0] = 'bg-yellow-500';
    strengthClasses[1] = 'bg-yellow-500';
  }

  return strengthClasses;
};

const NewPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [strengthClasses, setStrengthClasses] = useState(['bg-gray-300', 'bg-gray-300', 'bg-gray-300']);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setStrengthClasses(passwordStrengthIndicator(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your password update logic here
    if(password !== confirmPassword){
      alert("Passwords do not match!");
      return;
    }
    console.log("Password submitted:", password);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
        <img src={NewPass} alt="Forgot Password Illustration" className="rounded-2xl " />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
        <Card className="w-full max-w-md bg-white">
          <CardHeader>
            <CardTitle>Set New Password</CardTitle>
            <CardDescription>Must be at least 8 characters</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="password" className="block font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="pr-4 border border-gray-300 bg-white"
                  required
                />
                <div className="mt-2 flex space-x-1">
                  <div className={strengthClasses[0]} style={{ width: '33.33%', height: '4px' }}></div>
                  <div className={strengthClasses[1]} style={{ width: '33.33%', height: '4px' }}></div>
                  <div className={strengthClasses[2]} style={{ width: '33.33%', height: '4px' }}></div>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block font-medium">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                  className="pr-4 border border-gray-300 bg-white"
                  required
                />
              </div>

              <div className="flex justify-between items-center">
                <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                  Reset Password
                </Button>
                <Link style={{ textDecoration: "none" }} to="/login" className="text-blue-500 hover:underline">
                  Back to Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewPasswordForm;