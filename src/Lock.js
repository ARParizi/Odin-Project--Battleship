export class Lock {
  constructor() {
    this._queue = Promise.resolve(); // promise chain
  }

  async acquire() {
    let release;
    const ticket = new Promise(resolve => release = resolve);

    // Add this ticket to the chain
    const prev = this._queue;
    this._queue = this._queue.then(() => ticket);

    // Wait for the previous to finish
    await prev;

    // Return the release function (to be called later!)
    return release;
  }
}