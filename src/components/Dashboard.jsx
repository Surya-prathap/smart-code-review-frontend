function Dashboard({ dashboardStats }) {

    if (!dashboardStats) {
        return null;
    }

    return (
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
    );
}

export default Dashboard;