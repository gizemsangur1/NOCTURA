"use client";
import { useEffect, useState } from "react";

export default function TypingText({ text = "" }: { text?: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;

    const interval = setInterval(() => {
      if (i+1 >= text.length) {
        clearInterval(interval);
        return;
      }

      setDisplayed((prev) => prev + text[i]);
      i++;
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayed}</span>;
}
