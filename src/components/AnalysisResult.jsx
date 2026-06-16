function AnalysisResult({ result }) {

    if (!result) {
        return null;
    }

    return (
        <div>

            <h2>Analysis Result</h2>

            <p>
                Score: {result.score}
            </p>

            <p>
                Number Of Issues:
                {" "}
                {result.numberOfIssues}
            </p>

            <p>
                Complexity Level:
                {" "}
                {result.complexityLevel}
            </p>

            {result.issues.map((issue, index) => (

                <div
                    className="issue-card"
                    key={index}
                >

                    <h3>
                        {issue.rule || issue.ruleName}
                    </h3>

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

export default AnalysisResult;