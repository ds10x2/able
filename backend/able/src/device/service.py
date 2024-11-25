import torch

from src.device.dto import DeviceListResponse
from src.device.schema import Device, DeviceStatus
from src.device.utils import get_device_status
from src.file.path_manager import PathManager
from src.file.utils import get_file, create_file
from src.utils import str_to_json, json_to_str

import os

path_manager = PathManager()

def get_device_list() -> DeviceListResponse:


    device_list = [Device(index=-1, name='cpu', status=get_device_status('cpu'))]

    for index in range(torch.cuda.device_count()):
        name = torch.cuda.get_device_name(index)

        device_list.append(Device(index=index, name=name, status=get_device_status(name)))

    return DeviceListResponse(devices=device_list)