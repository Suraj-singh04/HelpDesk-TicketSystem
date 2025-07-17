import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function TicketForm({ onTicketCreated = () => {} }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "low",
    assignedTo: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/tickets", {
      ...form,
      status: "open",
    });
    toast.success("Ticket created!");
    onTicketCreated();
    setForm({ title: "", description: "", priority: "low", assignedTo: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-6 space-y-4 border-t-4 border-indigo-500"
    >
      <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
        Create Ticket
      </h2>

      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Ticket title"
        required
        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Describe the issue..."
        required
        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <div className="grid grid-cols-2 gap-4">
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="p-3 border rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="text"
          name="assignedTo"
          value={form.assignedTo}
          onChange={handleChange}
          placeholder="Assign to..."
          className="p-3 border rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2 rounded font-semibold shadow-md transition"
      >
        Submit Ticket
      </button>
    </form>
  );
}
