import { useState } from "react";
import api from "./services/api";

function App() {

  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);

  const analyzeCode = async () => {
  try {
    const response = await api.post("/api/code-review", {
      code: code
    });

    setResult(response.data);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div>
      <h1>Smart Code Review Assistant</h1>

      <textarea
        rows="15"
        cols="80"
        placeholder="Paste your Java code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>

      <br />
      <br />

      <button onClick={analyzeCode}>Analyze Code</button>

    {result && (
  <div>
    <h2>Analysis Result</h2>

    <p>Score: {result.score}</p>

    <p>
      Number Of Issues: {result.numberOfIssues}
    </p>

    <p>
      Complexity Level: {result.complexityLevel}
    </p>

    {result.issues.map((issue, index) => (
  <div key={index}>
    <h4>{issue.rule}</h4>

    <p>{issue.message}</p>

    <p>{issue.suggestion}</p>

    <p>{issue.severity}</p>

    <hr />
  </div>
))}
  </div>
  
)}

    </div>
  );
}

export default App;