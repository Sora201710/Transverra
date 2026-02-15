from celery import Celery
import os
from dotenv import load_dotenv
from translate import translate
from constants import constants
from extractors import AO3Extractor, TextExtractor
from jsonpickle import encode, decode

load_dotenv(os.environ.get("ENV_PATH"))

REDIS_URL = os.getenv("REDIS_URL")
app = Celery("tasks", backend=REDIS_URL, broker=REDIS_URL)


class InvalidNovelSourceException(Exception):
    """Exception raised when novel source is not allowed.

    Attributes:
        message -- explanation of the error
    """

    def __init__(self, message):
        self.message = message
        super().__init__(self.message)


@app.task(track_started=True)
def translate_task(text: str, options):
    extractor = None

    match options["source"]:
        case "Archive Of Our Own":
            extractor = AO3Extractor()
        case "text":
            extractor = TextExtractor()
        case _:
            raise InvalidNovelSourceException("Not a valid source.")

    extractor.set_author(text)
    extractor.set_title(text)
    extractor.set_chapters(text)
    novel = extractor.get_novel()

    translated_novel = translate(novel, options)
    # This is required because celery expects a json serializable for sending to results
    translated_novel_json = encode(translated_novel)
    return translated_novel_json
