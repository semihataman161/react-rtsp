import { useRef, useState } from 'react';
import { loadPlayer, Player } from 'rtsp-relay/browser';
import { PlayIcon, PauseIcon, EnterFullScreenIcon } from '@radix-ui/react-icons';
import LoadingBox from '../LoadingBox';

interface IProps {
    webSocketEndpoint: string;
    rtspUserName: string;
    rtspPassword: string;
    rtspUrl: string;
}

export default function RTSPPlayer({ webSocketEndpoint, rtspUserName, rtspPassword, rtspUrl }: IProps) {
    const [player, setPlayer] = useState<Player | null>(null);
    const [isPaused, setPaused] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const canvas = useRef<HTMLCanvasElement>(null);

    const splittedRtspUrl = rtspUrl.split('rtsp://').pop();
    const url = `${webSocketEndpoint}/?url=rtsp://${rtspUserName}:${rtspPassword}@${splittedRtspUrl}`

    const handleStartStreamClick = async () => {
        try {
            if (!canvas.current) throw new Error('Ref is null');

            const CONNECTION_TIMEOUT = 10000;
            const timer = setTimeout(() => {
                setShowWarning(true);
                setLoading(false);
            }, CONNECTION_TIMEOUT);

            setLoading(true);

            const Player = await loadPlayer({
                url,
                canvas: canvas.current,
                videoBufferSize: 1024 * 1024 * 50,
            });

            clearTimeout(timer);
            setShowWarning(false);
            setPlayer(Player);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleTogglePlayClick = () => {
        if (player) {
            if (isPaused) {
                player.play();
            } else {
                player.pause();
            }

            setPaused(!isPaused);
        }
    };

    const handleFullScreenClick = () => {
        canvas.current?.requestFullscreen();
    };

    return (
        <div className="flex flex-col my-2 w-1/2">
            <div className="flex-1 relative">
                <div className="flex flex-grow justify-center items-center text-center">
                    {isLoading &&
                        <LoadingBox />
                    }
                    {showWarning
                        ? (
                            <p className="text-white">
                                Warning: Connection timeout.
                                <br />
                                Please check the websocket and RTSP informations and try again.
                            </p>
                        )
                        : (
                            <canvas className="w-full h-full" ref={canvas} />
                        )}
                </div>
            </div>
            {(!isLoading && !showWarning) &&
                <div className="flex justify-center items-center my-4">
                    <div>
                        {player
                            ? (
                                <button onClick={handleTogglePlayClick} >
                                    {isPaused
                                        ? (
                                            <PlayIcon className='cursor-pointer w-6 h-6 text-white mr-2' />
                                        )
                                        : (
                                            <PauseIcon className='cursor-pointer w-6 h-6 text-white mr-2' />
                                        )}
                                </button>
                            )
                            : (
                                <button onClick={handleStartStreamClick}>
                                    <PlayIcon className='cursor-pointer w-6 h-6 text-white mr-2' />
                                </button>
                            )}
                        <button onClick={handleFullScreenClick}>
                            <EnterFullScreenIcon className='cursor-pointer w-6 h-6 text-white' />
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}