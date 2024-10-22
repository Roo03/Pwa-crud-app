import Deleteemloyee from "./deleteEmployee";

const Cards = ({
  nombre,
  puesto,
  id,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="bg-gray-900 text-white border border-gray-700 p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105">
      <h2 className="font-bold text-2xl mb-2">{nombre}</h2>
      <p className="text-gray-400">Puesto: {puesto.join(", ")}</p>

      <div className="mt-4 flex gap-4">
        <button
          onClick={() => onEdit({ id, nombre, puesto })}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
        >
          Editar
        </button>
        <Deleteemloyee id={id} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default Cards;
