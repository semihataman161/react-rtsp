# 1. Open a new terminal and do the following for rtsp-server:

- ## Go to the rtsp-server directory
  ```
  cd .\rtsp-server\
  ```
- ## Install dependencies
  ```
  npm install
  ```
- ## Start the server
  ```
  npm start
  ```
- ## Check if the server is running
  Send http get request to the url below:
  <br /> <br />
  ```
  localhost:2000/healthCheck
  ```
  If you see 'Server is running and healthy' message then you can proceed to the following items.

<br />

# 2. Open another terminal and do the following for rtsp-client:

- ## Go to the rtsp-client directory
  ```
  cd .\rtsp-client\
  ```
- ## Install dependencies
  ```
  npm install
  ```
- ## Start the client
  ```
  npm run dev
  ```
