import { useState, useEffect } from "react";
import useRegisterEmployee from "@/services/registerEmployee";
import Editemployee from "./editEmployee"; 
import AlertDialog from "@/app/components/AlertDialog";

const Form = ({ onSuccess, employeeToEdit }) => {
    const [nombre, setnombre] = useState(employeeToEdit?.nombre || "");
    const [puesto, setpuesto] = useState(employeeToEdit?.puesto || "");
    const [alertMessage, setAlertMessage] = useState(""); 
  
    const { registerEmployee, isLoading: isCreating } = useRegisterEmployee();
  
    useEffect(() => {
      if (employeeToEdit) {
        setnombre(employeeToEdit.nombre);
        setpuesto(employeeToEdit.puesto);
      }
    }, [employeeToEdit]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!employeeToEdit) {
      try {
        const response = await registerEmployee({
          nombre,
          puesto,
        });
        
  
        if (response) {
          setAlertMessage("Empleado agregado con éxito");
        } else {
          setAlertMessage("Error al agregar empleado");
        }
      } catch (error) {
        console.error("Error al agregar empleado:", error);
        setAlertMessage("Error al realizar la operación");
      }
    }
    };
  
    const handleCloseDialog = () => {
      setAlertMessage("");
      window.location.reload();
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
      {employeeToEdit && (
        <Editemployee
          employeeToEdit={employeeToEdit}
          nombre={nombre}
          puesto={puesto}
          onSuccess={setAlertMessage} 
        />
      )}
  
      {!employeeToEdit && (
        <button
        type="submit"
        disabled={isCreating}
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-orange-400 transition duration-300 ease-in-out"
      >
        {isCreating ? "Cargando..." : "Registrar empleado"}
      </button>
    )}
        {alertMessage && (
          <AlertDialog
            message={alertMessage}
            onClose={handleCloseDialog}
          />
        )}
      </form>
    );
  };
  

export default Form;
