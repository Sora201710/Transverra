from bs4 import BeautifulSoup
from extractors import AO3Extractor

# TODO: read on how to securely handle files, i.e try catch etc.
html = ""
with open(
    "/home/christopherroy/Projects/Transverra/backend/src/data/MHA_Another_Story.html",
    "r",
) as f:
    html = f.read()
soup = BeautifulSoup(html, "html.parser")

extractor = AO3Extractor()
extractor.set_author(html)
extractor.set_title(html)
extractor.set_chapters(html)

novel = extractor.get_novel()

print(novel.get_author())
print(novel.get_title())
print(novel.get_chapters()[0].get_content())
print(novel.get_chapters()[0].get_title())


"""
WORKFLOW:

1. Get novel HTML from URL -- DONE
2. Use one of the existing scrapers to extract novel details from HTML -- DONE
3. Translate novel to target language with some API or self-hosted LLM
4. Save the translated novel in the database for some time unless the user saves it, and send a response to the frontend with
    a temporary URL to the translated novel page.
"""
