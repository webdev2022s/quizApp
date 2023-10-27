function Progress({ questions, index, points, answer }) {
  const totalPoints = questions.reduce((acc, cur) => acc + cur.points, 0);
  return (
    <header className="progress">
      <progress
        max={questions.length}
        value={index + Number(answer !== null)}
      />
      <p>
        {index + 1}/{questions.length} Questions
      </p>
      <p>
        {points}/ {totalPoints}
      </p>
    </header>
  );
}

export default Progress;
