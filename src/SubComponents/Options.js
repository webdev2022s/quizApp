function Options({ options, answer, dispatch, correctOption, index }) {
  const hasAnswered = answer[index] !== undefined;

  return (
    <>
      <div className="options">
        {options.map((data, i) => (
          <button
            className={`${
              i === answer[index] ? "btn btn-option answer" : "btn btn-option"
            } ${
              hasAnswered ? (i === correctOption ? "correct" : "wrong") : null
            }`}
            key={data}
            onClick={() => dispatch({ type: "newAnswer", payload: i })}
            disabled={hasAnswered}
          >
            {data}
          </button>
        ))}
      </div>
    </>
  );
}

export default Options;
