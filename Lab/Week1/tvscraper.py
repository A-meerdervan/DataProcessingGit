#!/usr/bin/env python
# Name:
# Student number:
'''
This script scrapes IMDB and outputs a CSV file with highest ranking tv series.
'''
# IF YOU WANT TO TEST YOUR ATTEMPT, RUN THE test-tvscraper.py SCRIPT.
import csv, codecs, cStringIO
import unicodedata

from UnicodeWriter import UnicodeWriter
from pattern.web import URL, DOM, plaintext
from pattern.web import NODE, TEXT, COMMENT, ELEMENT, DOCUMENT

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'

# this function was copied from source: http://stackoverflow.com/questions/517923/what-is-the-best-way-to-remove-accents-in-a-python-unicode-string
# Since csv files cannot deal with unicode, this function transforms a unicode accent on a letter into
# The closest ASCII letter
def strip_accents(s):
   return ''.join(c for c in unicodedata.normalize('NFD', s)
                  if unicodedata.category(c) != 'Mn')

def extract_tvseries(dom):
    '''
    Extract a list of highest ranking TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Ranking
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''
    Results =[]
    Table = dom.by_tag("table.results")[0]
    # Loop through the 50 movies/films (tr = table row)
    for ListItem in Table.by_tag("tr")[1:51]:
        SubResult = []
        # The Title
        TitleLink = ListItem.by_tag("a")[1] # Title is the second a type link
        SubResult.append(strip_accents(TitleLink.content)) # Byte string to Unicode string.
        # The Ranking
        RankingBundle = ListItem.by_tag("div.rating rating-list")[0]
        RankingString = RankingBundle.attrs["title"]
        Ranking = RankingString[17:20] #This is the 1 to 10 number in the sentence
        SubResult.append(Ranking)
        # Genres
        GengreBundle = ListItem.by_tag("span.genre")[0]
        Gengres = ""
        for GengreLink in GengreBundle.by_tag("a"):
            Gengres = Gengres + GengreLink.content + ","
        # Remove the last qomma
        Gengres = Gengres[:len(Gengres) - 1]
        SubResult.append(strip_accents(Gengres))
        # Actors
        ActorsBundle = ListItem.by_tag("span.credit")[0]
        Actors = ""
        for ActorLink in ActorsBundle.by_tag("a"):
            Actors = Actors + ActorLink.content + ","
        # Remove the last qomma
        Actors = Actors[:len(Actors) - 1]
        SubResult.append(strip_accents(Actors))
        # Runtime (if the list is empyt there is no known runtime)
        if len(ListItem.by_tag("span.runtime")) == 0:
            SubResult.append("unknown")
        else:
            RuntimeBundle = ListItem.by_tag("span.runtime")[0]
            RuntimeString = RuntimeBundle.content
            Runtime = RuntimeString[:3]
            SubResult.append(Runtime)
        Results.append(SubResult)
    return Results

def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest ranking TV-series.
    '''
    # write caption of the table that is the csv file
    unicodeWriter = UnicodeWriter(f)
    unicodeWriter.writerow(['Title', 'Ranking', 'Genre', 'Actors', 'Runtime'])

    #writer = csv.writer(f)
    #writer.writerow(['Title', 'Ranking', 'Genre', 'Actors', 'Runtime'])

    # write the scraped data to the csv file
    for Row in tvseries:
        #writer.writerow(Row)
        unicodeWriter.writerow(Row)

if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in testing / grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)
