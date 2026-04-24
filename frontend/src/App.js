import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "https://bajaj-bfhl-2-0e53.onrender.com/bfhl";

  const parseInput = () => {
    const text = input.trim();

    try {
      const parsed = JSON.parse(text);

      if (parsed.data && Array.isArray(parsed.data)) {
        return parsed.data.map(item =>
          item.replace(/\s+/g, "")
        );
      }
    } catch (e) {}

    return text
      .split("\n")
      .map(item => item.replace(/\s+/g, ""))
      .filter(item => item !== "");
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = parseInput();

      const response = await axios.post(API_URL, { data });

      setResult(response.data);
    } catch (err) {
      setError("Unable to connect to API.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <header className="hero">
        <h1>BFHL Hierarchy Analyzer</h1>
        <p>SRM Full Stack Engineering Challenge</p>
      </header>

      <div className="card">
        <label>Enter Relationships</label>

        <textarea
          rows="10"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`A -> B
A->C
B -> D

or JSON:

{
  "data": ["A->B","A->C"]
}`}
        />

        <button onClick={handleSubmit}>
          {loading ? "Processing..." : "Submit"}
        </button>

        {error && <p className="error">{error}</p>}
      </div>

      {result && (
        <div className="card">

          <h2>User Details</h2>
          <div className="box">
            <p><strong>User ID:</strong> {result.user_id}</p>
            <p><strong>Email:</strong> {result.email_id}</p>
            <p><strong>Roll Number:</strong> {result.college_roll_number}</p>
          </div>

          <h2>Summary</h2>
          <div className="summary">
            <div>
              <span>Total Trees</span>
              <strong>{result.summary.total_trees}</strong>
            </div>

            <div>
              <span>Total Cycles</span>
              <strong>{result.summary.total_cycles}</strong>
            </div>

            <div>
              <span>Largest Root</span>
              <strong>{result.summary.largest_tree_root || "-"}</strong>
            </div>
          </div>

          <h2>Hierarchies</h2>

          {result.hierarchies.map((item, index) => (
            <div className="box" key={index}>
              <p><strong>Root:</strong> {item.root}</p>

              {item.has_cycle ? (
                <p className="cycle">Cycle Detected</p>
              ) : (
                <p><strong>Depth:</strong> {item.depth}</p>
              )}

              <pre>{JSON.stringify(item.tree, null, 2)}</pre>
            </div>
          ))}

          <h2>Invalid Entries</h2>
          <div className="box">
            <pre>{JSON.stringify(result.invalid_entries, null, 2)}</pre>
          </div>

          <h2>Duplicate Edges</h2>
          <div className="box">
            <pre>{JSON.stringify(result.duplicate_edges, null, 2)}</pre>
          </div>

        </div>
      )}

      <footer>
        All rights reserved (Author : Prajash Kumar Patel)
      </footer>
    </div>
  );
}

export default App;