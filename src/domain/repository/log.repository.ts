import { LevelSeverityLog, LogEntity } from "../entities/logEntity.entity";

export abstract class LogRepostory {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LevelSeverityLog): Promise<LogEntity[]>;
}
