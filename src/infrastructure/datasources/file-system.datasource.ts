import fs from "node:fs";

import { LogDatasource } from "../../domain/datasources/log.datasource";
import {
  LogEntity,
  LevelSeverityLog,
} from "../../domain/entities/logEntity.entity";

export class FileSystemDatasource implements LogDatasource {
  private readonly logsPath = "logs/";
  private readonly allLogsPath = "logs/logs-all.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-high.log";

  constructor() {
    this.createLogFiles();
  }

  private createLogFiles() {
    if (!fs.existsSync(this.logsPath)) {
      fs.mkdirSync(this.logsPath);
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (!fs.existsSync(path)) {
          fs.writeFileSync(path, "");
        }
      }
    );
  }

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`;

    if (newLog.level === LevelSeverityLog.low)
      return fs.appendFileSync(this.allLogsPath, logAsJson);

    if (newLog.level === LevelSeverityLog.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson);
    } else {
      fs.appendFileSync(this.highLogsPath, logAsJson);
    }
  }

  private getLogsFromFile(path: string): LogEntity[] {
    const content = fs.readFileSync(path, "utf-8");
    const logs = content.split("\n").map(LogEntity.fromJson);

    return logs;
  }

  async getLogs(severityLevel: LevelSeverityLog): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LevelSeverityLog.low:
        return this.getLogsFromFile(this.allLogsPath);
      case LevelSeverityLog.medium:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LevelSeverityLog.high:
        return this.getLogsFromFile(this.highLogsPath);
      default:
        throw new Error(`${severityLevel} not implemented!`);
    }
  }
}
