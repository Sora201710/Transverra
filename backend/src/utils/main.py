from bs4 import BeautifulSoup
from extractors import AO3Extractor
from translate import translate

# TODO: read on how to securely handle files, i.e try catch etc.

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
