function CodeAnalyzer({
    code,
    setCode,
    analyzeCode
}) {

    return (
        <>
            <textarea
                rows="15"
                cols="80"
                placeholder="Paste your Java code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />

            <br />
            <br />

            <button onClick={analyzeCode}>
                Analyze Code
            </button>
        </>
    );
}

export default CodeAnalyzer;