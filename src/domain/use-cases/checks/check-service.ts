interface CheckServiceUseCase {
  execute: (url: string) => Promise<boolean>;
}

type SuccsessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly succsessCallback: SuccsessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);

      if (!req.ok) {
        throw Error(`${url} is not working!`);
      }

      this.succsessCallback();
      return true;
    } catch (error) {
      this.errorCallback(`$${error}`);
      return false;
    }
  }
}
