from pathlib import Path
from src.block.enums import BlockType

HOME_PATH = Path.home()
APPLICATION_NAME = "able"
VERSION = "1.0"

class PathManager:

    BASE_PATH = HOME_PATH / APPLICATION_NAME / VERSION

    def __init__(self):
        self.blocks_path = self.BASE_PATH / "blocks"
        self.data_path = self.BASE_PATH / "data"
        self.projects_path = self.data_path / "projects"

    def get_block_path(self, block_type: BlockType) -> Path:
        """특정 블록 타입 경로"""
        return self.blocks_path / block_type.value

    def get_projects_path(self, name: str) -> Path:
        """프로젝트 경로"""
        return self.projects_path / name

    def get_block_graph_path(self, name: str) -> Path:
        """프로젝트 블록 그래프 파일 경로"""
        return self.get_projects_path(name) / "block_graph.json"

    def get_train_results_path(self, name: str) -> Path:
        """학습 결과 경로"""
        return self.get_projects_path(name) / "train_results"

    def get_train_result_path(self, name: str, result_name: str) -> Path:
        """학습 결과 경로"""
        return self.get_train_results_path(name) / result_name

    def get_epoch_path(self, name: str, result_name: str, epoch: int) -> Path:
        """에포크별 경로"""
        return self.get_result_path(name, result_name) / "epochs" / f"epoch_{epoch}"

    def get_feature_maps_path(self, name: str, result_name: str, epoch: int) -> Path:
        """특정 에포크의 피처맵 이미지 디렉터리 경로"""
        return self.get_epoch_path(name, result_name, epoch) / "feature_maps"