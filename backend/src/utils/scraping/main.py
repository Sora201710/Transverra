from bs4 import BeautifulSoup
import requests

# Example: soup = BeautifulSoup("<tag1>Some<tag2/>bad<tag3>XML", "xml")

res = requests.get(" https://archiveofourown.org/works/73420176?view_full_work=true")
soup = BeautifulSoup(res.text, "html.parser")
soup = soup.select("div.userstuff.module")

print(soup)


"""
WORKFLOW:

1. Get novel HTML from URL
2. Use one of the existing scrapers to extract novel details from HTML
3. Translate novel to target language with some API or self-hosted LLM
4. Save the translated novel in the database for some time unless the user saves it, and send a response to the frontend with
    a temporary URL to the translated novel page.
"""
