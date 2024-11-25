FROM python:3.11.9

ENV APPLICATION_NAME=able
ENV VERSION=v1

ENV HOME=/app
ENV PORT=5000

WORKDIR $HOME

RUN apt-get update && apt-get install -y libgl1-mesa-glx && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt && rm requirements.txt
RUN pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

COPY setup ./setup
RUN python3 setup/install.py

COPY src ./src
COPY deploy_server ./deploy_server
COPY static ./static


EXPOSE $PORT

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "5000", "--workers", "3"]
