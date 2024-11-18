import { useState } from "react";
import useDeleteEmployee from "@/services/deleteEmployee"; 
import AlertDialog from "./AlertDialog";
import Push from 'push.js';  // Importar Push.js

const DeleteEmployee = ({ id, onDelete }) => {
  const { deleteEmployee, isLoading } = useDeleteEmployee();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleDelete = async () => {
    const { success } = await deleteEmployee(id); 

    if (success) {
      setDialogMessage("Empleado eliminado correctamente"); 
      onDelete(id);

      // Notificación de éxito usando Push.js
      Push.create('Empleado eliminado', {
        body: 'El empleado fue eliminado correctamente',
        icon: 'assets/img/notificacion.png',  
        timeout: 3000,  
        onClick: function() {
          window.focus();
          this.close();
        }
      });
    } else {
      setDialogMessage("Error al eliminar al empleado.");
    }

    setShowDialog(true);
  };

  const handleClose = () => {
    setShowDialog(false);
    window.location.reload();
  };

  return (
    <>
      <button
        onClick={handleDelete}
        className="bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out"
        disabled={isLoading}
      >
        {isLoading ? "Eliminando..." : "Eliminar"}
      </button>

      <AlertDialog message={dialogMessage} onClose={handleClose} />
    </>
  );
};

export default DeleteEmployee;
