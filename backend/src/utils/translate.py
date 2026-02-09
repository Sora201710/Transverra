# TODO: come up with a solution for getting rate limited by the translation API
#       - add a delay (customizable by user)
#       - retry a request after a delay if it gets rate limited
#       - worst case need to host my own LLM
# selenium probably won't work due to this reason

from models import Novel
from bs4 import BeautifulSoup
from extractors import AO3Extractor
from deep_translator import GoogleTranslator


def translate(novel: Novel) -> Novel:
    translated_novel = Novel()
    return translated_novel


html = ""
with open(
    "/home/christopherroy/Projects/Transverra/backend/src/data/Viendo_el_Arco_6_en_el.html",
    "r",
) as f:
    html = f.read()

extractor = AO3Extractor()
extractor.set_author(html)
extractor.set_title(html)
extractor.set_chapters(html)
novel = extractor.get_novel()

chapter_content = novel.get_chapters()[0].get_content()
BATCH_SIZE = 4500


def get_batches(text: str) -> list[str]:
    """
    Returns a list of batches of the input text, where each batch is at most BATCH_SIZE characters long.

    :param text: Description
    :type text: str
    :return: Description
    :rtype: list[str]
    """
    return [text[i : i + BATCH_SIZE] for i in range(0, len(text), BATCH_SIZE)]


translated_text = GoogleTranslator(source="auto", target="en").translate_batch(
    get_batches(chapter_content)
)


print(f"Translated HTML: ")
print(f"Author: {novel.get_author()}")
print(
    f"Title: {GoogleTranslator(source="auto", target="en").translate(novel.get_title())}"
)
chapter = novel.get_chapters()[0]
print(GoogleTranslator(source="auto", target="en").translate(chapter.get_title()))
print(translated_text)
