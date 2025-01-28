# Node.js Server Unresponsiveness

This repository demonstrates a common issue in Node.js servers: unresponsiveness caused by long-running synchronous operations within the request handler.  The `server.js` file contains a server that performs a computationally intensive task (a large loop) before sending a response. This blocks the event loop, preventing the server from handling other requests.

The solution, `serverSolution.js`, demonstrates how to fix the problem by using asynchronous operations or offloading the task to a worker thread.