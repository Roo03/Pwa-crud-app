import { useState, useEffect } from "react";
import useRegisterEmployee from "@/services/registerEmployee";
import useEditEmployee from "@/services/editEmployee";
import AlertDialog from "@/app/components/AlertDialog";
import Push from "push.js"; // Importar push.js

const Form = ({ onSuccess, employeeToEdit }) => {
  const [nombre, setNombre] = useState(employeeToEdit?.nombre || "");
  const [puesto, setPuesto] = useState(employeeToEdit?.puesto || "");
  const [alertMessage, setAlertMessage] = useState("");

  const { registerEmployee, isLoading: isCreating } = useRegisterEmployee();
  const { editEmployee, isLoading: isEditing } = useEditEmployee();

  useEffect(() => {
    if (employeeToEdit) {
      setNombre(employeeToEdit.nombre);
      setPuesto(employeeToEdit.puesto);
    }
  }, [employeeToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (employeeToEdit) {
        
        response = await editEmployee(employeeToEdit.id, { nombre, puesto });
        setAlertMessage(response ? "Empleado editado con éxito" : "Error al editar empleado");

        
        Push.create(response ? "Empleado editado" : "Error al editar", {
          body: response ? `Empleado ${nombre} editado con éxito` : 'Hubo un error al editar al empleado ${nombre}',
          icon: 'assets/img/notificacion.png',
          timeout: 3000,
        });
      } else {
        // Llamada para registrar un nuevo empleado
        response = await registerEmployee({ nombre, puesto });
        setAlertMessage(response ? "Empleado agregado con éxito" : "Error al agregar empleado");

        // Enviar notificación de éxito o error
        Push.create(response ? "Empleado agregado" : "Error al agregar", {
          body: response ? `Empleado ${nombre} agregado con éxito` : "Hubo un error al agregar al empleado",
          icon: 'assets/img/notificacion.png',
          timeout: 3000, 
        });
      }

      if (response) {
        onSuccess(alertMessage);
      }
    } catch (error) {
      console.error("Error al procesar el formulario:", error);
      setAlertMessage("Error al realizar la operación");

      // Notificación en caso de error
      Push.create("Error en el proceso", {
        body: "Hubo un error al procesar la solicitud",
        icon: 'assets/img/notificacion.png',
        timeout: 3000,
      });
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
        onChange={(e) => setNombre(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded"
      />
      <textarea
        placeholder="Puesto"
        value={puesto}
        onChange={(e) => setPuesto(e.target.value)}
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
