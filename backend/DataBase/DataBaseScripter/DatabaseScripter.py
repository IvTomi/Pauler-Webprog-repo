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

def mergeUpdateBefore(merged):
    viewlist = os.listdir(updateBeforePath)
    viewlist = sorted(viewlist,key=natural_keys)
    for viewscriptpath in viewlist:
        viewscript = open(updateBeforePath + '/' + viewscriptpath,'r')
        for line in viewscript:
            merged.write(line)
        merged.write(';')
        merged.write('\n\n')
        viewscript.close()

def mergeStoredProcedures(merged):
    viewlist = os.listdir(storedProceduresPath)
    for viewscriptpath in viewlist:
        viewscript = open(storedProceduresPath + '/' + viewscriptpath,'r')
        for line in viewscript:
            merged.write(line)
        merged.write(';')
        merged.write('\n\n')
        viewscript.close()

def merge():
    merged = open('../merged.sql', 'w+')
    merged.truncate(0)
    mergeViews(merged)
    mergeUpdateBefore(merged)
    mergeStoredProcedures(merged)
    merged.close()

merge()
        

