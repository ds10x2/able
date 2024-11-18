---
sidebar_position: 2
---

# 시작하기

ABLE을 사용하기 위한 초기 설정을 해봅시다.

## 사전 준비

ABLE을 사용하기 위해서는 Docker 설치가 필요합니다. [Docker 공식 웹사이트](https://www.docker.com/)를 방문해 Docker 관련 정보를 확인하세요.

## 도커 이미지 받기

최신 버전의 **Docker**가 설치되어 있는지 확인한 다음 명령줄에 다음 명령을 실행합니다.

```bash
docker pull able:latest
```

현재 ABLE의 최신버전은 1.0.0 입니다.

## 도커 컨테이너 실행시키기

이미지를 다운로드한 후 컨테이너를 실행합니다.

```bash
docker run -d \
    --name $BACKEND_IMAGE \
    -p 5000:5000 \
    -p 8088:8088 \
    -e TZ=Asia/Seoul \
    -e PYTHONPATH=/app \
    $BACKEND_IMAGE

```

### 명령어 옵션 설명

`-p 5000:5000` : ABLE의 포트번호입니다.

`-p 8088:8088` : ABLE로 학습시킨 모델을 API 형태로 테스트하기 위한 서버의 포트 번호입니다.

`-e TZ=Asia/Seoul` : 시간대를 KST로 설정합니다.

`-e PYTHONPATH=/app` : 파이썬 경로를 /app으로 설정합니다.

### 추가 설정

`-v /var/lib/able/blocks:/app/able/v1/blocks` : ABLE의 블록 정보를 볼륨으로 연결합니다.

`-v /var/lib/able/projects:/app/able/v1/data/projects` : ABLE의 프로젝트 정보를 볼륨으로 연결합니다.
