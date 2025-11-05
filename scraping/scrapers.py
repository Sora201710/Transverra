from abc import ABC, abstractmethod
from models import Novel, Chapter

class Scraper(ABC):
    def __init__(self):
        pass

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
    
    def get_novel_data(self, html: str):
        novel: Novel = Novel()
        novel.set_title(self.get_chapter_title)
        novel.set_author(self.get_novel_title)
        chapter_links: list[str] = self.get_chapter_links(html)
        
        for link in chapter_links:
            chapter_html: str = self.get_chapter_html(link)
            chapter: Chapter = Chapter()
            chapter.set_num(self.get_chapter_num(chapter_html))
            chapter.set_title(self.get_chapter_title(chapter_html))
            chapter.set_content(self.get_chapter_content(chapter_html))
            novel.add_chapter(chapter)
        
        return novel

class ScraperContext():
    def __init__(self):
        self.scraper = None

    def setScraper(self, scraper: Scraper):
        self.scraper = scraper
    
    def get_novel_data(self, html: str):
        return self.scraper.get_novel_data(html)
