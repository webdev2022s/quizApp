import Options from "../SubComponents/Options";
function Question({ questions, answer, dispatch, index }) {
  const { question, options, correctOption } = questions;
  return (
    <div>
      <h4>{question}</h4>
      <Options
        options={options}
        answer={answer}
        dispatch={dispatch}
        correctOption={correctOption}
        index={index}
      />
    </div>
  );
}

export default Question;
