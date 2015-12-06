# Name: Alex van der Meer
# Student number: 10400958
# University: UvA

# Python standard library imports
import os
import sys
import csv
import codecs
import cStringIO
import errno
import json

# Third party library imports:
import pattern
from pattern.web import URL, DOM, plaintext

# source: http://data.worldbank.org/indicator/SP.DYN.TFRT.IN
INPUT_CSV = "spdyntfrtin_Indicator_en_csv_v2.csv"
OUTPUT_CSV = 'FilteredData.csv'
# The path of this script
SCRIPT_DIR = os.path.split(os.path.realpath(__file__))[0]
FILTERED_DATA_ROWS = []

def save_csv(filename, rows):
    '''
    Args:
        filename: string filename for the CSV file
        rows: list of rows to be saved (250 movies in this exercise)
    '''
    with open(filename, 'wb') as f:
    	json.dump(FILTERED_DATA_ROWS, f)

def read_csv(filename):
	with open(filename, 'rb') as f:

	    reader = csv.reader(f)
	    i = 0
	    for row in reader:
	    	# skip the first lines
	    	if i > 4:
		    	# The country code in 3 letters
		    	countryCode = row[1]
		    	# fertilityRate in 2013
		    	fertilityRate = row[57]

		    	if len(fertilityRate) is not 0:
		    		FILTERED_DATA_ROWS.append([countryCode, float(fertilityRate) ])  
	    	i+= 1
	    for row in FILTERED_DATA_ROWS:
	    	print row
def main():
	read_csv(INPUT_CSV)
	
	save_csv(OUTPUT_CSV, FILTERED_DATA_ROWS)

if __name__ == '__main__':
    	main()    