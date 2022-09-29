Thank You for taking interest in this project!
There are a few things you need to know before you get started.

1. Technically, you can have runscript point to any .csv file, BUT
   it's designed to be for a very specificly formatted cohort.csv.
   This format is obtained by using parser to remove unecessary columns
   and also to trim the rows. AFTER using parser to trim the fat, use
   termParser to reconfigure the .csv into a majorXterm format.

2. This project is incomplete. Major issues include that majors don't line up
   in the final .csv. and a major bug where values containing commas don't get
   seperated properly, so in FINAL.csv some rows have an extra value called
   in one of the last few rows. It only happens to about 20/13k lines, 
   so it's hard to debug when it happens so infrequently. The only fix is to open
   manually in a .csv editor, and sort rows by isFem and remove the extra data and 
   move the old ones back. #TEMPORARILY FIXED W/ FnRep.py!!!

3. To test this code locally, on a linux machine, i used the following command:
   chromium-browser --allow-file-access-from-files main/index.html

4. I had to make a ton of python utility scripts for this project, they all describe
   their use inside.

STEPS FOR GENERATING FORMATED CSV FILE:

Short version: 

python getXlines.py
<<modify losing keywords in parser.py to change years filtered, >>
<<change output year name too>>
python parser.py
python3 FnRep.py
python termParser.py

explanation:
-The original cohort gets truncated by getXlines.py and outputted as 
shortenedCohort.csv, it also adds quotes to each element.
-Then parser.py takes shortenedCohort.csv and removes specified columns and rows
and outputs it into <startyear>SpecificCohort.csv.
-FnRep.py fixes the bugs from parser.py and removes extraneous details and 
elements and saves is BACK into the <startyear>SpecificCohort.csv.
-Finally, termParser formats it into a per students on term format to be 
displayed by the viz. This gets saved as FINAL.csv.


If you have any questions or requests I can be contacted at ecsit39@gmail.com


HOW TO USE:
Now that you've got it set up and running, here's what you need to know:

F1, F2, F+ means First semester as freshman, second semester as freshman, and the # of total years as a freshman

F, P, J, S means Freshman, Sophomore, Junior, Senior

The graphs are is colorized by the major students started school in, regardless if that means junior/freshman.

Each vertical axes can be clicked and dragged to filter. It's recommended to do this on the Year and Major lines
first, due to the large data set lagging the system.

Vertical Axes can be rearranged.

Anything self-explanatory won't be mentioned here.

The chart at the bottom can highlight lines by mousing over them.

The chart can also view by page, all pages, or a varying number of. It can also sort and order rows by clicking 
on one of the tabbed sections.
 
