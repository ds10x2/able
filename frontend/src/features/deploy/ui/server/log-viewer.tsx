import { useEffect, useRef, useState } from 'react';

import { LogContainer, LogText } from '@features/deploy/ui/server/log-viewer.style';

import Spinner from '@/shared/ui/loading/spinner';

const LogViewer = () => {
  const websocketUrl = import.meta.env.VITE_WEBSOCKET_URL;
  const ws = useRef<WebSocket | null>(null);
  const logRef = useRef<HTMLDivElement | null>(null);
  const [logs, setLogs] = useState<string>('');

  useEffect(() => {
    let isUnmounted = false;

    const connectWebSocket = () => {
      ws.current = new WebSocket(websocketUrl);

      ws.current.onopen = () => {
        if (isUnmounted) return;
        setLogs('');
      };

      ws.current.onmessage = (event) => {
        if (isUnmounted) return;
        setLogs(event.data);
      };

      ws.current.onclose = () => {
        if (isUnmounted) return;
        setLogs('WebSocket Disconnected');

        // 컴포넌트가 언마운트되지 않았을 때만 재연결 시도
        if (!isUnmounted) {
          setTimeout(connectWebSocket, 5000);
        }
      };

      ws.current.onerror = () => {
        if (isUnmounted) return;
        setLogs('WebSocket connection error occurred.');
      };
    };

    connectWebSocket();

    return () => {
      isUnmounted = true;

      if (ws.current) {
        ws.current.onopen = null;
        ws.current.onmessage = null;
        ws.current.onclose = null;
        ws.current.onerror = null;

        if (ws.current.readyState === WebSocket.OPEN) {
          ws.current.close();
        }
      }
    };
  }, [websocketUrl]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  return <LogContainer ref={logRef}>{logs ? <LogText>{logs}</LogText> : <Spinner height={5} />}</LogContainer>;
};

export default LogViewer;
