'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    dob: '',
    email: '',
    password: ''
  });
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
    if (!formData.firstname) newErrors.firstname = 'First name is required';
    if (!formData.lastname) newErrors.lastname = 'Last name is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formData.email))
      newErrors.email = 'Enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8)
      newErrors.password = 'Must be at least 8 characters';
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
      const response = await axios.post("http://localhost:8080/api/register", formData);
      
      if (response.status === 200) {
        toast.success("Registration successful! Redirecting to login...", {
          autoClose: 1500,
          onClose: () => router.push('/login')
        });
      } else if (response.status === 401) {
        toast.error("Email already registered");
      } else {
        toast.error(response.data || "Registration failed");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data || "Server error. Please try again.");
      } else {
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {['firstname', 'lastname', 'dob', 'email', 'password'].map((field) => (
            <div key={field}>
              <label className="block mb-1 text-gray-700 capitalize">{field.replace('_', ' ')}</label>
              <input
                type={field === 'dob' ? 'date' : field === 'password' ? 'password' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 ${
                  errors[field] ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
                }`}
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account? <span onClick={() => router.push('/login')} className="text-blue-600 cursor-pointer hover:underline">Login</span>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}