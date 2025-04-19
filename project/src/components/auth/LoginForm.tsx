import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  // Pre-populate with demo accounts for testing
  const loginAsDemoUser = (role: string) => {
    let demoEmail = '';
    
    switch (role) {
      case 'student':
        demoEmail = 'student@example.com';
        break;
      case 'lecturer':
        demoEmail = 'lecturer@example.com';
        break;
      case 'admin':
        demoEmail = 'admin@example.com';
        break;
      default:
        return;
    }
    
    setEmail(demoEmail);
    setPassword('password');
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg flex items-start text-sm">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <Input
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          autoComplete="email"
          required
          leadingIcon={<Mail className="w-4 h-4" />}
        />

        <Input
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          leadingIcon={<Lock className="w-4 h-4" />}
        />

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
        >
          Sign in
        </Button>
      </form>

      {/* Demo account quick access */}
      <div className="mt-8">
        <p className="text-center text-sm text-gray-600 mb-4">Demo accounts for testing</p>
        <div className="grid grid-cols-3 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loginAsDemoUser('student')}
          >
            Student
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loginAsDemoUser('lecturer')}
          >
            Lecturer
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loginAsDemoUser('admin')}
          >
            Admin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;