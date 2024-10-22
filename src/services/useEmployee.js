import { useEffect, useState } from "react";

const useEmployee = () => {
  const [Employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      setError(null);

      try {
        const cachedEmployee = localStorage.getItem('Employee');
        if (cachedEmployee) {
          setRecipes(JSON.parse(cachedRecipes));
        }

        const response = await fetch('https://api-empleados-production.up.railway.app/api/empleados');
        
        if (!response.ok) {
          throw new Error('Error al obtener los empleados');
        }

        const { data } = await response.json();

        if (Array.isArray(data)) {
          setEmployee(data);
          localStorage.setItem('employee', JSON.stringify(data));
        } else {
          throw new Error("Los datos no son un array");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error al cargar los empleados:", error);

        const cachedEmployee = localStorage.getItem('employee');
        if (cachedEmploye) {
          setRecipes(JSON.parse(cachedEmployee));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, []);

  return { Employee, loading, error };
};

export default useEmployee;
