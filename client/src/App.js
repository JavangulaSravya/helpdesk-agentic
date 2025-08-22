import React, { useState } from "react";
import TicketForm from "./TicketForm";
import TicketList from "./TicketList";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="App">
      <TicketForm onTicketCreated={() => setRefresh(!refresh)} />
      <TicketList key={refresh} />
    </div>
  );
}

export default App;
