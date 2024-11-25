import src.project.service as service

from fastapi import APIRouter, status

from src.project.schemas import Project, ProjectResponse, UpdatedProject, ProjectsResponse
from src.response.schemas import ResponseModel
from src.response.utils import created, ok, no_content

project_router = router = APIRouter()

@router.post("", response_model=ResponseModel,
             summary="프로젝트 생성", description="")
async def create_project(project: Project):
    service.create_project(project)
    return created()

@router.get("/{title}", response_model=ResponseModel[ProjectResponse],
            summary="프로젝트 단일 조회", description="프로젝트 이름으로 조회")
async def get_project(title: str):
    project = service.get_project(title)
    return ok(data=ProjectResponse(project=project))

@router.get("/", response_model=ResponseModel[ProjectsResponse],
            summary="프로젝트 목록 조회", description="")
async def get_projects():
    projects = service.get_projects()
    return ok(data=ProjectsResponse(total_project_count=len(projects), projects=projects))

@router.put("", response_model=ResponseModel[bool],
            summary="프로젝트 정보 수정", description="변경 전 프로젝트 이름, 설명 포함 필요")
async def update_project(project: UpdatedProject):
    service.update_project(project)
    return ok(True)

@router.delete("", response_model=ResponseModel,
               summary="프로젝트 삭제", description="프로젝트 이름으로 삭제")
async def delete_project(title: str):
    service.delete_project(title)
    return no_content()