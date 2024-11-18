---
sidebar_position: 1
---

# 파일 시스템 구조

컨테이너 환경에서 파일 시스템 구조입니다.

## ABLE 디렉터리

```
/able
│
└── /v1
    │
    ├── /blocks                                         # 블록 정보 저장 폴더
    │   └── /layer                                      # 블록 타입별 폴더
    │       ├── block1.json                             # 블록 메타데이터
    │       └── block2.json
    │
    └── /data                                           # 사용자 데이터 저장 폴더
        ├── /deploy                                     # 배포 관리 폴더
        │   ├── metadata.json                           # 배포 메타데이터
        │   └── {path_name}.json                        # API 정보
        │
        ├── /devices                                    # 사용자 디바이스 관리 폴더
        |   └── device_A.json                           # 사용자 디바이스_A 파일
        |
        └── /projects                                   # 프로젝트 관리 폴더
```

### blocks

다음을 이름으로 가지는 디렉터리 하위로 `블록.json` 파일을 가집니다.

- **Transform**
- **Layer**
- **Activation**
- **Loss**
- **Operation**
- **Optimizer**
- **Module**

**블록** 상세 정보는 [AI 모델 만들기](../tutorial-block-coding/make-model.md)를 참고해주세요.

### deploy

만들어진 모델을 **배포**하기 위한 설정 파일들을 포함한 디렉터리입니다.

- `metadata.json` : fast API 서버의 메타데이터를 저장하고 있습니다.
- `path_name.json` : 개별 API 메타데이터를 저장하고 있습니다.

### devices

사용자의 **학습 장치**를 관리하는 디렉터리로 `device_A.json`파일에 개별 학습 장치 정보와 상태를 포함하고 있습니다.

## 프로젝트 디렉터리

개별 프로젝트 디렉터리의 구조입니다.

```
/projects
│
└── /project_A
    │
    ├── metadata.json                                   # 프로젝트 메타데이터
    ├── thumbnail.jpg                                   # 썸네일 이미지
    ├── block_graph.json                                # 현재 작성 중인 모델 구성 요소 정보
    │
    └── /train_results                                  # 학습 결과 폴더
        └── /20240101_000000                            # 첫 번째 학습 결과 폴더
            │
            ├── metadata.json                           # 학습결과 메타데이터
            ├── hyper_parameter.json                    # 하이퍼 파라미터
            ├── block_graph.json                        # 모델 구성 요소 정보
            ├── performance_metrics.json                # 성능 지표 테이블
            ├── f1_score.json                           # F1-score
            ├── confusion_matrix.jpg                    # 혼동 행렬 이미지
            ├── transform_pipeline.pickle               # 데이터 전처리 모듈
            │
            └── /checkpoints                            # 체크포인트 저장 폴더
                ├── /train_best                         # 최적의 학습 결과
                │   ├── model.pth                       # 모델 파일
                │   ├── heatmap.jpg                     # 히트맵 이미지
                │   ├── original.jpg                    # 원본 이미지
                │   ├── analysis_result.json            # 분석 결과
                │   └── /feature_maps                   # 피처 맵 저장 폴더
                │       ├── layers.Ablock.jpg           # A 블록 피처 맵
                │       └── layers.Bblock.jpg           # B 블록 피처 맵
                │
                ├── /valid_best                         # 최적의 검증 결과
                │   └── 동일한 구조
                │
                ├── /final                              # 최종 결과
                │   └── 동일한 구조
                │
                └── /epoch_10                           # 10번째 에포크 결과
                    └── 동일한 구조

```
