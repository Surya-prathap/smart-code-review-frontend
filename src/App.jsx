import { useState } from "react";
import api from "./services/api";

function App() {

  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [reviews, setReviews] = useState([]);

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

const loadReviews = async () => {
  try {
    const response = await api.get("/api/reviews");
    setReviews(response.data);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="container">
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

      <button onClick={loadReviews}>Load Review History</button>

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
  <div className="issue-card" key={index}>

    <h3>{issue.rule}</h3>

    <p>
      <strong>Message:</strong> {issue.message}
    </p>

    <p>
      <strong>Suggestion:</strong> {issue.suggestion}
    </p>

    <p>
      <strong>Severity:</strong>
      <span className={issue.severity.toLowerCase()}>
        {" "}{issue.severity}
      </span>
    </p>

  </div>
))}
{reviews.length > 0 && (
  <div className="result-card">
    <h2>Review History</h2>

    {reviews.map((review) => (
      <div key={review.id}>
        <p>ID: {review.id}</p>
        <p>Score: {review.score}</p>
        <p>Issues: {review.numberOfIssues}</p>
        <p>Complexity: {review.complexityLevel}</p>
        <hr />
      </div>
    ))}
  </div>
)}
  </div>
  
  
)}

    </div>
  );
}

export default App;