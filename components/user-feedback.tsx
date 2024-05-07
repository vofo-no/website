"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics/react";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";

export function UserFeedback() {
  const path = usePathname();
  const [tracked, setTracked] = useState(false);
  const [open, setOpen] = useState(false);
  const [found, setFound] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    setTracked(false);
    setFound("");
    setFeedback("");
  }, [path]);

  if (path === "/") return null;

  if (tracked)
    return (
      <aside className="container flex flex-col items-center mt-12 mb-6">
        <h2 className="text-lg font-semibold">🤩 Takk for tilbakemeldingen!</h2>
      </aside>
    );

  return (
    <aside
      role="form"
      className="container flex flex-col items-center mt-12 mb-6 gap-4"
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <h2 className="text-lg font-semibold">Fant du det du lette etter?</h2>
        <div className="flex items-start gap-4">
          <DialogTrigger asChild>
            <Button size="lg" variant="outline" onClick={() => setFound("Ja")}>
              Ja
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button size="lg" variant="outline" onClick={() => setFound("Nei")}>
              Nei
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent className="sm:max-w-[425px]">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              track(found === "Ja" ? "Feedback Found" : "Feedback Not Found", {
                message: feedback.substring(0, 255),
              });
              setTracked(true);
              setOpen(false);
            }}
          >
            <DialogHeader>
              <DialogTitle>Tilbakemeldingskjema</DialogTitle>
              <DialogDescription>
                Takk for at du hjelper oss å lage et bedre nettsted!
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="user-feedback-message">
                  {found === "Ja"
                    ? "Hva lette du etter?"
                    : "Har du forslag til forbedringer?"}
                </Label>
                <Textarea
                  id="user-feedback-message"
                  maxLength={250}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Skriv tilbakemeldingen din her. Ikke oppgi personlig informasjon. Maksimalt 250 tegn."
                />
              </div>
              <RadioGroup value={found} onValueChange={setFound}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Ja" id="user-feedback-found" />
                  <Label htmlFor="user-feedback-found">
                    👍 Du fant det du lette etter
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Nei" id="user-feedback-not-found" />
                  <Label htmlFor="user-feedback-not-found">
                    😢 Du fant IKKE det du lette etter
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <DialogFooter>
              <p className="text-sm text-muted-foreground self-center">
                Tilbakemeldingen blir ikke besvart.
              </p>
              <Button type="submit">Send</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </aside>
  );
}
