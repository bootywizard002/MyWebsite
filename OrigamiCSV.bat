@echo off
exiftool -csv -Title -Artist -Model -Description -ImageHeight -ImageWidth Origami\ > Origami.csv  
pause