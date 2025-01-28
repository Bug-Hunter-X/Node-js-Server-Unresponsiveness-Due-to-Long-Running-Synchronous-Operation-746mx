const http = require('http');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const server = http.createServer((req, res) => {
    // Simulate a long-running task - now handled asynchronously
    let count = 0;
    const startTime = Date.now();
    function longRunningTask(i) {
      if(i === 1000000000){
        const endTime = Date.now();
        console.log('Time taken: ' + (endTime - startTime) + ' ms');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World');
        return;
      }
      count += i;
      setImmediate(() => longRunningTask(i+1));
    }
    longRunningTask(0);
  });

  server.listen(3000, () => {
    console.log(`Worker ${process.pid} started on port 3000`);
  });
}
