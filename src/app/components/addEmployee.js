import { MdAdd } from 'react-icons/md';

export default function AddEmployee({ onAdd }) {
  return (
    <button 
      className="bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center hover:bg-blue-500 transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
      onClick={onAdd}
    >
      <MdAdd className="mr-2" />
      Registrar empleado
    </button>
  );
}
