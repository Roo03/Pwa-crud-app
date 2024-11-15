import { useState, useEffect } from "react";
import useRegisterEmployee from "@/services/registerEmployee";
import useEditEmployee from "@/services/editEmployee";  // Asegúrate de importar el hook para editar empleados
import AlertDialog from "@/app/components/AlertDialog";

const Form = ({ onSuccess, employeeToEdit }) => {
  const [nombre, setnombre] = useState(employeeToEdit?.nombre || "");
  const [puesto, setpuesto] = useState(employeeToEdit?.puesto || "");
  const [alertMessage, setAlertMessage] = useState("");

  const { registerEmployee, isLoading: isCreating } = useRegisterEmployee();
  const { editEmployee, isLoading: isEditing } = useEditEmployee(); // Asegúrate de que esté disponible

  useEffect(() => {
    if (employeeToEdit) {
      setnombre(employeeToEdit.nombre);
      setpuesto(employeeToEdit.puesto);
    }
  }, [employeeToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (employeeToEdit) { // Si estamos editando
        const response = await editEmployee(employeeToEdit.id, {
          nombre,
          puesto,
        });

        if (response) {
          setAlertMessage("Empleado editado con éxito");
        } else {
          setAlertMessage("Error al editar empleado");
        }
      } else { // Si estamos creando
        const response = await registerEmployee({
          nombre,
          puesto,
        });

        if (response) {
          setAlertMessage("Empleado agregado con éxito");
        } else {
          setAlertMessage("Error al agregar empleado");
        }
      }
    } catch (error) {
      console.error("Error al procesar el formulario:", error);
      setAlertMessage("Error al realizar la operación");
    }
  };

  const handleCloseDialog = () => {
    setAlertMessage("");
    window.location.reload(); // O mejor usa la función para cerrar el modal en vez de recargar toda la página
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Nombre del empleado"
        value={nombre}
        onChange={(e) => setnombre(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded"
      />
      <textarea
        placeholder="Puesto"
        value={puesto}
        onChange={(e) => setpuesto(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        disabled={isCreating || isEditing}
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-400 transition duration-300 ease-in-out"
      >
        {isCreating || isEditing ? "Cargando..." : employeeToEdit ? "Actualizar empleado" : "Registrar empleado"}
      </button>

      {alertMessage && (
        <AlertDialog message={alertMessage} onClose={handleCloseDialog} />
      )}
    </form>
  );
};

export default Form;
