function GameMode({ difficulty, dispatch }) {
  return (
    <div>
      <div className="btn">
        <label htmlFor="level"> Select Difficulty: </label>
        <select
          id="level"
          value={difficulty}
          onChange={(e) =>
            dispatch({
              type: "levelEntry",
              payload: e.target.value,
            })
          }
        >
          <option value=""></option>
          <option value="HARD">HARD</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="EASY">EASY</option>
        </select>
      </div>
    </div>
  );
}

export default GameMode;
