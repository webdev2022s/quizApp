import GameMode from "./GameMode";

function Ready({ questions, dispatch, difficulty }) {
  return (
    <div className="start">
      <h2>Welcome To React Quiz!</h2>
      <h3>
        {difficulty === "HARD"
          ? questions.length
          : questions.filter((data) => data.difficulty === difficulty)
              .length}{" "}
        question to test your React mastery
      </h3>

      <GameMode difficulty={difficulty} dispatch={dispatch} />
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        let's Start
      </button>
    </div>
  );
}

export default Ready;
