import { useState, useEffect } from "react";
import api from "./services/api";

function App() {

  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [dashboardStats, setDashboardStats] = useState(null);

  const analyzeCode = async () => {
  try {
    const response = await api.post("/api/reviews/code-review", {
      code: code
    });

    setResult(response.data);
    loadDashboardStats();
    loadReviews();
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

const viewReview = async (id) => {
  try {
    const response = await api.get(`/api/reviews/${id}`);
    setSelectedReview(response.data);
  } catch (error) {
    console.error(error);
  }
};

const deleteReview = async (id) => {

  const confirmed = window.confirm("Are you sure you want to delete this review?");

  if(!confirmed){
    return;
  }

  try {
    await api.delete(`/api/reviews/${id}`);

    setReviews(
      reviews.filter((review) => review.id !== id)
    );
    loadDashboardStats();

  } catch (error) {
    console.error(error);
  }
};

const searchReview = async () => {
  try {

    const response = await api.get(
      `/api/reviews/${searchId}`
    );

    setSelectedReview(response.data);

  } catch (error) {
    console.error(error);
  }
};

const filterReviewsByDate = async () => {
  try {

    const response = await api.get(
      `/api/reviews/date/${filterDate}`
    );

    setReviews(response.data);

  } catch (error) {
    console.error(error);
  }
};

const loadDashboardStats = async () => {
  try {

    const response = await api.get(
      "/api/reviews/dashboard"
    );

    setDashboardStats(response.data);

  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
 loadReviews();
 loadDashboardStats();
},[])

  return (
    <div className="container">
      <h1>Smart Code Review Assistant</h1>

      {dashboardStats && (
  <div className="dashboard">

    <div className="result-card">
      <h3>Total Reviews</h3>
      <p>{dashboardStats.totalReviews}</p>
    </div>

    <div className="result-card">
      <h3>Average Score</h3>
      <p>{dashboardStats.averageScore.toFixed(2)}</p>
    </div>

    <div className="result-card">
      <h3>Total Issues</h3>
      <p>{dashboardStats.totalIssues}</p>
    </div>

  </div>
)}

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

        <br />
        <br />
       
       <input
  type="number"
  placeholder="Enter Review ID"
  value={searchId}
  onChange={(e) => setSearchId(e.target.value)}
/>

<button onClick={searchReview}>
  Search
</button>

       <br />
       <br />

       <input
  type="date"
  value={filterDate}
  onChange={(e) => setFilterDate(e.target.value)}
/>

<button onClick={filterReviewsByDate}>
  Filter
</button>

<button onClick={loadReviews}>
  Load All Reviews
</button>

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

    <h3>{issue.rule || issue.ruleName}</h3>

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
  </div> 
  
)}

{selectedReview && (
  <div className="result-card">
    <h2>Review Details</h2>

    <p>ID: {selectedReview.id}</p>
    <p>Score: {selectedReview.score}</p>
    <p>Issues: {selectedReview.numberOfIssues}</p>
    <p>Complexity: {selectedReview.complexityLevel}</p>
    <p>Date: {selectedReview.reviewDate}</p>

    <h3>Source Code</h3>

    <pre>{selectedReview.code}</pre>

    <h3>Detected Issues</h3>

{selectedReview.issues.map((issue, index) => (
  <div className="issue-card" key={index}>

    <h4>{issue.rule || issue.ruleName}</h4>

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

  </div>
)}


{reviews.length > 0 && (
  <div className="result-card">
   <h2>Review History</h2>

    <table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Score</th>
      <th>Issues</th>
      <th>Complexity</th>
      <th>Date</th>
      <th>Action</th>
      <th>Delete</th>
    </tr>
  </thead>

  <tbody>
    {reviews.map((review) => (
      <tr key={review.id}>
        <td>{review.id}</td>
        <td>{review.score}</td>
        <td>{review.numberOfIssues}</td>
        <td>{review.complexityLevel}</td>
        <td>{review.reviewDate}</td>
        <td><button onClick={() => viewReview(review.id)}>View</button></td>
        <td><button onClick={() => deleteReview(review.id)}>Delete</button></td>
      </tr>
    ))}
  </tbody>
</table>


  </div>
)}

    </div>
  );
}

export default App;