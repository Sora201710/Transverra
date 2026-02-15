from fastapi import FastAPI, UploadFile, File, Form
from typing import Annotated
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from celery_app import translate_task
from jsonpickle import encode, decode
from celery.result import AsyncResult

load_dotenv(os.environ.get("ENV_PATH"))

FRONTEND_HOST = os.getenv("FRONTEND_HOST")
VITE_API_URL = os.getenv("VITE_API_URL")
REDIS_URL = os.getenv("REDIS_URL")

app = FastAPI()

origins = [FRONTEND_HOST, VITE_API_URL]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

""" TODO: this doesn't work, but something like this would be quite convenient to have. Auto validation
class TranslateOptions(BaseModel):
    source: str
    sourceLang: str
    targetLang: str
    file: UploadFile | None = None
"""


# TODO: add plain text as a submission option, with a text limit of 100, 000 per day
@app.post("/api/translate")
async def translate(
    source: str = Form(...),
    sourceLang: str = Form(...),
    targetLang: str = Form(...),
    file: UploadFile | None = None,
):
    if file:
        text = file.file.read()
        print("right before translation")
        res = translate_task.delay(
            text,
            {
                "source": source,
                "sourceLang": sourceLang,
                "targetLang": targetLang,
            },
        )

    return {"task_id": res.id}

    #  translated_novel_json = res.get()
    #  translated_novel = decode(translated_novel_json)


class TranslateStatusOptions(BaseModel):
    task_id: str


@app.post("/api/translate_status")
async def translate_status(translateStatusOptions: TranslateStatusOptions):
    task_id: str = translateStatusOptions.task_id
    print(f"task_id: {task_id}")
    task_result = AsyncResult(task_id)

    result = {}
    state = ""

    if not task_result.ready():
        state = "STARTED"
    else:
        if task_result.successful():
            state = "SUCCESSFUL"
            result = decode(task_result.get())
        else:
            state = "FAILURE"

    return {
        "task_id": task_result.id,
        "state": state,
        "result": result,
    }
