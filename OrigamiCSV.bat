@echo off
exiftool -csv -Title -Artist -Model -Description -Label -ImageHeight -ImageWidth Origami\ > Origami.csv  
pause