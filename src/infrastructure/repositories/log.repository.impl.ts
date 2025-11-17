import { LogDatasource } from "../../domain/datasources/log.datasource";
import {
  LogEntity,
  LevelSeverityLog,
} from "../../domain/entities/logEntity.entity";
import { LogRepostory } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepostory {
  constructor(private readonly logDatasource: LogDatasource) {}

  async saveLog(log: LogEntity): Promise<void> {
    this.logDatasource.saveLog(log);
  }

  getLogs(severityLevel: LevelSeverityLog): Promise<LogEntity[]> {
    return this.getLogs(severityLevel);
  }
}
