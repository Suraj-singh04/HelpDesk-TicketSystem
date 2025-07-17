import { useState } from "react";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleTicketCreated = () => {
    setRefresh(!refresh); // trigger TicketList re-render
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100 text-gray-800 p-4">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto space-y-6">
        <Header />
        <div className="grid md:grid-cols-2 gap-6">
          <TicketForm onTicketCreated={handleTicketCreated} />
          <TicketList key={refresh} />
        </div>
      </div>
    </div>
  );
}

export default App;
