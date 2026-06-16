function ReviewHistory({
    reviews,
    viewReview,
    deleteReview,
    downloadPdf
}) {

    if (reviews.length === 0) {
        return null;
    }

    return (
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
                        <th>View</th>
                        <th>Delete</th>
                        <th>PDF</th>
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

                            <td>
                                <button
                                    onClick={() =>
                                        viewReview(review.id)
                                    }
                                >
                                    View
                                </button>
                            </td>

                            <td>
                                <button
                                    onClick={() =>
                                        deleteReview(review.id)
                                    }
                                >
                                    Delete
                                </button>
                            </td>

                            <td>
                                <button
                                    onClick={() =>
                                        downloadPdf(review.id)
                                    }
                                >
                                    PDF
                                </button>
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default ReviewHistory;