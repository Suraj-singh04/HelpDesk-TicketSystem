import axios from "axios";
import { useEffect, useState } from "react";
import TicketCard from "./TicketCard";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchTickets = async () => {
    const res = await axios.get("http://localhost:5000/api/tickets");
    setTickets(res.data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filtered = tickets.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter ? t.status === statusFilter : true)
  );

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 border-t-4 border-indigo-500 space-y-4">
      <h2 className="text-xl font-semibold text-indigo-600 mb-2">
        Your Tickets
      </h2>

      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          placeholder="Search tickets..."
          className="flex-1 p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="open">Open</option>
          <option value="in progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {filtered.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket} refresh={fetchTickets} />
        ))}
      </div>
    </div>
  );
}
