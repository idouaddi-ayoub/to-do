import EventEmitter from "eventemitter3";

let eventEmitter: EventEmitter | null = null;

export default function useEventEmitter() {
  if (!eventEmitter) eventEmitter = new EventEmitter();

  return eventEmitter;
}
