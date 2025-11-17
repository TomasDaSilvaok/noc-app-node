import { LevelSeverityLog, LogEntity } from "../entities/logEntity.entity";

export abstract class LogDatasource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LevelSeverityLog): Promise<LogEntity[]>;
}
