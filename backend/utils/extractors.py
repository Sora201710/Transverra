from models import Novel, Chapter
from bs4 import BeautifulSoup

"""
This class is responsible for taking AO3 input (for now, just as an HTML string of the whole page)
and then extracting the novel details from it, and returning it as a Novel object.
"""


class AO3Extractor:
    def __init__(self):
        self.__novel = Novel()

    def get_novel(self) -> Novel:
        return self.__novel

    def set_author(self, html: str) -> None:
        soup = BeautifulSoup(html, "html.parser")
        self.__novel.set_author(soup.select("a[rel=author]")[0].text)

    def set_title(self, html: str) -> None:
        soup = BeautifulSoup(html, "html.parser")
        self.__novel.set_title(soup.select("p.message b")[0].text)

    def set_chapters(self, html: str) -> None:
        soup = BeautifulSoup(html, "html.parser")
        chapters = soup.select("#chapters div.userstuff")
        chapter_titles = soup.select("#chapters h2.heading")
        for i, chapter in enumerate(chapters):
            self.__novel.add_chapter(
                Chapter(num=i + 1, title=chapter_titles[i].text, content=chapter.text)
            )


# TODO: this shouldn't really do much, but also make the extractor interface
class TextExtractor:
    def __init__(self):
        self.__novel = Novel()

    def get_novel(self) -> Novel:
        return self.__novel

    def set_author(self, text: str) -> None:
        self.__novel.set_author("")

    def set_title(self, text: str) -> None:
        self.__novel.set_title("")

    def set_chapters(self, text: str) -> None:
        self.__novel.add_chapter(num=1, title="", content=text)
