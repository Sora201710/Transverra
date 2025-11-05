class Chapter:
    def __init__(self, num: int = -1, title: str = "", content: str = ""):
        self.__num = num
        self.__title = title
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
        if not isinstance(num, int):
            raise TypeError("num must be an integer")

    def set_content(self, content: str):
        self.__content = content


class Novel:
    def __init__(self, title: str = "", author: str = "", chapters: list[Chapter] | None = None):
        self.__title = title
        self.__author = author
        self.__chapters = chapters if chapters is not None else []

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

        # TODO: understand what's happening here
        if any(ch.get_num() == chapter.get_num() for ch in self.__chapters):
            raise ValueError(f"Duplicate chapter number: {chapter.get_num()}")

        inserted = False
        for i, ch in enumerate(self.__chapters):
            if chapter.get_num() < ch.get_num():
                self.__chapters.insert(i, chapter)
                inserted = True
                break

        if not inserted:
            self.__chapters.append(chapter)