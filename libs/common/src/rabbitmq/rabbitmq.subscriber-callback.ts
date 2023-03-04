export class RabbitMQSubscriberCallback<T> {
  private callback: (message: T) => Promise<void>;
  constructor(callback: (message: T) => Promise<void>) {
    this.callback = callback;
  }

  async onReceiveMessage(message: string): Promise<void> {
    // add a retry mechanism on the promise
    const object = JSON.parse(message) as T;
    await this.callback(object);
  }
}
