@echo off
exiftool -csv -Title -Artist -Model -Description -Label -ImageHeight -ImageWidth Origami\ > output_metadata.csv  
pause