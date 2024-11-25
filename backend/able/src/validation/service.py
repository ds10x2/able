from collections import defaultdict, deque
from typing import Tuple
from src.canvas.schemas import Edge


def check_cycle(blocks: list[int], edges: list[Edge]) -> Tuple[bool, list[int]]:
    """
    Canvas 객체 내의 방향 그래프에서 사이클이 존재하는지 위상 정렬을 통해 판별하고,
    사이클에 포함된 블록들을 반환

    :param blocks: 블록 ID 목록 (문자열로 구성)
    :param edges: 간선 정보가 담긴 Edge 객체 목록
    :return: (사이클 존재 여부, 사이클에 포함된 블록 리스트)
    """
    adj_blocks = defaultdict(list)
    in_degree = defaultdict(int)

    for edge in edges:
        adj_blocks[edge.source].append(edge.target)
        in_degree[edge.target] += 1

    queue = deque([block for block in blocks if in_degree[block] == 0])
    visited_count = 0

    while queue:
        node = queue.popleft()
        visited_count += 1
        for adj_block in adj_blocks.pop(node, []):
            in_degree[adj_block] -= 1
            if in_degree[adj_block] == 0:
                queue.append(adj_block)

    if visited_count != len(blocks):
        cycle_blocks = [block for block in blocks if in_degree[block] > 0]
        return True, cycle_blocks

    return False, []