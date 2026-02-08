import { useMemo, useState } from "react";

export default function ReaderPage() {
  // Assume this comes from your backend / storage / props
  const chapters = useMemo(
    () => [
      { title: "Chapter 1", text: "Chapter 1 text...\n\nMore text..." },
      { title: "Chapter 2", text: "Chapter 2 text...\n\nMore text..." },
      { title: "Chapter 3", text: "Chapter 3 text...\n\nMore text..." },
    ],
    [],
  );

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
            {chapters.map((c, i) => (
              <option key={i} value={i}>
                {c.title ?? `Chapter ${i + 1}`}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <h2>{current.title}</h2>
        <pre>{current.text}</pre>
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
