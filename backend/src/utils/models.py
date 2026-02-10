class Chapter:
    def __init__(self, num: int = -1, title: str = "", content: str = ""):
        self.__num = num
        self.__title = title if title else f"Chapter {num}"
        self.__content = content

    def get_num(self) -> int:
        return self.__num

    def get_title(self) -> str:
        return self.__title

    def get_content(self) -> str:
        return self.__content

    def set_num(self, num: int):
        self.__num = num

    def set_title(self, title: str):
        self.__title = title

    def set_content(self, content: str):
        self.__content = content

    def __str__(self):
        return f"Number: {self.get_num()}\nTitle: {self.get_title()}\nContent:\n{self.get_content()}"


class Novel:
    def __init__(
        self, title: str = "", author: str = "", chapters: list[Chapter] = None
    ):
        self.__title = title
        self.__author = author
        if chapters is None:
            self.__chapters = []
        else:
            self.__chapters = chapters

    def get_title(self) -> str:
        return self.__title

    def get_author(self) -> str:
        return self.__author

    def get_chapters(self) -> list[Chapter]:
        return self.__chapters

    def set_title(self, title: str):
        self.__title = title

    def set_author(self, author: str):
        self.__author = author

    def add_chapter(self, chapter: Chapter):
        self.__chapters.append(chapter)

    def __str__(self):
        chapter_string = ""
        for chapter in self.get_chapters():
            chapter_string += "\n" + str(chapter) + "\n"
        return (
            f"Author: {self.get_author()}\nTitle: {self.get_title()}" + chapter_string
        )
