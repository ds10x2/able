from src.device.schema import Device
from src.response.schemas import ImmutableBaseModel

class DeviceListResponse(ImmutableBaseModel):
    devices: list[Device]