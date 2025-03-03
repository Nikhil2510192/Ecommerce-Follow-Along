import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Form Submitted:', data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
         <h2 className="text-2xl font-bold mb-4 text-black text-center">Sign Up</h2>
        
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
          {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' } })}
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
        
        <button
          type="submit"
          className="w-full bg-black text-white p-2 mt-4 rounded hover:bg-gray-800"
        >
          Sign Up
        </button>
        <div>
      <p>Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
    </div>
      </form>
    </div>
  );
}
