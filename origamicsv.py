import os #To access files

folder_path = 'Origami'
files = os.listdir(folder_path)
file_names=[file for file in files if os.path.isfile(os.path.join(folder_path,file))]

with open ('origami.csv', 'w') as csv_file: 
    csv_file.write('File Name\n')
    
    for file_name in file_names:
        csv_file.write(file_name + '\n')
        
        
        
print("csv file ahs been created succesfully.")
