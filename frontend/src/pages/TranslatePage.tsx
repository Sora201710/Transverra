import TranslateForm from "../components/TranslateForm";
import { Link } from "react-router";
import { useState, useEffect } from "react";

const POLL_INTERVAL = 3_000;

export default function TranslatePage() {
  const [task_result, set_task_result] = useState({
    task_id: "",
    state: "",
    result: {},
  });

  const [novel_id, set_novel_id] = useState("");
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
        let novel_res = await response.json();
        set_novel_id(novel_res.insertedId);
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
      <TranslateForm set_task_result={set_task_result} />
      {novel_id && (
        <Link to={`/novels/${novel_id}`}>Go to translated novel</Link>
      )}
    </div>
  );
}
