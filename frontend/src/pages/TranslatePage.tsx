import TranslateForm from "../components/TranslateForm"; // adjust path as needed

export default function TranslatePage() {
  // This function receives the form data from TranslateForm
  const handleFormSubmit = async (data: {
    source: string;
    file: File | null;
    sourceLang: string;
    targetLang: string;
  }) => {
    // send data to backend
    const formData = new FormData();
    formData.append("source", data.source);
    formData.append("file", data.file!);
    formData.append("sourceLang", data.sourceLang);
    formData.append("targetLang", data.targetLang);

    const response = await fetch(
      `${import.meta.env.VITE_TRANSLATE_API_URL}/api/translate`,
      {
        method: "POST",
        body: formData, // your FormData goes here
      },
    );

    // Parse JSON response
    const result = await response.json();
    console.log("Response from backend:", result);
  };

  return (
    <div>
      <h1>Translate Page</h1>
      <TranslateForm onSubmit={handleFormSubmit} />
    </div>
  );
}
