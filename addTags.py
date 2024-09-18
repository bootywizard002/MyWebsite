import os
import subprocess
from PIL import Image

def edit_image_tags(folder_path):
    # List all files in the folder, filtering only image files
    image_files = [f for f in os.listdir(folder_path) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.tiff', '.bmp', '.gif'))]

    for image_file in image_files:
        image_path = os.path.join(folder_path, image_file)

        try:
            # Open and show the image
            
            print(f"Editing tags for: {image_file}")

            # Prompt for tag values
            title = image_file 
            artist = input("Enter artist: ")
            model = input("Enter model: ")

            # Build the exiftool command
            command = [
                'exiftool',
                f'-title={title}',  # Remove spaces around '='
                f'-artist={artist}',
                f'-model={model}',
                image_path
            ]

            # Run the exiftool command
            subprocess.run(command)
            print(f"Tags updated for {image_file}\n")

        except Exception as e:
            print(f"Error processing {image_file}: {e}")

    print("All images processed.")

# Prompt the user for the folder path
folder_path = input("Enter folder Name: ")
edit_image_tags(folder_path)
