function ReviewDetails({ selectedReview }) {

    if (!selectedReview) {
        return null;
    }

    return (
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

                    <h4>
                        {issue.rule || issue.ruleName}
                    </h4>

                    <p>
                        <strong>Message:</strong>
                        {" "}
                        {issue.message}
                    </p>

                    <p>
                        <strong>Suggestion:</strong>
                        {" "}
                        {issue.suggestion}
                    </p>

                    <p>
                        <strong>Severity:</strong>

                        <span
                            className={
                                issue.severity.toLowerCase()
                            }
                        >
                            {" "}
                            {issue.severity}
                        </span>

                    </p>

                </div>

            ))}

        </div>
    );
}

export default ReviewDetails;