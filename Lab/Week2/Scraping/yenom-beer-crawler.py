#!/usr/bin/env python
# Name:
# Student number:
'''
This script crawls the IMDB top 250 movies.
'''
# Python standard library imports
import os
import sys
import csv
import codecs
import cStringIO
import errno

# Third party library imports:
import pattern
from pattern.web import URL, DOM, plaintext

# --------------------------------------------------------------------------
# Constants:
BEER_DISCOUNTS_URL = "http://www.yenom.nl/supermarktaanbiedingen/dranken/bier.html"
HOME_URL = "http://www.yenom.nl"
OUTPUT_CSV = 'beerDiscounts.csv'
SCRIPT_DIR = os.path.split(os.path.realpath(__file__))[0]
BACKUP_DIR = os.path.join(SCRIPT_DIR, 'HTML_BACKUPS')

# --------------------------------------------------------------------------
# Unicode reading/writing functionality for the Python CSV module, taken
# from the Python.org csv module documentation (very slightly adapted).
# Source: http://docs.python.org/2/library/csv.html (retrieved 2014-03-09).

class UTF8Recoder(object):
    """
    Iterator that reads an encoded stream and reencodes the input to UTF-8
    """
    def __init__(self, f, encoding):
        self.reader = codecs.getreader(encoding)(f)

    def __iter__(self):
        return self

    def next(self):
        return self.reader.next().encode("utf-8")


class UnicodeReader(object):
    """
    A CSV reader which will iterate over lines in the CSV file "f",
    which is encoded in the given encoding.
    """

    def __init__(self, f, dialect=csv.excel, encoding="utf-8", **kwds):
        f = UTF8Recoder(f, encoding)
        self.reader = csv.reader(f, dialect=dialect, **kwds)

    def next(self):
        row = self.reader.next()
        return [unicode(s, "utf-8") for s in row]

    def __iter__(self):
        return self


class UnicodeWriter(object):
    """
    A CSV writer which will write rows to CSV file "f",
    which is encoded in the given encoding.
    """

    def __init__(self, f, dialect=csv.excel, encoding="utf-8", **kwds):
        # Redirect output to a queue
        self.queue = cStringIO.StringIO()
        self.writer = csv.writer(self.queue, dialect=dialect, **kwds)
        self.stream = f
        self.encoder = codecs.getincrementalencoder(encoding)()

    def writerow(self, row):
        self.writer.writerow([s.encode("utf-8") for s in row])
        # Fetch UTF-8 output from the queue ...
        data = self.queue.getvalue()
        data = data.decode("utf-8")
        # ... and reencode it into the target encoding
        data = self.encoder.encode(data)
        # write to the target stream
        self.stream.write(data)
        # empty queue
        self.queue.truncate(0)

    def writerows(self, rows):
        for row in rows:
            self.writerow(row)



def create_dir(directory):
    '''
    Create directory if needed.

    Args:
        directory: string, path of directory to be made


    Note: the backup directory is used to save the HTML of the pages you
        crawl.
    '''

    try:
        os.makedirs(directory)
    except OSError as e:
        if e.errno == errno.EEXIST:
            # Backup directory already exists, no problem for this script,
            # just ignore the exception and carry on.
            pass
        else:
            # All errors other than an already exising backup directory
            # are not handled, so the exception is re-raised and the 
            # script will crash here.
            print "Directory could not be made due to unknown error"
            raise


def save_csv(filename, rows):
    '''
    Save CSV file with the top 250 most popular movies on IMDB.

    Args:
        filename: string filename for the CSV file
        rows: list of rows to be saved (250 movies in this exercise)
    '''
    with open(filename, 'wb') as f:
        writer = UnicodeWriter(f)  # implicitly UTF-8
        writer.writerow([
            'Discount title', 'Crate or bottles', 'Price',
            'Discount period', 'Store', "Extra info"
        ])

        writer.writerows(rows)


def make_backup(filename, html):
    '''
    Save HTML to file.

    Args:
        filename: absolute path of file to save
        html: (unicode) string of the html file

    '''

    with open(filename, 'wb') as f:
        f.write(html)


def main():


    '''
    Crawl the IMDB top 250 movies, save CSV with their information.

    Note:
        This function also makes backups of the HTML files in a sub-directory
        called HTML_BACKUPS (those will be used in grading).
    '''

    # Create a directory to store copies of all the relevant HTML files (those
    # will be used in testing).
    print 'Setting up backup dir if needed ...'
    create_dir(BACKUP_DIR)

    # Make backup html
    print 'Access top 250 page, making backup ...'
    beer_discounts_url = URL(BEER_DISCOUNTS_URL)
    beer_discounts_html = beer_discounts_url.download(cached=True)
    make_backup(os.path.join(BACKUP_DIR, 'index.html'), beer_discounts_html)

    # extract url's to sub pages
    print 'Scraping urls to info pages ...'
    url_strings = scrape_beer_info_urls(beer_discounts_url)

    # grab all relevant information from the 250 movie web pages
    rows = []
    for i, url in enumerate(url_strings):  # Enumerate, a great Python trick!
        print 'Scraping movie %d ...' % i
        # Grab web page
        page_html = URL(url).download(cached=True)

        # Extract relevant information
        page_dom = DOM(page_html)
        row = scrape_page(page_dom)
        # Somepages are overdue, so the discount is not valid then scrape_page returns an empty list
        if len(row) > 0:
            rows.append(row)

        # Save one of the pages for testing
        if i == 0:
            html_file = os.path.join(BACKUP_DIR, 'movie-%03d.html' % i)
            make_backup(html_file, page_html)

    #Save a CSV file with the relevant information for the top 250 movies.
    print 'Saving CSV ...'
    save_csv(os.path.join(SCRIPT_DIR, OUTPUT_CSV), rows)

# --------------------------------------------------------------------------
# Functions to adapt or provide implementations for:

def scrape_beer_info_urls(url):
    '''
    Scrape the top 30 beer discounts from Yenom.com
    '''
    # Download the HTML file
    html = url.download()
    # Parse the HTML file into a DOM representation
    dom = DOM(html)
    table = dom.by_tag("table.hikashop_products_table adminlist table table-striped table-hover")[0]
    
    i = 0
    info_urls = []
    # Loop through all beer discounts
    for listItem in table.by_tag("tr")[1:]:
        print 
        print i
        i += 1
        print
        # Get URL
        links = listItem.by_tag("a")
        # Some of the rows in the table are separators between supermarkets so they do not have a link
        if len(links) > 0:
            #print Links[0].content.encode("utf-8")
            print HOME_URL + links[0].attrs["href"]
            info_urls.append(HOME_URL + links[0].attrs["href"])

    # return the list of URLs for each info page
    return info_urls

    """
    This split function was made in the exercise of week 1 by me
    """
def split_string(Source, Separators):
    Results = []
    # This is used so the source can be sliced up into peaces
    PreviousSliceIndex = 0
    # Only when the number of characters that can still be searched is 
    # more or equal to the amount of seperator characters, is it of use to search 
    RangeEnd = len(Source) - len(Separators) + 1
    # The situation changes when there is a Separator at the end of the source, so keep track of this
    SeparatorAtEnd = False
    # per starting index, it is checked wheter the next characters build up to a separation sequence
    # for efficiency the loop breaks after one letter of the sequence that does not match
    for Index in range(0, RangeEnd):
        for i in range(0, len(Separators)):
            if Source[Index + i] == Separators[i]:
                if i == (len(Separators) - 1):
                    # If the separator is at the end, Do not add the separator itself
                    if Index + i == len(Source) - 1:
                        Results.append(Source[PreviousSliceIndex : Index])
                        SeparatorAtEnd = True
                    # If at the first index there is a separator do not add to results yet
                    elif Index != 0:
                        Results.append(Source[PreviousSliceIndex : Index])
                    PreviousSliceIndex = Index + len(Separators)
            else: break
    #  If no separator at the end, the last peace ends at the end of the source
    if not SeparatorAtEnd:
        Results.append(Source[PreviousSliceIndex : len(Source)])
    return Results

def scrape_page(dom):
    '''
    Scrape the IMDB page for a single movie

    Args:
        dom: pattern.web.DOM instance representing the page of 1 single
            movie.

    Returns:
        A list of strings representing the following (in order): title, year,
        duration, genre(s) (semicolon separated if several), director(s) 
        (semicolon separated if several), writer(s) (semicolon separated if
        several), actor(s) (semicolon separated if several), rating, number
        of ratings.
    '''
    results = []
    pageRightPart = dom.by_tag("div.hikashop_product_right_part")[0]
    # For some reason, even though not visible on the main page, some links are
    # still present and contain a discount page of wich the discount period has
    # passed, so before doing anything, this is checked:
    if plaintext(pageRightPart.by_tag("em")[0].source) == "Aanbieding is verlopen":
        return results
    # Title
    titleLink = pageRightPart.by_id("hikashop_product_name_main")
    results.append(plaintext(titleLink.source))
    print plaintext(titleLink.source)
    # Container info (Wheter it is a crate, and type of bottles)
    containerInfo = pageRightPart.by_tag("p")[0].content
    print containerInfo
    results.append(containerInfo)
    # Price without euro sign
    price = ""
    #priceList = pageRightPart.by_tag("span.hikashop_product_price hikashop_product_price_0 hikashop_product_price_with_discount")
    priceList = pageRightPart.by_tag("span.hikashop_product_price hikashop_product_price_0")
    if len(priceList) > 0:
        priceRaw = priceList[0].content.encode("utf-8")
        price = split_string(priceRaw, ' ')[1]
    else:
        price = "Unknown"
    print price
    results.append(price)
    # Period that discount is valid
    periodRaw = pageRightPart.by_tag("em")[0].content
    index = 0
    period = ""
    # The period is in a sentence and not I locate the place where the date start and go back
    # 3, so the day is also included
    for char in periodRaw:
        if char in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']:
            period = periodRaw[index - 3 :]
            break
        index += 1
    print period
    results.append(period)
    # The name of the Supermarkt (Hidden in an image)
    supermarktIMG = pageRightPart.by_tag("img")[0]
    supermarkt = supermarktIMG.attrs["alt"]
    print supermarkt
    results.append(supermarkt)
    # Extra info    
    extraInfoRaw = pageRightPart.by_tag("p")[1:]
    extraInfo = ""
    if len(extraInfoRaw) > 0:
        for item in extraInfoRaw:
            extraInfo += item.content.encode("utf-8") + ", "
    # Remove last comma
    if len(extraInfo) > 0:
        extraInfo = extraInfo[:len(extraInfo) - 2]
    print extraInfo
    print
    results.append(extraInfo)
    return results



if __name__ == '__main__':
    main()  # call into the progam

    # If you want to test the functions you wrote, you can do that here:
    # ...

