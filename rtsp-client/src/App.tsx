import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import RTSPPlayer from './components/RTSPPlayer';

function App() {
  return (
    <>
      <Theme>
        <div className='flex justify-center items-center h-screen bg-blue-500'>
          {/* Enter your websocket and RTSP informations here */}
          <RTSPPlayer
            webSocketEndpoint='ws://localhost:2000/api/stream'
            rtspUserName='admin'
            rtspPassword='12345'
            rtspUrl='rtsp://192.168.1.210:554/Streaming/Channels/101'
          />
        </div>
      </Theme>
    </>
  )
}

export default App;

<RTSPPlayer
  webSocketEndpoint='ws://localhost:2000/api/stream'
  rtspUserName='admin'
  rtspPassword='12345'
  rtspUrl='rtsp://192.168.1.210:554/Streaming/Channels/101'
/> 