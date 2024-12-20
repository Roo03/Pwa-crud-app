import { useState } from 'react';

export default function useEditEmployee() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const editEmployee = async (id, employee) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api-empleados-production.up.railway.app/api/empleados/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al editar empleado');
      }

      const data = await response.json();
      return data; // Retorna el empleado editado
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { editEmployee, isLoading, error };
}
