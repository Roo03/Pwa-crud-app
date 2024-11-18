import { useState } from 'react';

export default function useRegisterEmployee() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerEmployee = async (recipe) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('api-empleados-production.up.railway.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al realizar registro');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { registerEmployee, isLoading, error };
}
