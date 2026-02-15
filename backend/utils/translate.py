# TODO: come up with a solution for getting rate limited by the translation API
#       - add a delay (customizable by user)
#       - retry a request after a delay if it gets rate limited
#       - worst case need to host my own LLM
# selenium probably won't work due to this reason

from models import Novel, Chapter
from deep_translator import GoogleTranslator
import copy

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


def translate(novel: Novel, options: dict) -> Novel:
    if not novel:
        return novel
    translated_novel = Novel()
    translated_novel.set_author(novel.get_author())
    translated_novel.set_title(
        GoogleTranslator(
            source=options["sourceLang"], target=options["targetLang"]
        ).translate(novel.get_title())
    )
    print("Beginning chapter translations: ")
    count = 1
    print(f"Number of chapters: {len(novel.get_chapters())}")
    for chapter in novel.get_chapters():
        translated_chapter = Chapter()
        translated_chapter.set_num(chapter.get_num())
        translated_chapter.set_title(
            GoogleTranslator(
                source=options["sourceLang"], target=options["targetLang"]
            ).translate(chapter.get_title())
        )
        translated_chapter_content_batches = GoogleTranslator(
            source=options["sourceLang"], target=options["targetLang"]
        ).translate_batch(get_batches(chapter.get_content()))
        translated_chapter_content = "".join(translated_chapter_content_batches)
        translated_chapter.set_content(translated_chapter_content)
        translated_novel.add_chapter(translated_chapter)
        print(f"Completed translation of chapter {count}")
        count += 1
    return translated_novel
