import { useEffect, useState, useRef, useCallback } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import logger from '@/utils/datadogLogger'

type SocketStatusType =
    | 'Connecting'
    | 'Open'
    | 'Closing'
    | 'Closed'
    | 'Uninstantiated'
    | 'Error';

export interface UseSocketProps {
    url: string;
    onConnected?: () => void;
    onMessage: (message: unknown) => void;
    onError?: (message: unknown) => void;
    onClose?: (event: CloseEvent) => void;
}

const RECONNECT_TIMEOUT = 2000; // 2 seconds
//const MAX_RECONNECT_ATTEMPTS = 3; // Maximum number of reconnection attempts

export function useSocket({
    url,
    onMessage,
    onConnected,
    onError,
    onClose
}: UseSocketProps) {
    const [reconnecting, setReconnecting] = useState(false);
    const [reconnectAttempts, setReconnectAttempts] = useState(0);
    const [errorStatus, setErrorStatus] = useState(false);
    const reconnectTimeout = useRef<number | null>(null);
    const [socketUrl, setSocketUrl] = useState(`${url}/ws`);

    useEffect(() => {
        setSocketUrl(`${url}/ws`);
    }, [url]);

    const reconnect = useCallback(() => {
        setSocketUrl(`${url}/ws?t=${Date.now()}`);
    }, [url]);

    const { sendJsonMessage, readyState } = useWebSocket(
        socketUrl,
        {
            onMessage: (event: MessageEvent<unknown>) => {
                onMessage(event.data);
            },
            onError: (event: Event) => {
                onError?.(event);
                attemptReconnect();
            },
            onClose: (event: CloseEvent) => {
                console.warn('WebSocket connection closed:', event);
                onClose?.(event);
                attemptReconnect();
            },
            shouldReconnect: () => false  // Disable the built-in reconnection to control it manually
        }
    );

    // Function to attempt reconnection
    const attemptReconnect = useCallback(() => {
        // if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        //     setErrorStatus(true);
        //     logger.error('[WebSocket] HitMaxRecconects',{
        //         chatSessionId: window.context.chatSessionId,
        //     })
        //     return;
        // }

        if (!reconnecting && readyState === ReadyState.CLOSED) {
            logger.warn('[WebSocket] AttemptRecconect',{
                chatSessionId: window.context.chatSessionId,
                reconnectAttempts: reconnectAttempts
            })
            setReconnecting(true);
            setReconnectAttempts((prev) => prev + 1);
            reconnectTimeout.current = window.setTimeout(() => {
                setReconnecting(false);
                reconnect();
            }, RECONNECT_TIMEOUT); // Retry after the specified timeout
        }
    }, [reconnectAttempts, reconnecting, readyState, reconnect]);

    useEffect(() => {
        if (readyState === ReadyState.CLOSED) {
            logger.warn('[WebSocket] AttemptRecconectReadyState',{
                chatSessionId: window.context.chatSessionId,
            })
            attemptReconnect();
        } else if (readyState === ReadyState.OPEN) {
            // Clear reconnect timeout if socket successfully opens
            if (reconnectTimeout.current) {
                clearTimeout(reconnectTimeout.current);
                reconnectTimeout.current = null;
            }
            setReconnecting(false);
            setReconnectAttempts(0); // Reset attempts on successful connection
            setErrorStatus(false); // Reset error status on successful connection
            onConnected?.();
            logger.info('[WebSocket] ReconnectSuccess',{
                chatSessionId: window.context.chatSessionId,
            })
        }
    }, [readyState, onConnected, attemptReconnect]);

    // Reconnect when the app becomes visible again
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && readyState === ReadyState.CLOSED) {
                logger.warn('[WebSocket] AttemptRecconectVisibility',{
                    chatSessionId: window.context.chatSessionId,
                })
                attemptReconnect();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [readyState, attemptReconnect]);

    // Handle network status changes
    useEffect(() => {
        const handleOffline = () => {
            console.warn('Network offline, closing WebSocket connection');
            logger.warn('[WebSocket] NetworkOffline',{
                chatSessionId: window.context.chatSessionId,
            })
        };

        const handleOnline = () => {
            console.info('Network online, attempting to reconnect WebSocket');
            logger.info('[WebSocket] NetworkOnline',{
                chatSessionId: window.context.chatSessionId,
            })
            attemptReconnect();
        };

        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        return () => {
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    });

    const socketStatus = errorStatus
        ? 'Error'
        : {
            [ReadyState.CONNECTING]: 'Connecting',
            [ReadyState.OPEN]: 'Open',
            [ReadyState.CLOSING]: 'Closing',
            [ReadyState.CLOSED]: 'Closed',
            [ReadyState.UNINSTANTIATED]: 'Uninstantiated'
        }[readyState] as SocketStatusType;

    return {
        socketStatus,
        sendJsonMessage,
        reconnect
    };
}