class Chapter:
    def __init__(self):
        self.num = -1
        self.title = ""
        self.content = ""
    
    def __init__(self, num: int, title: str, content: str):
        self.num = num
        self.title = title
        self.content = content

class Novel:
    def __init__(self):
        self.title = ""
        self.author = ""
        self.chapters = []
    
    def __init__(self, title: str, author: str):
        self.title = title
        self.author = author
        self.chapters = []
    
    def __init__(self, title: str, author: str, chapters: list[Chapter]):
        self.title = title
        self.author = author
        self.chapters = chapters

