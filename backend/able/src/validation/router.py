from fastapi import APIRouter
from starlette.responses import Response

import src.validation.service as service
from src.response.schemas import ResponseModel
from src.response.utils import ok
from src.validation.schemas import ValidateCanvasRequest, ValidateCanvasResponse

validation_router = router = APIRouter()

@router.post(
    path="/cycle",
    response_model=ResponseModel[ValidateCanvasResponse]
)
def check_cycle(request: ValidateCanvasRequest) -> Response:

    has_cycle, cycle_blocks \
        = service.check_cycle(request.blocks, request.edges)

    return ok(
        data=ValidateCanvasResponse(
            has_cycle=has_cycle,
            cycle_blocks=cycle_blocks
        )
    )

