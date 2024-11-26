import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { Questionnaire } from "../../constant/questions";
import { testData } from "./EmployeeDashboard";

const OPTIONS = ["Positive", "Negative", "Neutral"];

const Assessment = () => {
  const { testName } = useParams<{ testName: string }>();
  const navigate = useNavigate();
  const questions = Questionnaire[testName as keyof typeof Questionnaire] || [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<{ [key: number]: string }>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [isAnswerSavedArray, setIsAnswerSavedArray] = useState<boolean[]>(
    new Array(questions.length).fill(false)
  );
  const timeRemainingString =
    testData.find((test) => test.name === testName)?.timeRemaining ?? "0 mins";
  const timeInSeconds = parseInt(timeRemainingString) * 60;
  const [timeLeft, setTimeLeft] = useState(timeInSeconds);

  useEffect(() => {
    if (timeLeft === 0) {
      alert("Time is Up!");
      navigate("/dashboard");
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const handleSave = () => {
    if (!selectedAnswer) {
      alert("Please select an answer before saving.");
      return;
    }
    const currentQuestion = questions[currentQuestionIndex];
    if (
      (selectedAnswer === "Positive" && currentQuestion.value === "+") ||
      (selectedAnswer === "Negative" && currentQuestion.value === "-")
    ) {
      setScore((prevScore) => prevScore + 1);
    }
    setResponses({ ...responses, [currentQuestionIndex]: selectedAnswer });
    const updatedAnswerSavedArray = [...isAnswerSavedArray];
    updatedAnswerSavedArray[currentQuestionIndex] = true;
    setIsAnswerSavedArray(updatedAnswerSavedArray);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer("");
    } else {
      // alert(`Test completed! Your final score is ${score}.`);
      navigate("/available-tests");
    }
  };

  if (!questions.length) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Invalid Test Name or No Questions Found!
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const completedQuestions = currentQuestionIndex;
  const progressPercentage = (completedQuestions / totalQuestions) * 100;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds}`;
  };
  return (
    <Layout hideSidebar>
      <div className="flex justify-start bg-gray-100 shadow-lg rounded-md h-full/2 pt-4 pl-6 pr-6 pb-4">
        <div className="w-full m-8">
          <h2 className="text-2xl font-bold text-primaryBlue mb-4 text-left">
            {testName} Test
          </h2>
          <div className="flex justify-between">
            <p className="text-base font-medium text-gray-700 mb-4">
              Question {currentQuestionIndex + 1} of {totalQuestions} (1.00
              Marks)
            </p>
            <p>{formatTime(timeLeft)}</p>
          </div>
          <p className="text-sm text-gray-600 text-start mb-1">
            {completedQuestions} Question{completedQuestions !== 1 ? "s" : ""}{" "}
            completed
          </p>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-primaryBlue h-4 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="mb-6 text-2xl font-bold text-gray-800">
            {currentQuestion.question}
          </p>
          <div className="flex flex-col space-y-4">
            {OPTIONS.map((option, index) => (
              <label key={index} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="form-radio text-red-800"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
          <div className="flex mt-4 space-x-3">
            <button
              onClick={handleSave}
              disabled={isAnswerSavedArray[currentQuestionIndex]}
              className={`px-4 py-2 rounded font-bold ${
                isAnswerSavedArray[currentQuestionIndex]
                  ? "bg-green-400 text-white"
                  : "bg-secondaryPink text-white hover:bg-secondaryPink"
              }`}
            >
              {isAnswerSavedArray[currentQuestionIndex]
                ? "Saved"
                : "Save Answer"}
            </button>
            <button
              onClick={() => handleNext()}
              disabled={!isAnswerSavedArray[currentQuestionIndex]}
              className={`px-4 py-1 rounded font-bold ${
                !isAnswerSavedArray[currentQuestionIndex]
                  ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                  : "bg-primaryBlue text-white hover:bg-primaryBlue"
              }`}
            >
              {currentQuestionIndex === questions.length - 1
                ? "Finish Test"
                : "Next"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Assessment;
