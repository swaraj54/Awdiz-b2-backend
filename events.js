import events from "events";

const myEmitter = new events.EventEmitter();

myEmitter.on("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

myEmitter.emit("greet", "Alice");
