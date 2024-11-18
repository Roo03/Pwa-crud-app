import { useState } from "react";

export default function useDeleteemployee() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteEmployee = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api-empleados-production.up.railway.app/api/empleados/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar la receta');
      }

      return { success: true, message: 'empleado despedido correctamente.' }; 
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message }; 
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteEmployee,
    isLoading,
    error,
  };
}
