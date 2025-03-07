import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const onSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:8000/users/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json(); 

      if (response.ok) {
        
        setServerError(data.message || 'User created successfully!');
        navigate('/Homepage'); 
      } else {
        
        setServerError(data.error || 'Registration failed');
      }
    } catch (error) {
     
      setServerError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-black text-center">Sign Up</h2>

        <label className="block text-black">User Type:</label>
        <select
          {...register('userType', { required: 'Please select a user type' })}
          className="w-full p-2 border rounded mt-1 mb-3 text-black bg-white"
        >
          <option value="">Select user type</option>
          <option value="buyer">Buyer</option>
          <option value="vendor">Vendor</option>
        </select>
        {errors.userType && <p className="text-red-500 text-sm mt-1">{errors.userType.message}</p>}

        <label className="block text-black">Username:</label>
        <input
          type="text"
          {...register('username', { required: 'Username is required' })}
          className="w-full p-2 border rounded mt-1"
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

        <label className="block mt-3 text-black">Email:</label>
        <input
          type="email"
          {...register('email', { 
            required: 'Email is required', 
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' }
          })}
          className="w-full p-2 border rounded mt-1"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <label className="block mt-3 text-black">Password:</label>
        <input
          type="password"
          {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })}
          className="w-full p-2 border rounded mt-1"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        {serverError && <p className="text-red-500 text-sm mt-2">{serverError}</p>}
        {setServerError && <p className='text-red-500 text-sm mt-2'>{setServerError}</p>}

        <button
          type="submit"
          className="w-full bg-black text-white p-2 mt-4 rounded hover:bg-gray-800"
        >
          Sign Up
        </button>

        <div className="mt-4 text-center">
          <p>Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
        </div>
      </form>
    </div>
  );
}
