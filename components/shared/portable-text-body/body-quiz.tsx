import { BodyQuizClient } from "./body-quiz-client";

export const BodyQuiz = ({
  value,
}: {
  value: { question: string; choices: { title: string; isCorrect: boolean }[] };
}) => {
  return <BodyQuizClient {...value} />;
};
