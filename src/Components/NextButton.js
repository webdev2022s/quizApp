function NextButton({ answer, dispatch, questions, index }) {
  const nextBtn = answer[index] !== undefined;

  return (
    <div>
      {nextBtn && index < questions.length - 1 && (
        <Button
          label="Next"
          clickFunction={() => dispatch({ type: "nextQuestions" })}
          className="btn btn-ui"
        />
      )}

      {index === questions.length - 1 && (
        <Button
          label="Finished"
          clickFunction={() => dispatch({ type: "finished" })}
          className="btn btn-ui"
        />
      )}
      {index > 0 && (
        <Button
          label="Previous"
          className="btn"
          clickFunction={() => dispatch({ type: "previousQuestion" })}
        />
      )}
    </div>
  );
}

export default NextButton;

function Button({ label = "click", clickFunction, className }) {
  return (
    <>
      <button className={className} onClick={clickFunction}>
        {" "}
        {label}
      </button>
    </>
  );
}
