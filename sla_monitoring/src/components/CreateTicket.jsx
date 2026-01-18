import { useState } from "react";

function CreateTicket({ user, onTicketCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [domain, setDomain] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!title || !description || !priority || !domain) {
      alert("Please fill in all fields!");
      return;
    }

    setIsSubmitting(true);

    const ticketData = {
      title: title,
      description: description,
      priority: priority,
      domain: domain.toUpperCase(),
      createdBy: user.name, // Body-layum irukkum
      status: "Open"
    };

    try {
      // THE FIX: URL-la `userName` parameter-ah add pannalaam
      const response = await fetch(`http://localhost:8080/api/tickets?userName=${user.name}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketData),
      });

      if (response.ok) {
        const savedTicket = await response.json();
        alert(`Ticket Created! Assigned to: ${savedTicket.assignedTo || "Manager"}`);
        
        setTitle("");
        setDescription("");
        setPriority("");
        setDomain("");

        if (onTicketCreated) onTicketCreated();
      } else {
        const errorText = await response.text();
        console.error("Backend Error Response:", errorText);
        alert(`Failed to create ticket. Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Network error! Check if backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Create New Ticket</h2>
      <div className="form-group">
        <input style={{ width: "100%", padding: "10px", marginBottom: "10px" }} placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea style={{ width: "100%", padding: "10px", minHeight: "100px", marginBottom: "10px" }} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <select style={{ width: "100%", padding: "10px", marginBottom: "10px" }} value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select style={{ width: "100%", padding: "10px", marginBottom: "20px" }} value={domain} onChange={(e) => setDomain(e.target.value)}>
          <option value="">Select Domain</option>
          <option value="network">Network</option>
          <option value="software">Software</option>
          <option value="hardware">Hardware</option>
          <option value="database">Database</option>
        </select>
        <button onClick={handleSubmit} disabled={isSubmitting} style={{ width: "100%", padding: "12px", background: "#3498db", color: "white", border: "none", cursor: isSubmitting ? "not-allowed" : "pointer" }}>
          {isSubmitting ? "Submitting..." : "Submit Ticket"}
        </button>
      </div>
    </div>
  );
}

export default CreateTicket;