function Finished({ points, questions, highScored, dispatch }) {
  const totalPoints = questions.reduce((acc, cur) => acc + cur.points, 0);
  const percentage = (points / totalPoints) * 100;
  return (
    <>
      <p className="result">
        You Scored {points} out of {totalPoints} ({Math.ceil(percentage)}%)
      </p>

      <p className="highscore">High-Scored {highScored}</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default Finished;
