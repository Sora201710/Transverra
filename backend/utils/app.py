from fastapi import FastAPI, UploadFile, File, Form
from typing import Annotated
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv(os.environ.get("ENV_PATH"))

FRONTEND_HOST = os.getenv("FRONTEND_HOST")
VITE_API_URL = os.getenv("VITE_API_URL")

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


@app.post("/api/translate")
async def root(
    source: str = Form(...),
    sourceLang: str = Form(...),
    targetLang: str = Form(...),
    file: UploadFile | None = None,
):
    if file:
        # TODO: remove this later
        print("Received file!")
    return {
        "source": source,
        "sourceLang": sourceLang,
        "targetLang": targetLang,
        "file": file,
    }
