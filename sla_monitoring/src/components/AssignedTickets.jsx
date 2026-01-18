function AssignTickets() {
  return (
    <div className="team-tickets">
      <h2>Assign Ticket</h2>

      <select>
        <option>Select Ticket</option>
        <option>Ticket #1</option>
        <option>Ticket #2</option>
      </select>

      <select>
        <option>Assign To</option>
        <option>Support Team</option>
        <option>Manager Team</option>
      </select>

      <button>Assign</button>
    </div>
  );
}

export default AssignTickets;
