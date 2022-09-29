#!/usr/bin/env python
import sys
import csv
import webbrowser

#takes the rows of a .csv file and only outputs
# the first X rows. good for shortening a .csv
# for testing. make sure to use a redirect
# into a new file: python getXlines.py 10 > new.csv

lines = 325343
total = 325344
x = 0

inFile  = open("CohortUndergraduateTermAnonymous_2014-11-17.csv", 'r') 
reader  = csv.reader(inFile, delimiter=',', quotechar='"', doublequote = False)
outFile = open("shortenedCohort.csv", "w")
writer = csv.writer(outFile, delimiter=',', quotechar='"', doublequote = False, quoting=csv.QUOTE_ALL)


for row in reader:
    #totalIs += 1
    writer.writerow(row)
    x += 1
    if x > lines or x > total:
        break
#print str(totalIs) + "Is the number of rows in the csv file"
inFile.close()
outFile.close()
