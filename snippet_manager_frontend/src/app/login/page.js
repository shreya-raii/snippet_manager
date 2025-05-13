'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      router.replace('/user/dashboard');
    }
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/login", formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user.id);
      localStorage.setItem('firstName', response.data.user.firstName);

      toast.success("Login successful! Redirecting to dashboard...", {
        autoClose: 1500,
        onClose: () => router.push('/user/dashboard')
      });
      
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 404) {
          toast.error("Email doesn't exist, please register.");
        } else if (status === 401) {
          toast.error("Incorrect password, try again.");
        } else {
          toast.error(data.message || "Login failed");
        }
      } else {
        toast.error("Network error or server unreachable.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
              }`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 ${
                errors.password ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
              }`}
              placeholder="********"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account? <span onClick={() => router.push('/register')} className="text-blue-600 cursor-pointer hover:underline">Register</span>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}