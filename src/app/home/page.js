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
  const [employeeToEdit, setemployeeToEdit] = useState(null); // Usamos employeeToEdit para editar

  const handleEdit = (employee) => {
    setemployeeToEdit(employee); // Establece el empleado a editar
    setIsModalOpen(true); // Abre el modal
  };

  const handleAddemployee = () => {
    setemployeeToEdit(null); // Asegúrate de que esté vacío cuando no se edite
    setIsModalOpen(true);
  };
  const handleSuccess = (data) => {
    console.log('Form submitted successfully', data);
    // Aquí puedes manejar la lógica cuando el formulario se envíe correctamente
    setIsModalOpen(false);  // Cierra el modal después de éxito, por ejemplo
  };

  if (loading) return <p>Cargando empleados...</p>;
  if (error) return <p>Error al cargar empleados: {error}</p>;

  return (
    <main className="container mx-auto px-4 py-10 max-w-7xl">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-indigo-700 text-center">Empleados</h1>

      <div className="mb-8 flex justify-center">
        <AddEmployee onAdd={handleAddemployee} />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Form onSuccess={handleSuccess} employeeToEdit={employeeToEdit} /> {/* Pasa el empleado a editar */}
      </Modal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Employee.map((employee) => (
          <Cards
            key={employee.id}
            nombre={employee.nombre}
            puesto={employee.puesto.split(", ")}
            onDelete={handleSuccess}
            onEdit={handleEdit} // Pasa la función onEdit
            id={employee.id}
          />
        ))}
      </div>
    </main>
  );
}
