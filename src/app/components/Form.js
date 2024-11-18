import { useState, useEffect } from "react";
import useRegisterEmployee from "@/services/registerEmployee";
import useEditEmployee from "@/services/editEmployee";
import Push from "push.js"; // Importamos Push.js
import AlertDialog from "@/app/components/AlertDialog";

const Form = ({ onSuccess, employeeToEdit }) => {
  const [nombre, setNombre] = useState(employeeToEdit?.nombre || "");
  const [puesto, setPuesto] = useState(employeeToEdit?.puesto || "");
  const [alertMessage, setAlertMessage] = useState("");

  const { registerEmployee, isLoading: isCreating } = useRegisterEmployee();
  const { editEmployee, isLoading: isEditing } = useEditEmployee();
  const [isPuestoOpen, setIsPuestoOpen] = useState(false);

  useEffect(() => {
    if (employeeToEdit) {
      setNombre(employeeToEdit.nombre);
      setPuesto(employeeToEdit.puesto);
    }
  }, [employeeToEdit]);

  const puestos = [
    "Desarrollador Frontend",
    "Desarrollador Backend",
    "Desarrollador Fullstack",
    "Ingeniero de QA",
    "Product Owner",
    "Scrum Master",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (employeeToEdit) {
        response = await editEmployee(employeeToEdit.id, { nombre, puesto });
        setAlertMessage(
          response ? "Empleado  editado con éxito" : "Error al editar empleado "
        );
      } else {
        response = await registerEmployee({ nombre, puesto });
        setAlertMessage(
          response
            ? "Empleado agregado con éxito"
            : "Error al agregar empleado "
        );
      }

      if (response) {
        Push.create("Operación exitosa", {
          body: employeeToEdit
            ? `Empleado ${nombre} editado con éxito`
            : `Empleado agregado con éxito`,
          icon: "assets/img/notificacion.png",
          timeout: 3000,
          onClick: function () {
            window.focus();
            this.close();
          },
        });

        window.location.reload();
      }

      onSuccess(alertMessage);
    } catch (error) {
      console.error("Error al procesar el formulario:", error);
      setAlertMessage("Error al realizar la operación");
    }
  };

  const handleCloseDialog = () => {
    setAlertMessage("");
    window.location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center space-y-6 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <h2 className="text-2xl font-bold text-indigo-600 text-center">
        {employeeToEdit ? "Editar Empleado" : "Agregar Empleado"}
      </h2>

      <input
        type="text"
        placeholder="Nombre del empleado"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
      />

      <div className="relative w-full">
        <button
          type="button"
          onClick={() => setIsPuestoOpen((prev) => !prev)}
          className="w-full p-3 border border-gray-300 rounded-md text-left focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {puesto || "Selecciona un puesto"}
        </button>

        {isPuestoOpen && (
          <ul
            className="absolute w-full bg-white border border-gray-300 mt-1 rounded-md shadow-md"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            {puestos.map((puestoOption) => (
              <li
                key={puestoOption}
                onClick={() => {
                  setPuesto(puestoOption);
                  setIsPuestoOpen(false);
                }}
                className="p-3 cursor-pointer hover:bg-indigo-100"
              >
                {puestoOption}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={isCreating || isEditing}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 transition duration-300 ease-in-out disabled:bg-gray-400"
        >
          {isCreating || isEditing
            ? "Cargando..."
            : employeeToEdit
            ? "Actualizar"
            : "Registrar"}
        </button>

        
      </div>

      {alertMessage && (
        <AlertDialog message={alertMessage} onClose={handleCloseDialog} />
      )}
    </form>
  );
};

export default Form;
