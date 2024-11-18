"use client";
import { useState, useEffect } from "react";
import AddEmployee from "../components/addEmployee";
import Cards from "../components/Cards";
import Form from "../components/Form";
import Modal from "../components/Modal";
import useEmployee from "@/services/useEmployee";
import { getAuth, signInAnonymously } from "firebase/auth";

export default function Menu() {
  const { Employee, loading, error } = useEmployee();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOffline, setIsOffline] = useState(false);
  const [isBackOnline, setIsBackOnline] = useState(false);

  const loguearse = async () => {
    const user = getAuth().currentUser;
    if (!user) {
      await signInAnonymously(getAuth()).then((usuario) => {
        console.log("Usuario logueado:", usuario);
      });
    }
  };

  useEffect(() => {
    const handleOffline = () => {
      setIsOffline(true);
      setIsBackOnline(false);
    };

    const handleOnline = () => {
      setIsBackOnline(true);
      setIsOffline(false);

      setTimeout(() => {
        setIsBackOnline(false);
      }, 3000);
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  const pageSize = 6;
  const totalPages = Math.ceil(Employee.length / pageSize);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const start = (currentPage - 1) * pageSize;
  const paginatedEmployees = Employee.slice(start, start + pageSize);

  const handleEdit = (employee) => {
    setEmployeeToEdit(employee);
    setIsModalOpen(true);
  };

  const handleAddEmployee = () => {
    setEmployeeToEdit(null);
    setIsModalOpen(true);
  };

  const handleSuccess = (data) => {
    console.log("Form submitted successfully", data);
    setIsModalOpen(false);
  };

  if (loading) return <p>Cargando empleados...</p>;
  if (error) return <p>Error al cargar empleados: {error}</p>;

  return (
    <div
      className="min-h-screen h-full w-full"
      style={{
        background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
      }}
    >
      <main
        className="container mx-auto px-4 py-10 max-w-7xl relative"
        style={{
          background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
        }}
      >
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-12 text-indigo-700 text-center z-10"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Horizon admin
        </h1>
        
        <div className="mb-8 flex justify-start z-10">
          <AddEmployee onAdd={handleAddEmployee} />
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Form onSuccess={handleSuccess} employeeToEdit={employeeToEdit} />
        </Modal>

        {isOffline && (
          <div className="fixed bottom-0 left-0 right-0 bg-red-500 text-white text-center py-2 z-10">
            Sin conexión a internet
          </div>
        )}

        {isBackOnline && (
          <div className="fixed bottom-0 left-0 right-0 bg-green-500 text-white text-center py-2 z-10">
            ¡De nuevo en línea!
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 z-10">
          {paginatedEmployees.map((employee) => (
            <Cards
              key={employee.id}
              nombre={employee.nombre}
              puesto={employee.puesto.split(", ")}
              onDelete={handleSuccess}
              onEdit={handleEdit}
              id={employee.id}
            />
          ))}
        </div>

        <div className="flex justify-center mt-14 z-10">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            aria-label="Página anterior"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md mx-2 disabled:bg-gray-400"
          >
            Anterior
          </button>
          <span className="px-4 py-2 text-lg text-white">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            aria-label="Siguiente página"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md mx-2 disabled:bg-gray-400"
          >
            Siguiente
          </button>
        </div>
      </main>
    </div>
  );
}
