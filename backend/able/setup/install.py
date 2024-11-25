import os
import shutil
from pathlib import Path

APPLICATION_NAME = os.getenv("APPLICATION_NAME", "able")
VERSION = os.getenv("VERSION", "v1")

SOURCE_DIR = Path(__file__).parent / VERSION
TARGET_DIR = Path.home() / APPLICATION_NAME / VERSION

def setup_directory_structure():
    if not TARGET_DIR.exists():
        os.makedirs(TARGET_DIR, exist_ok=True)
        print(f"Created target directory: {TARGET_DIR}")

    try:
        shutil.copytree(SOURCE_DIR, TARGET_DIR, dirs_exist_ok=True)
        print(f"Copied all files and folders from {SOURCE_DIR} to {TARGET_DIR}")
    except Exception as e:
        print(f"Failed to copy files: {e}")

if __name__ == "__main__":
    setup_directory_structure()
