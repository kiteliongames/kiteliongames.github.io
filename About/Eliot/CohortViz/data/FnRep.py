#!/usr/bin/env python3  

#USES PYTHON 3!! make sure to use python3 instead of python

#replaced string1 with replStr
import fileinput

string1 = ",\"STEM Plan\""
string2 = "\" Othr\","
string3 = "\"STEM_Type\","
replStr = ""
firstRow = True


for line in fileinput.input("2010SpecificCohort.csv", inplace=True):
    if not firstRow:
        print(line.replace(string1, replStr), end='')
    if firstRow:
        firstRow = False
for line in fileinput.input("2010SpecificCohort.csv", inplace=True):
    print(line.replace(string2, replStr), end='')
for line in fileinput.input("2010SpecificCohort.csv", inplace=True):
    print(line.replace(string3, replStr), end='')


    

