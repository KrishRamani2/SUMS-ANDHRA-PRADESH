 
import { useState, FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import forgotPasswordImage from "../../icons/forgorpass.jpg";


const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:8000/api/user/forgot-password', {
        email
      });

      if (response.status === 200) {
        // Password reset email sent successfully
        // You might want to navigate to a confirmation page or show a success message
        navigate('/reset-password-sent');
      }
    } catch (error) {
      console.error('Error requesting password reset:', error);
      // Handle error - show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
        <img 
          src={forgotPasswordImage}
          alt="Forgot Password Illustration"
          className="rounded-2xl max-w-full h-auto"
        />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
        <Card className="w-full max-w-md bg-white">
          <CardHeader className="text-center">
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>
              Enter your email for password reset instructions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 bg-white"
                    required
                  />
                </div>
              </div>
              <Button 
                className="w-full mt-4 bg-black text-white hover:bg-gray-800"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;