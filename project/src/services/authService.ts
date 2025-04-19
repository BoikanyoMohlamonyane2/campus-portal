import { User, UserRole } from '../types';

// Mock user data for demo purposes
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'John Student',
    email: 'student@example.com',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?u=student'
  },
  {
    id: '2',
    name: 'Jane Lecturer',
    email: 'lecturer@example.com',
    role: 'lecturer',
    avatar: 'https://i.pravatar.cc/150?u=lecturer'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?u=admin'
  }
];

// Mock auth service functions
const login = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      const user = MOCK_USERS.find(u => u.email === email);
      
      if (user && password === 'password') { // Simple password check for demo
        // Store user in localStorage for persistence
        localStorage.setItem('currentUser', JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 800);
  });
};

const register = (name: string, email: string, password: string, role: UserRole): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      // Check if user already exists
      const existingUser = MOCK_USERS.find(u => u.email === email);
      
      if (existingUser) {
        reject(new Error('User with this email already exists'));
      } else {
        // In a real app, we would send this data to a server
        // For demo, we'll just resolve
        resolve();
      }
    }, 800);
  });
};

const logout = (): Promise<void> => {
  return new Promise(resolve => {
    // Clear stored user
    localStorage.removeItem('currentUser');
    resolve();
  });
};

const getCurrentUser = (): Promise<User | null> => {
  return new Promise(resolve => {
    // Try to get stored user
    const storedUser = localStorage.getItem('currentUser');
    
    if (storedUser) {
      resolve(JSON.parse(storedUser));
    } else {
      resolve(null);
    }
  });
};

export const authService = {
  login,
  register,
  logout,
  getCurrentUser
};