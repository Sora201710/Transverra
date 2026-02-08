import { useState } from "react";

export default function UploadPage() {
  const [url, setUrl] = useState("");
  const [context, setContext] = useState("");
  const [targetLang, setTargetLang] = useState("en");
  const [loading, setLoading] = useState(false);
  const [readerLink, setReaderLink] = useState("");

  async function handleGenerate() {
    setLoading(true);
    setReaderLink("");

    // Simulation for bare minimum demo:
    await new Promise((r) => setTimeout(r, 1500));
    const fakeId = Math.random().toString(36).slice(2, 9);
    setReaderLink(`/reader/${fakeId}`);

    setLoading(false);
  }

  return (
    <div>
      <div>
        <label>
          Novel link:
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
          />
        </label>
      </div>

      <div>
        <label>
          Additional context / instructions:
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            rows={4}
          />
        </label>
      </div>

      <div>
        <label>
          Target language:
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="auto">Auto-detect</option>
          </select>
        </label>
      </div>

      <div>
        <button
          onClick={handleGenerate}
          disabled={
            loading || !url // require either URL or file
          }
        >
          Generate
        </button>
      </div>

      <div>
        {loading && <div>Loading…</div>}
        {readerLink && (
          <div>
            <a href={readerLink}>{readerLink}</a>
          </div>
        )}
      </div>
    </div>
  );
}
