import { useMemo, useState } from "react";
import { useLoaderData } from "react-router";

// TODO: add this chapter to a typings folder or something.
// TODO: Organize the code base so it's less of a mess

interface Chapter {
  _Chapter__title: string;
  _Chapter__content: string;
}

export default function NovelPage() {
  // Assume this comes from your backend / storage / props
  const novel = useLoaderData();
  const chapters = novel._Novel__chapters;

  const [index, setIndex] = useState(0);

  const current = chapters[index] ?? { title: "", text: "" };

  function prev() {
    setIndex((i) => Math.max(0, i - 1));
  }

  function next() {
    setIndex((i) => Math.min(chapters.length - 1, i + 1));
  }

  return (
    <div>
      <div>
        <label>
          Chapter:
          <select
            value={index}
            onChange={(e) => setIndex(Number(e.target.value))}
          >
            {chapters.map((c: Chapter, i: number) => (
              <option key={i} value={i}>
                {c._Chapter__title ?? `Chapter ${i + 1}`}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <h2>{current._Chapter__title}</h2>
        <pre>{current._Chapter__content}</pre>
      </div>

      <div>
        <button onClick={prev} disabled={index === 0}>
          Previous
        </button>
        <button onClick={next} disabled={index === chapters.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
}
