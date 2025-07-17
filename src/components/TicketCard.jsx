import axios from "axios";
import { toast } from "react-hot-toast";

export default function TicketCard({ ticket, refresh }) {
  const updateStatus = async (status) => {
    await axios.put(`http://localhost:5000/api/tickets/${ticket._id}`, {
      status,
    });
    toast.success("Status updated");
    refresh();
  };

  const deleteTicket = async () => {
    await axios.delete(`http://localhost:5000/api/tickets/${ticket._id}`);
    toast.success("Ticket deleted");
    refresh();
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md border-l-4 border-indigo-400 hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-semibold text-lg">{ticket.title}</h3>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            ticket.status === "open"
              ? "bg-yellow-200 text-yellow-800"
              : ticket.status === "in progress"
              ? "bg-blue-200 text-blue-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {ticket.status.toUpperCase()}
        </span>
      </div>

      <p className="text-gray-600">{ticket.description}</p>

      <div className="text-sm text-gray-500 mt-1">
        Priority: <strong>{ticket.priority}</strong> | Assigned to:{" "}
        <strong>{ticket.assignedTo || "Unassigned"}</strong>
      </div>

      <div className="text-xs text-gray-400">
        Created: {new Date(ticket.createdAt).toLocaleString()}
      </div>

      <div className="flex gap-2 mt-3">
        {ticket.status !== "resolved" && (
          <button
            onClick={() =>
              updateStatus(
                ticket.status === "open" ? "in progress" : "resolved"
              )
            }
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-sm"
          >
            {ticket.status === "open" ? "Start Progress" : "Resolve"}
          </button>
        )}
        <button
          onClick={deleteTicket}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
