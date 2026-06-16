import { useState, useEffect } from "react";
import api from "./services/api";
import Dashboard from "./components/Dashboard";
import CodeAnalyzer from "./components/CodeAnalyzer";
import SearchAndFilter from "./components/SearchAndFilter";
import ReviewDetails from "./components/ReviewDetails";
import ReviewHistory from "./components/ReviewHistory";
import AnalysisResult from "./components/AnalysisResult";

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

const downloadPdf = (id) => {
  window.open(
    `http://localhost:8080/api/reviews/${id}/pdf`,
    "_blank"
  );
};

useEffect(() => {
 loadReviews();
 loadDashboardStats();
},[])

  return (
    <div className="container">
      <h1>Smart Code Review Assistant</h1>

    <Dashboard dashboardStats={dashboardStats}/>

    <CodeAnalyzer 
          code={code} 
          setCode={setCode} 
          analyzeCode={analyzeCode}
    />

    <SearchAndFilter
          searchId={searchId}
          setSearchId={setSearchId}
          searchReview={searchReview}
          filterDate={filterDate}
          setFilterDate={setFilterDate}
          filterReviewsByDate={filterReviewsByDate}
          loadReviews={loadReviews}
    />

<AnalysisResult result={result}/>

<ReviewDetails selectedReview={selectedReview}/>

<ReviewHistory 
     reviews={reviews}
     viewReview={viewReview}
     deleteReview={deleteReview}
     downloadPdf={downloadPdf}
/>

    </div>
  );
}

export default App;