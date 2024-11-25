from typing import Any
from pydantic import BaseModel

class InferenceResponse(BaseModel):
    label: Any
    probability: float