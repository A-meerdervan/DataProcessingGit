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
INPUT_CSV_FERT = "spdyntfrtin_Indicator_en_csv_v2.csv"
INPUT_CSV_POP = "sp.pop.totl_Indicator_en_csv_v2.csv"
OUTPUT_CSV = 'FilteredData.csv'
OUTPUT_CSV_POP = "FilteredPopData.csv"
# The path of this script
SCRIPT_DIR = os.path.split(os.path.realpath(__file__))[0]
FILTERED_DATA_ROWS = []
FILTERED_DATA_ROWS_POP = []
EUROPE_CODES = ['AUT', 'BEL', 'BGR', 'CYP', 'CZE', 'DNK', 'EST', 'FIN', 'FRA', 'DEU', 'GRC', 'HUN', 'IRL', 'ITA', 'LVA', 'LTU', 'LUX', 'MLT', 'NLD', 'POL', 'PRT', 'ROU', 'SVK', 'SVN', 'ESP', 'SWE', 'GBR']

def save_csv(filename, rows):
    '''
    Args:
        filename: string filename for the CSV file
        rows: list of rows to be saved (250 movies in this exercise)
    '''
    with open(filename, 'wb') as f:
    	json.dump(rows, f)

def read_csv_fert(filename):
	with open(filename, 'rb') as f:

	    reader = csv.reader(f)
	    i = 0
	    for row in reader:
	    	# skip the first lines
	    	if i > 4:
		    	# The country code in 3 letters
		    	countryCode = row[1]
		    	# only do something with european countries
		    	if countryCode in EUROPE_CODES:
			    	# fertilityRate in 2013
			    	fertilityRate2013 = row[57]

			    	if len(fertilityRate2013) is not 0:
			    		FILTERED_DATA_ROWS.append([countryCode, float(fertilityRate2013) ])
			    		# Take all year data, it starts at index 4 and ends at 56 because 2013 is 57
			    		for j in range(4,57):
			    			FILTERED_DATA_ROWS[-1].append(row[j])  
	    	i+= 1
	    # for row in FILTERED_DATA_ROWS:
	    # 	print row
def read_cvs_pop(filename):
    with open(filename, 'rb') as f:

        reader = csv.reader(f)
        i = 0
        for row in reader:
            # skip the first lines
            if i > 4:
                # The country code in 3 letters
                countryCode = row[1]
                # only do something with european countries
                if countryCode in EUROPE_CODES:
                    # population in 2013
                    population2013 = row[-3]
                    FILTERED_DATA_ROWS_POP.append([countryCode, population2013])
            i+= 1
if __name__ == '__main__':
	read_csv_fert(INPUT_CSV_FERT)
	read_cvs_pop(INPUT_CSV_POP)
	save_csv(OUTPUT_CSV, FILTERED_DATA_ROWS)
	save_csv(OUTPUT_CSV_POP, FILTERED_DATA_ROWS_POP)