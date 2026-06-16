function SearchAndFilter({
    searchId,
    setSearchId,
    searchReview,
    filterDate,
    setFilterDate,
    filterReviewsByDate,
    loadReviews
}) {

    return (
        <>
            <br />
            <br />

            <input
                type="number"
                placeholder="Enter Review ID"
                value={searchId}
                onChange={(e) =>
                    setSearchId(e.target.value)
                }
            />

            <button onClick={searchReview}>
                Search
            </button>

            <br />
            <br />

            <input
                type="date"
                value={filterDate}
                onChange={(e) =>
                    setFilterDate(e.target.value)
                }
            />

            <button onClick={filterReviewsByDate}>
                Filter
            </button>

            <button onClick={loadReviews}>
                Load All Reviews
            </button>
        </>
    );
}

export default SearchAndFilter;