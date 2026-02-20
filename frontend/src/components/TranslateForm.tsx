import { useState } from "react";
// TODO: this should use use-form from mantine

// -------------------- Types --------------------
interface FormData {
  source: string;
  file: File | null;
  sourceLang: string;
  targetLang: string;
}

interface SubmitButtonProps {
  onClick: () => void;
  disabled: boolean;
}

interface FormFieldsProps {
  sources: string[];
  languages: string[];
  targetLanguages: string[];
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

interface TranslateFormProps {
  onSubmit: (data: FormData) => void;
}

// -------------------- Submit Button --------------------
function SubmitButton({ onClick, disabled }: SubmitButtonProps) {
  return (
    <div>
      <button onClick={onClick} disabled={disabled}>
        Generate
      </button>
    </div>
  );
}

// -------------------- Form Fields --------------------
function FormFields({
  sources,
  languages,
  targetLanguages,
  formData,
  setFormData,
}: FormFieldsProps) {
  return (
    <div>
      {/* Novel Source */}
      <div>
        <label>
          Novel Source:
          <select
            value={formData.source}
            onChange={(e) =>
              setFormData({ ...formData, source: e.target.value })
            }
          >
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* File upload */}
      <div>
        <label>
          File:
          <input
            type="file"
            onChange={(e) =>
              setFormData({ ...formData, file: e.target.files?.[0] ?? null })
            }
          />
        </label>
      </div>

      {/* Source language */}
      <div>
        <label>
          Source Language:
          <select
            value={formData.sourceLang}
            onChange={(e) =>
              setFormData({ ...formData, sourceLang: e.target.value })
            }
          >
            {languages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Target language */}
      <div>
        <label>
          Target Language:
          <select
            value={formData.targetLang}
            onChange={(e) =>
              setFormData({ ...formData, targetLang: e.target.value })
            }
          >
            {targetLanguages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

// -------------------- Translate Form --------------------
export default function TranslateForm({ onSubmit }: TranslateFormProps) {
  const [formData, setFormData] = useState<FormData>({
    source: "Archive Of Our Own",
    file: null,
    sourceLang: "auto",
    targetLang: "en",
  });

  const sources = ["Archive Of Our Own"];
  const languages = ["auto", "en", "es"];
  const targetLanguages = ["en", "es"];

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const isDisabled = !formData.file; // require file for now

  return (
    <div>
      <FormFields
        sources={sources}
        languages={languages}
        targetLanguages={targetLanguages}
        formData={formData}
        setFormData={setFormData}
      />
      <SubmitButton onClick={handleSubmit} disabled={isDisabled} />
    </div>
  );
}
