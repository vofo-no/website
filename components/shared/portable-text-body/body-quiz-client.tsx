"use client";

import { useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { RotateCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const storage = createJSONStorage<Record<string, string>>(() => sessionStorage);
const quizAnswers = atomWithStorage("quizAnswers", {}, storage);

export function BodyQuizClient({
  question,
  choices,
}: {
  question: string;
  choices: { title: string; isCorrect: boolean }[];
}) {
  const [answers, setAnswer] = useAtom(quizAnswers);

  function choose(choice: string) {
    setAnswer((prevState) => ({ ...prevState, [question]: choice }));
  }

  function reset() {
    setAnswer(({ [question]: x, ...prevState }) => prevState);
  }

  const given = choices.find((c) => c.title === answers[question]);

  return (
    <Card className="not-prose">
      <CardHeader>
        <CardDescription>Spørsmål</CardDescription>
        <CardTitle>{question}</CardTitle>
      </CardHeader>
      <CardContent>
        {given ? (
          <div className="flex flex-col gap-4">
            <p>
              Du svarte: <em>{given.title}</em>
            </p>
            <p>
              {given.isCorrect ? `🤩 Riktig!` : `😬 Feil. Vil du prøve igjen?`}
            </p>
            {!given.isCorrect && (
              <div>
                <Button variant="outline" onClick={reset}>
                  <RotateCcwIcon className="mr-2" />
                  Prøv igjen
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {choices.map((c) => (
              <Button
                key={c.title}
                variant="outline"
                className="whitespace-normal h-auto"
                onClick={() => choose(c.title)}
              >
                {c.title}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
