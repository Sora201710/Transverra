from abc import ABC, abstractmethod
from models import Novel, Chapter

class Adapter(ABC):

    @abstractmethod
    def somefunc(self):
        pass

"""
This class is responsible for taking AO3 input (for now, just as an HTML file or string of the whole page)
and then extracting the novel details from it, and returning it as a Novel object.
"""
class AO3Adapter(Adapter):


class Scraper(ABC):

    @abstractmethod
    def get_novel_html(self, url: str) -> str:
        pass

    @abstractmethod
    def get_novel_author(self, html: str) -> str:
        pass

    @abstractmethod
    def get_novel_title(self, html: str) -> str:
        pass

    @abstractmethod
    def get_chapter_links(self, html: str) -> list[str]:
        pass

    @abstractmethod
    def get_chapter_html(self, url: str) -> str:
        pass

    @abstractmethod
    def get_chapter_num(self, html: str) -> int:
        pass

    @abstractmethod
    def get_chapter_title(self, html: str) -> str:
        pass

    @abstractmethod
    def get_chapter_content(self, html: str) -> str:
        pass

    def get_novel_data(self, html: str) -> Novel:
        novel: Novel = Novel()
        novel.set_title(self.get_novel_title(html))
        novel.set_author(self.get_novel_author(html))
        chapter_links: list[str] = self.get_chapter_links(html)

        for link in chapter_links:
            chapter_html: str = self.get_chapter_html(link)
            chapter: Chapter = Chapter()
            chapter.set_num(self.get_chapter_num(chapter_html))
            chapter.set_title(self.get_chapter_title(chapter_html))
            chapter.set_content(self.get_chapter_content(chapter_html))
            novel.add_chapter(chapter)

        return novel


class AO3Scraper(Scraper):
    def __init__(self):
        super()

    def get_novel_html(self, url: str) -> str:
        pass

    def get_novel_author(self, html: str) -> str:
        pass

    def get_novel_title(self, html: str) -> str:
        pass

    def get_chapter_links(self, html: str) -> list[str]:
        pass

    def get_chapter_html(self, url: str) -> str:
        pass

    def get_chapter_num(self, html: str) -> int:
        pass

    def get_chapter_title(self, html: str) -> str:
        pass

    def get_chapter_content(self, html: str) -> str:
        pass


class ScraperContext:
    def __init__(self):
        self.scraper = None

    def setScraper(self, scraper: Scraper):
        self.scraper = scraper

    def get_novel_data(self, html: str):
        if not isinstance(self.scraper, Scraper):
            raise ValueError("No Scraper has been set for ScraperContext")
        return self.scraper.get_novel_data(html)
