import { useState } from "react";
import useEditEmployee from "@/services/editEmployee";

const Editemployee = ({ employeeToEdit, nombre, puesto, onSuccess }) => {
  const { editemployee, isLoading } = useEditEmployee();
  const [errorMessage, setErrorMessage] = useState("");

  const handleEdit = async () => {
    setErrorMessage(""); 
    try {
      const response = await editemployee(employeeToEdit.id, {
        nombre,
        puesto,
      });

      if (response) {
        onSuccess("Cambios realizados con éxito");
      } else {
        setErrorMessage("Error al editar empleado");
        onSuccess("Error al editar empleado");
      }
    } catch (error) {
      console.error("Error al editar empleado:", error);
      setErrorMessage("Error al realizar la operación");
      onSuccess("Error al realizar la operación");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleEdit}
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        {isLoading ? "Cargando..." : "Editar empleado"}
      </button>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </>
  );
};

export default Editemployee;
