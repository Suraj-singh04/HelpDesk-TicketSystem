import { FaHeadset } from "react-icons/fa";

export default function Header() {
  return (
    <header className="text-center py-4">
      <div className="flex items-center justify-center gap-2 text-3xl font-bold text-indigo-700">
        <FaHeadset />
        Help Desk Ticket System
      </div>
      <p className="text-gray-600 mt-2">Built with React, Tailwind & MongoDB</p>
    </header>
  );
}
