import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../../data";
function Quiz() {
  let [index, setindex] = useState(0);
  let [question, setquestion] = useState(data[index]);
  let [lock, setlock] = useState(false);
  let [score, setscore] = useState(0);
  let [result, setresult] = useState(false);
  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);
  let option_array = [option1, option2, option3, option4];
  function Checkanswer(e, ans) {
    if (lock === false) {
      if (question.ans === ans) {
        console.log(question.ans);
        console.log(ans);
        e.target.classList.add("correct");
        setlock(true);
        setscore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setlock(true);
        // ans = 4;
        // arr.len-1 
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  }
  const next = () => {
    console.log("clicked");
    if (lock === true) {
      if (index === data.length - 1) {
        setresult(true);
        return 0;
      }
      setindex(++index);
      setquestion(data[index]);
      setlock(false);
      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };
  function Reset() {
    location.reload();
  }
  return (
    <div className="container">
      <h1>Quiz app</h1>
      <hr />
      {result ? (
        <>
          <div
            style={{
              margin: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>
              your score is : {score} out of {data.length}
            </h2>
            <button onClick={Reset}>Reset</button>
          </div>
        </>
      ) : (
        <>
          {" "}
          <h2>
            {index + 1}.{question.question}
          </h2>
          <ul>
            <li
              ref={option1}
              onClick={(e) => {
                Checkanswer(e, 1);
              }}
            >
              {question.option1}
            </li>
            <li
              ref={option2}
              onClick={(e) => {
                Checkanswer(e, 2);
              }}
            >
              {question.option2}
            </li>
            <li
              ref={option3}
              onClick={(e) => {
                Checkanswer(e, 3);
              }}
            >
              {question.option3}
            </li>
            <li
              ref={option4}
              onClick={(e) => {
                Checkanswer(e, 4);
              }}
            >
              {question.option4}
            </li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {data.length} question
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
