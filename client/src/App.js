import React from "react";
import TicketForm from "./TicketForm";
import TicketList from "./TicketList";

function App() {
  const [refresh, setRefresh] = React.useState(false);

  return (
    <div className="App">
      <h1>Smart Helpdesk</h1>
      <TicketForm onTicketCreated={() => setRefresh(!refresh)} />
      <TicketList key={refresh} />
    </div>
  );
}

export default App;
