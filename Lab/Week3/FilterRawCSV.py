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

# Third party library imports:
import pattern
from pattern.web import URL, DOM, plaintext

INPUT_CSV = "KNMI_19941231.txt"
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
	    writer = csv.writer(f)
	    writer.writerow(["Date", "Max Temperature"])

  		#Write the Filtered data to the csv file
	    for row in FILTERED_DATA_ROWS:
	        writer.writerow(row)

def read_csv(filename):
	with open(filename, 'rb') as f:
	    reader = csv.reader(f)
	    for row in reader:
	    	# the temperature with whitespace removed
	    	# The data is in 0.1 degrees so convert it
	    	maxTemp = int(row[11].split()[0]) / 10
	    	year = row[1][:4]
	    	# javascript date object wants the month to be from 0 to 11
	    	month = int(row[1][4:6]) - 1
	    	day = row[1][6:]
	    	print row[1], year, month, day, maxTemp
	    	FILTERED_DATA_ROWS.append([ year, month, day, maxTemp ])  

def main():
	read_csv(INPUT_CSV)
	
	save_csv(OUTPUT_CSV, FILTERED_DATA_ROWS)

if __name__ == '__main__':
    	main()    