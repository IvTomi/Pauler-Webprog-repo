import os;
import re;

viewsPath = '../ViewSQL'
updateBeforePath = '../UpdateBefore'
storedProceduresPath = '../StoredProcedures'


def atoi(text):
    return int(text) if text.isdigit() else text

def natural_keys(text):
    return [ atoi(c) for c in re.split(r'(\d+)', text) ]

def mergeViews(merged):
    viewlist = os.listdir(viewsPath)
    viewlist = sorted(viewlist,key=natural_keys)
    for viewscriptpath in viewlist:
        viewscript = open(viewsPath + '/' + viewscriptpath,'r')
        for line in viewscript:
            merged.write(line)
        merged.write(';')
        merged.write('\n\n')
        viewscript.close()

def merge():
    merged = open('../merged.sql', 'w+')
    merged.truncate(0)
    mergeViews(merged)
    merged.close()

merge()
        

