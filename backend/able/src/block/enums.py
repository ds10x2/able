from enum import Enum

class BlockType(str, Enum):
    TRANSFORM = "transform"
    LAYER = "layer"
    ACTIVATION = "activation"
    LOSS = "loss"
    OPERATION = "operation"
    OPTIMIZER = "optimizer"
    MODULE = "module"
    DATA = "data"
    INTERPRETER = "interpreter"

class ArgType(str, Enum):
    INT = "int"
    FLOAT = "float"
    BOOL = "bool"