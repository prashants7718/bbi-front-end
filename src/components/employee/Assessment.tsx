import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { getSpecificTest } from "../../service/testsService";
import {
  calculateScore,
  getAllUserTests,
  getSpecificUserTest,
  pushSubmissionToUserTest,
  updateUserTestStatus,
} from "../../service/userTestService";
import { UserTest } from "../../types/userTest";
import Layout from "../layout/Layout";

const Assessment = () => {
  const location = useLocation();
  const { allocatedTime } = location.state || { allocatedTime: 0 };
  const { testName } = useParams<{ testName: string }>();
  const { userName } = useUserContext();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<{ [key: number]: string }>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isAnswerSavedArray, setIsAnswerSavedArray] = useState<boolean[]>(
    new Array(questions.length).fill(false)
  );
  // const [score, setScore] = useState<number>(() => {
  //   const savedScore = Cookies.get(`${testName}-score`);
  //   return savedScore ? parseInt(savedScore) : 0;
  // });
  const [userTestData, setUserTestData] = useState<UserTest[] | null>(null);

  const getUserTestsDetails = async () => {
    const result = await getAllUserTests(userName);
    setUserTestData(result);
  };
  // const timeRemainingString =
  //   userTestData?.find((test) => test.testname === testName)?.time_remaining ??
  //   "0 mins";
  // const timeInSeconds = parseInt(timeRemainingString) * 60;
  const [timeLeft, setTimeLeft] = useState(allocatedTime);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const getTestDataByName = async () => {
    if (!testName) {
      throw new Error("Test name is missing from the URL");
    }
    const result = await getSpecificTest(testName);
    const question = result.questions;
    setQuestions(question);
    const testFetched = await getSpecificUserTest(userName, testName);
    if (testFetched.userSubmission.length > 0) {
      setCurrentQuestionIndex(testFetched.userSubmission.length);
    }
    if (testFetched.time_remaining.seconds > -1) {
      setTimeLeft(testFetched.time_remaining.seconds);
    } else {
      setTimeLeft(result.allocated_time);
    }
  };

  useEffect(() => {
    getTestDataByName();
    getUserTestsDetails();
  }, []);
  useEffect(() => {
    if (timeLeft === 0) {
      setIsTimeUp(true);
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
      // setTimeRemained(seconds)
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  // useEffect(() => {
  //   const savedScore = Cookies.get(`${testName}-score`);
  //   if (!savedScore) {
  //     setScore(0);
  //     Cookies.set(`${testName}-score`, "0");
  //   }
  // }, [testName]);

  // useEffect(() => {
  //   Cookies.set(`${testName}-score`, score.toString());
  // }, [score, testName]);
  const handleTimeUpDialogClose = () => {
    setIsTimeUp(false);
    navigate("/employee/dashboard");
  };

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

  const handleAnswerChange = (newAnswer: string) => {
    setSelectedAnswer(newAnswer);

    const updatedAnswerSavedArray = [...isAnswerSavedArray];
    updatedAnswerSavedArray[currentQuestionIndex] = false;
    setIsAnswerSavedArray(updatedAnswerSavedArray);
  };
  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      const cq = questions.find(
        (question) => question.text === currentQuestion.text
      );
      let isCorrect = false;

      if (cq && cq.answer === selectedAnswer) {
        isCorrect = true;
      }
      const submission = {
        questionText: currentQuestion.text,
        options: currentQuestion.options,
        correctAnswer: currentQuestion.answer,
        userAnswer: selectedAnswer,
        isCorrect: isCorrect,
      };
      const result = await pushSubmissionToUserTest(
        userName,
        testName,
        submission,
        timeLeft
      );
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer("");
    } else {
      const cq = questions.find(
        (question) => question.text === currentQuestion.text
      );
      let isCorrect = false;

      if (cq && cq.answer === selectedAnswer) {
        isCorrect = true;
      }

      const submission = {
        questionText: currentQuestion.text,
        options: currentQuestion.options,
        correctAnswer: currentQuestion.answer,
        userAnswer: selectedAnswer,
        isCorrect: isCorrect,
      };
      await pushSubmissionToUserTest(userName, testName, submission, timeLeft);
      await updateUserTestStatus(userName, testName, "Completed");
      await calculateScore(userName, testName);
      navigate("/employee/dashboard");
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
      <div className="flex-1 justify-start bg-white shadow-bbiCardShadow rounded-md h-full/2 p-6">
        <div className="w-full">
          <div className="rounded-8 mb-4 p-4 bg-grayBackground rounded-lg">
            <div className="flex justify-between gap-4 items-center">
              <h2 className="text-xl font-semibold text-textBlack">
                {testName} Test
              </h2>
              <div className="flex items-center min-w-24 gap-1 bg-secondaryPink px-3 py-1 rounded-full">
                <i className="ri-time-line text-2xl text-textBlack"></i>
                <span className="font-semibold text-textBlack">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
            <div className="relative h-12 flex items-center mt-6">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4 mt-4">
                <div
                  className="bg-secondaryPink h-2 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm font-medium text-textGray text-start mb-1 flex justify-between absolute top-0 left-0 -mt-2">
                {completedQuestions} Question
                {completedQuestions !== 1 ? "s" : ""} completed
              </p>
              <div className="flex justify-between absolute top-0 right-0 -mt-2">
                <p className="text-sm font-medium text-textGray">
                  Question {currentQuestionIndex + 1} of {totalQuestions} (1.00
                  Marks)
                </p>
              </div>
            </div>
          </div>
          <p className="mb-6 text-xl font-semibold text-textGray">
            {currentQuestion.text}
          </p>
          <div className="flex flex-col space-y-4">
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className="flex items-center space-x-3 capitalize cursor-pointer"
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="form-radio text-red-800"
                />
                <span className="text-textGray">{option}</span>
              </label>
            ))}
          </div>
          <hr className="my-6 border-gray-200" />
          <div className="flex mt-4 space-x-3">
            <button
              onClick={handleSave}
              disabled={
                !selectedAnswer || isAnswerSavedArray[currentQuestionIndex]
              }
              className={`px-6 py-1 h-9 rounded ${
                !selectedAnswer || isAnswerSavedArray[currentQuestionIndex]
                  ? "bg-secondaryPink text-textBlack opacity-50 cursor-not-allowed"
                  : "bg-secondaryPink text-textBlack hover:bg-secondaryPink"
              }`}
            >
              Save Answer
            </button>
            <button
              onClick={() => handleNext()}
              disabled={!isAnswerSavedArray[currentQuestionIndex]}
              className={`px-6 py-1 h-9 rounded ${
                !isAnswerSavedArray[currentQuestionIndex]
                  ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                  : "bg-secondaryPink text-textBlack hover:bg-secondaryPink"
              }`}
            >
              {currentQuestionIndex === questions.length - 1
                ? "Finish Test"
                : "Next"}
            </button>
          </div>
        </div>
      </div>
      {isTimeUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl text-center font-bold mb-4">Time is Up!</h2>
            <p className="mb-4">You have run out of time.</p>
            <div className="flex justify-center">
              <button
                onClick={handleTimeUpDialogClose}
                className="px-4 py-1 bg-primaryBlue text-textBlack rounded "
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Assessment;
