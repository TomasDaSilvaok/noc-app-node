import { LevelSeverityLog, LogEntity } from "../../entities/logEntity.entity";
import { LogRepostory } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute: (url: string) => Promise<boolean>;
}

type SuccsessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepostory,
    private readonly succsessCallback: SuccsessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);

      if (!req.ok) {
        throw Error(`${url} is not working!`);
      }

      const log: LogEntity = {
        message: `Service ${url} running!`,
        level: LevelSeverityLog.low,
        createdAt: new Date(),
      };

      this.logRepository.saveLog(log);
      this.succsessCallback();
      return true;
    } catch (error) {
      const errorMsg = `${error}`;

      this.logRepository.saveLog({
        message: errorMsg,
        level: LevelSeverityLog.high,
        createdAt: new Date(),
      });
      this.errorCallback(errorMsg);
      return false;
    }
  }
}
