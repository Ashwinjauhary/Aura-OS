import os
from PIL import Image

def resize_icon(source_path, target_path, size):
    img = Image.open(source_path)
    # If the image is already the target size, just save it
    if img.size == (size, size):
        img.save(target_path)
        return
    
    # Resize with High Quality Lanczos filter
    img = img.resize((size, size), Image.Resampling.LANCZOS)
    img.save(target_path)

def main():
    base_path = "android/app/src/main/res"
    source_icon = "public/favicon.png"
    
    # Densities and their base icon sizes (48x48 is the mdpi base)
    densities = {
        "mipmap-mdpi": 48,
        "mipmap-hdpi": 72,
        "mipmap-xhdpi": 96,
        "mipmap-xxhdpi": 144,
        "mipmap-xxxhdpi": 192,
    }
    
    for folder, size in densities.items():
        folder_path = os.path.join(base_path, folder)
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)
            
        print(f"Generating icons for {folder} ({size}x{size})...")
        
        # 1. Main Launcher Icons
        resize_icon(source_icon, os.path.join(folder_path, "ic_launcher.png"), size)
        resize_icon(source_icon, os.path.join(folder_path, "ic_launcher_round.png"), size)
        
        # 2. Foreground for Adaptive Icons (Standard size for foreground is 108dp)
        # For xxhdpi (3x), 108 * 3 = 324. For xxxhdpi (4x), 108 * 4 = 432.
        # We'll use a standard ratio based on the icon size (108/48 * base_size)
        fg_size = int((108/48) * size)
        resize_icon(source_icon, os.path.join(folder_path, "ic_launcher_foreground.png"), fg_size)

    # 3. Replace all splash.png files
    print("Replacing all splash.png files...")
    for root, dirs, files in os.walk(base_path):
        for file in files:
            if file == "splash.png":
                target_path = os.path.join(root, file)
                # For splash screens, we use a larger size or just fit it. 
                # Since we don't know the exact target density from the folder name easily for splash, 
                # we'll look at the current splash size and match it.
                try:
                    old_img = Image.open(target_path)
                    target_size = old_img.size
                    print(f"Replacing {target_path} ({target_size[0]}x{target_size[1]})...")
                    resize_icon(source_icon, target_path, target_size[0]) # Assuming square-ish or just scaling width
                except Exception as e:
                    print(f"Could not replace {target_path}: {e}")

if __name__ == "__main__":
    main()
