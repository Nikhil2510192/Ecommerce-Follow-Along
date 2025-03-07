import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const onSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:8000/products/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/Homepage');
      } else {
        setServerError(data.error || 'Failed to add product');
      }
    } catch (error) {
      setServerError('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-black text-center">Add Product</h2>

        <label className="block text-black">Product Name:</label>
        <input
          type="text"
          {...register('productName', { required: 'Product name is required' })}
          className="w-full p-2 border rounded mt-1"
        />
        {errors.productName && <p className="text-red-500 text-sm">{errors.productName.message}</p>}

        <label className="block mt-3 text-black">Description:</label>
        <textarea
          {...register('description', { required: 'Description is required' })}
          className="w-full p-2 border rounded mt-1"
          rows="4"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

        <label className="block mt-3 text-black">Price:</label>
        <input
          type="number"
          {...register('price', { 
            required: 'Price is required',
            min: { value: 0, message: 'Price must be positive' }
          })}
          className="w-full p-2 border rounded mt-1"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

        <label className="block mt-3 text-black">Image URL:</label>
        <input
          type="url"
          {...register('imageUrl', { required: 'Image URL is required' })}
          className="w-full p-2 border rounded mt-1"
        />
        {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>}

        {serverError && <p className="text-red-500 text-sm mt-2">{serverError}</p>}

        <button
          type="submit"
          className="w-full bg-black text-white p-2 mt-4 rounded hover:bg-gray-800"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}