---
sidebar_position: 2
---

# 시작하기

ABLE을 사용하기 위한 초기 설정을 해봅시다.

---

## 사전 준비

ABLE을 사용하기 위해서는 Docker 설치가 필요합니다. [Docker 공식 웹사이트](https://www.docker.com/)를 방문해 Docker 관련 정보를 확인하세요.

## 도커 이미지 받기

최신 버전의 **Docker**가 설치되어 있는지 확인한 다음 명령줄에 다음 명령을 실행합니다.

```bash
docker pull ai-block-editor:latest
```

현재 ABLE의 최신버전은 1.0.0 입니다.

## 도커 컨테이너 실행시키기

이미지를 다운로드한 후 컨테이너를 실행합니다.

```bash
docker run -d \
    --name able \
    -p 5000:5000 \
    -p 8088:8088 \
    -e TZ=Asia/Seoul \
    -e PYTHONPATH=/app \
    --gpus all \
    ai-block-editor

```

### 명령어 옵션 설명

`-p 5000:5000` : ABLE의 포트번호입니다.

`-p 8088:8088` : ABLE로 학습시킨 모델을 API 형태로 테스트하기 위한 서버의 포트 번호입니다.

`-e TZ=Asia/Seoul` : 시간대를 KST로 설정합니다.

`-e PYTHONPATH=/app` : 파이썬 경로를 /app으로 설정합니다.

`--gpus all` : 모든 GPU를 컨테이너에 할당합니다. 

### 추가 설정

아래 명령어를 통해 데이터를 컨테이너 외부로 저장하고 관리할 수 있습니다:

`-v /var/lib/able/blocks:/app/able/v1/blocks` : 로컬 디렉토리 `/var/lib/able/blocks`를 컨테이너 내 `/app/able/v1/blocks` 경로에 마운트하여, ABLE의 블록 정보를 영구적으로 저장합니다.

`-v /var/lib/able/projects:/app/able/v1/data/projects` : 로컬 디렉토리 `/var/lib/able/projects`를 컨테이너 내 `/app/able/v1/data/projects` 경로에 마운트하여, 프로젝트 정보를 영구적으로 저장합니다.
