from celery import Celery
import os
from dotenv import load_dotenv

load_dotenv(os.environ.get("ENV_PATH"))

REDIS_URL = os.getenv("REDIS_URL")
app = Celery("tasks", broker=REDIS_URL)

# TODO: use RPC to send real time state changes
# to frontend or express server

# TODO: setup a fastapi python server
# to handle all the translation requests
# then make it communicate with express
# server


@app.task
def add(x, y):
    return x + y
