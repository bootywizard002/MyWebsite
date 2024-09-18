@echo off
exiftool -csv -Title -Artist -Model -Description -ImageHeight -ImageWidth Plants\ > plants.csv  
pause