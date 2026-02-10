from bs4 import BeautifulSoup
from extractors import AO3Extractor
from translate import translate

"""
This is an example of how the workflow for the main app is supposed to go.
1. Extract data from HTML file to model - DONE
2. Translate text to something else - DONE
3. Send a response back to the Express server via Celery
4. Express server sends a response to the frontend containing the translated data
"""

"""
TODO: implement secure file handling
"""
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

translated_novel = translate(novel, {"source": "auto", "target": "en"})

with open(
    "/home/christopherroy/Projects/Transverra/backend/src/data/translated.txt",
    "w",
) as f:
    f.write(str(translated_novel))
