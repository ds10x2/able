import logging
from src.canvas.schemas import SaveCanvasRequest, Canvas
from src.config import get_logger
from src.file.utils import get_file, create_file, save_img_from_base64
from src.file.path_manager import PathManager
from src.utils import str_to_json, json_to_str
from src.file.constants import *

logger = get_logger(__name__, level=logging.DEBUG)
path_manager = PathManager()

def get_canvas(
        project_name: str
) -> Canvas:

    block_graph_path = path_manager.get_block_graph_path(project_name)
    file = get_file(block_graph_path)
    data = str_to_json(file)
    return Canvas(**data)

def save_block_graph(project_name: str, data: SaveCanvasRequest) -> bool:

    project_path = path_manager.get_projects_path(project_name)
    block_graph_path =  project_path / BLOCK_GRAPH

    if create_file(block_graph_path, json_to_str(data.canvas)):
        save_img_from_base64(project_path, THUMBNAIL, data.thumbnail)
        return True
    
    raise