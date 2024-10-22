"use client";
import { useState } from "react";
import AddEmployee from "../components/addEmployee";
import Cards from "../components/Cards";
import Form from "../components/Form";
import Modal from "../components/Modal";
import useEmployee from "@/services/useEmployee"; 

export default function Menu() {
  const { Employee, loading, error } = useEmployee();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [employeeToEdit, setemployeeToEdit] = useState(null);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setDialogMessage("");
  };

  const handleSuccess = (message) => {
    setDialogMessage(message);
    setIsDialogOpen(true);
    setIsModalOpen(false);
  };

  const handleEdit = (employee) => {
    setemployeeToEdit(employee);
    setIsModalOpen(true);
  };

  const handleAddemployee = () => {
    setemployeeToEdit(null);
    setIsModalOpen(true);
  };

  if (loading) return <p className="text-center text-xl font-semibold text-blue-600">Cargando empleados...</p>;
  if (error) return <p className="text-center text-xl font-semibold text-red-600">Error al cargar empleados: {error}</p>;

  return (
    <main className="container mx-auto px-4 py-10 max-w-7xl">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-indigo-700 text-center">Empleados</h1>

      <p className="text-lg sm:text-xl text-gray-600 text-center mb-8">
        Registra a los nuevos integrantes de la familia
      </p>

      <div className="mb-8 flex justify-center">
        <AddEmployee onAdd={handleAddemployee} />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Form onSuccess={handleSuccess} recipeToEdit={employeeToEdit} />
      </Modal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Employee.map((employee) => (
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
    </main>
  );
}
