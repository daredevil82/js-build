# Node Basics

Node is a single-threaded asynchronous IO runtime written in Javascript.  It uses the same V8 Javascript engine that Chrome does, 
typically one minor release behind the latest Chrome release.

*Node Event Loop*

![](img/node_event_loop.png)

IO is very slow, and yet is a primary component of any server-based program.  Node mimics multiprocessing by processing other requests while IO requests execute, 
so that the idle time of the process is minimal.  This is done via async calls/callbacks.  

**Node Streams**

Stream instances are basically Unix pipes, which can be readable/writeable/both and easy to use.  With the Node API, all streams are instances of `EventEmitter`

There are four fundamental streams in Node:

* Readable - Streams from which data can be read
* Writeable - Streams to which data can be written.  Slower than Readable stream
* Duplex - Both readable and writeable
* Transform - Duplex streams that can modify or transform data as it is written

**Piping**

Allows you to attach a Writeable Stream to a Readable stream, causing it to switch automatically to flowing mode and push all the data from the Readable to Writeable.  
The data flow will be automatically managed so that the destination Writeable stream is not clogged by the faster Readable.
 
[Home](../README.md)
[Next](gulp.md)