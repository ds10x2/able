from src.domain.deploy.service import DeployService
from src.domain.deploy.repository import DeployRepository

def get_deploy_service() -> DeployService:
    repository = DeployRepository()
    return DeployService(repository=repository)