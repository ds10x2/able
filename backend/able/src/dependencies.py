from src.file.path_manager import PathManager

path_manager_instance = PathManager()

def get_path_manager() -> PathManager:
    return path_manager_instance