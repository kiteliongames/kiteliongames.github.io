#!/usr/bin/env python
import sys
import csv
import webbrowser

winningKeywords = ["gpa", "StudentKey", "TermType","AcademicYear", "NewStatusOfficialDescr",
                   "Female_ind", "IPEDSEthnicityDescription", "SourceAge", "AcademicLevelDescription",
                   "GPA", "RptgPlanOrgDescr","STEM_Type", "RptgCollegeDescr", 
                   "TermCreditsAttempted", "CreditsEarned", "grade", 
                   "As_of_date"]
losingKeywords = ["Band", "band", "has", "HAS", "Has", "Reporting", "zeros", "GPA_UNDER2_ind"]
rowCount = 0
winningNumbers = []
columnCount = 0
rowZero = []
columnBuffer = []
badWordFound = False
rowFilter = ["1996","1997","1998","1999","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009", "Not STEM Plan"]
filterWordFound = False


with open(sys.argv[1]) as inFile:
    for row in csv.reader(inFile):
        columnCount = 0
        if rowCount is 0:
            #for each column
            for columnName in row:
                #test to see if it has an undesirable word in it
                for badword in losingKeywords:
                    if badword in columnName:
                        badWordFound = True
                # if not, test to see if it has a desirable word in it
                if badWordFound is False:
                    for keyword in winningKeywords:
                        if keyword in columnName:
                            # if it DOES have a desirable word, record the word
                            # and column number
                            rowZero.append(columnName)
                            winningNumbers.append(columnCount)
                badWordFound = False
                columnCount += 1
            outString = ""
            #after iterating through all columns in row 1
            for item in rowZero:
                #build row 0
                outString += str(item)+","
            # and remove the "," at the end
            outString = outString[:len(outString)-1]
            print outString
            #print "WInning: " + str(winningNumbers)
        elif rowCount > 0:
            #append based on created number list
            columnBuffer = []
            for column in row:
                #if the column was chosen as a relevant/desirable column
                if columnCount in winningNumbers:
                    #add the content at (row,column)
                    columnBuffer.append(column)
                outString = ""
                #add that item to the string with a , delimiter
                for item in columnBuffer:
                    outString += str(item)+","
                columnCount += 1
            outString = outString[:len(outString)-1]
            filterWordFound = False
            for filterWord in rowFilter:
                if filterWord in outString:
                    filterWordFound = True
            #cancel outputting the whole row if it contains a filtered word.
            if filterWordFound is False:
                print outString
        rowCount += 1
#something to notify us the program is finished.
webbrowser.open("https://www.youtube.com/watch?v=pmGCDVKQgyk")
