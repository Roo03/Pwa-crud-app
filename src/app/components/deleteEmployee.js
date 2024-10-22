import { useState } from "react";
import useDeleteEmployee from "@/services/deleteEmployee"; 
import AlertDialog from "./AlertDialog";

const DeleteEmployee = ({ id, onDelete }) => { // Mantén el nombre consistente con la convención PascalCase
  const { deleteEmployee, isLoading } = useDeleteEmployee(); // Consistente con el import
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleDelete = async () => {
    const { success } = await deleteEmployee(id); 

    if (success) {
      setDialogMessage("Empleado eliminado correctamente"); 
      onDelete(id);
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

export default DeleteEmployee; // Consistencia en la exportación
