export interface UserSubmission {
  _id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
}

export interface UserTest {
  _id: string;
  username: string;
  testname: string;
  status: string;
  score: number | null;
  userSubmission: UserSubmission[];
  __v: number;
  time_remaining: {
    seconds: number;
  };
}
