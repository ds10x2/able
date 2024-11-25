from src.response.schemas import ImmutableBaseModel
from typing import List

class Project(ImmutableBaseModel):
    title: str                          # 프로젝트명 
    description: str | None = None      # 프로젝트 설명(선택)
    cuda_version: str  | None = None
    python_kernel_path: str | None = None

class SelectedProject(Project):
    thumbnail: str | None = None        # 썸네일
    class Config:
        frozen = False  # 불변성 해제

class ProjectResponse(ImmutableBaseModel):
    project: SelectedProject

class UpdatedProject(Project):
    prev_title: str                     # 변경 전 프로젝트명
    prev_description: str | None = None # 변경 전 설명

class ProjectsResponse(ImmutableBaseModel):
    total_project_count: int
    projects: List[str]
