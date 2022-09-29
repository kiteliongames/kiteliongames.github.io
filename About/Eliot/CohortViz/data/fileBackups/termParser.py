#!/usr/bin/env python
import sys
import csv
import webbrowser


#this program assumes that the csv is ordered by student id (key)

strBuffer = []
levelBuffer = ""
outString = ""
numFrTerms = 0
numSpTerms = 0
numJuTerms = 0
numSrTerms = 0
sameLevelTerm = False

anchorKey = ""
currentKey = ""

#F1, F2, So1, So2, J1, etc.
#major/notstudent/graduated
#print "Fr1,Fr2,So1,So2,Ju1,Ju2,Se1,Se2"
rowNum = 0
with open(sys.argv[1]) as inFile:
    for row in csv.reader(inFile):
        rowNum += 1
        currentKey = row[0]
        #test case for first iteration included
        if anchorKey == "":
            anchorKey = row[0]
            strBuffer.append(row)
        else:
            if currentKey == anchorKey:
                #string bugger contains all the rows of the same student
                strBuffer.append(row)
            else:
                tempFrTerms = 0
                tempSpTerms = 0
                tempJuTerms = 0
                tempSrTerms = 0
                #do many things
                #go through the buffer and how many times student
                # was in each level
                for rowBuffer in strBuffer:
                    #count # of terms student was in each level
                    tempLevel = rowBuffer[3]
                    #print tempLevel == "Senior"
#                    print tempLevel
                    if tempLevel == "Senior":
                        tempSrTerms += 1
                    elif tempLevel == "Junior":
                        tempJuTerms += 1
                    elif tempLevel == "Sophomore":
                        tempSpTerms += 1
                    elif tempLevel == "Freshman":
                        tempFrTerms += 1
                if tempSrTerms > numSrTerms:
                    numSrTerms = tempSrTerms
                if tempJuTerms > numJuTerms:
                    numJuTerms = tempJuTerms
                if tempSpTerms > numSpTerms:
                    numSpTerms = tempSpTerms
                if tempFrTerms > numFrTerms:
                    numFrTerms = tempFrTerms
                #update anchor
                anchorKey = currentKey
                strBuffer = []
                strBuffer.append(row)

#add all to string
for x in range(0, numFrTerms):
	outString += "Fr"+str(x+1)
for x in range(0, numSpTerms):
	outString += "Sp"+str(x+1)
for x in range(0, numJuTerms):
	outString += "Ju"+str(x+1)
for x in range(0, numSrTerms):
	outString += "Sr"+str(x+1)
print outString
outString = ""
            

#maybe to construct 4 lines per semester? or two, and the last one, instead of a major says: "more terms", and just shows they took
#multiple terms w/ one set of data?
    
#something to notify us the program is finished.
webbrowser.open("https://www.youtube.com/watch?v=pmGCDVKQgyk")
