import TranslateForm from "../components/TranslateForm";
import { useState, useEffect } from "react";

const POLL_INTERVAL = 3_000;

export default function TranslatePage() {
  const handleFormSubmit = async (data: {
    source: string;
    file: File | null;
    sourceLang: string;
    targetLang: string;
  }) => {
    const formData = new FormData();
    formData.append("source", data.source);
    formData.append("file", data.file!);
    formData.append("sourceLang", data.sourceLang);
    formData.append("targetLang", data.targetLang);

    let response = await fetch(
      `${import.meta.env.VITE_TRANSLATE_API_URL}/api/translate`,
      {
        method: "POST",
        body: formData,
      },
    );

    let result = await response.json();

    response = await fetch(
      `${import.meta.env.VITE_TRANSLATE_API_URL}/api/translate_status`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task_id: result.task_id }),
      },
    );

    result = await response.json();

    console.log("fetched task status");
    console.log(`${JSON.stringify(result)}`);

    set_task_result(result);
  };

  const [task_result, set_task_result] = useState({
    task_id: "",
    state: "",
    result: {},
  });
  // poll fastapi backend for task status
  useEffect(() => {
    if (task_result.task_id.length <= 0) return;

    let result = task_result;

    if (result.state == "SUCCESSFUL") {
      console.log("task is successful");
      console.log(result);
      const storeInDatabase = async () => {
        console.log("reached storeInDatabase");
        let response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/upload_novel`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(result.result),
          },
        );
        console.log("right before novel_res is resolved");
        let novel_res = await response.json();
        console.log("right after novel_res is resolved");
        // TODO: make page actually show link to novel
        console.log(`Novel inserted: ${JSON.stringify(novel_res)}`);
      };
      storeInDatabase();
      console.log("after storeInDatabase");
      return;
    }
    if (result.state == "FAILURE") {
      console.log("task is failure");
      return;
    }
    let interval: number;
    if (result.state == "STARTED") {
      console.log("Waiting for task to complete");
      interval = setInterval(async () => {
        let response = await fetch(
          `${import.meta.env.VITE_TRANSLATE_API_URL}/api/translate_status`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ task_id: task_result.task_id }),
          },
        );
        let result = await response.json();
        set_task_result(result);
      }, POLL_INTERVAL);
    }
    return () => {
      clearInterval(interval);
    };
  }, [task_result]);

  return (
    <div>
      <h1>Translate Page</h1>
      <TranslateForm onSubmit={handleFormSubmit} />
    </div>
  );
}
