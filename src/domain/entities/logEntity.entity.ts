export enum LevelSeverityLog {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  public level: LevelSeverityLog;
  public message: string;
  public createdAt: Date;

  constructor(message: string, level: LevelSeverityLog) {
    this.message = message;
    this.level = level;
    this.createdAt = new Date();
  }

  static fromJson(jsonString: string): LogEntity {
    const { message, level, createdAt } = JSON.parse(jsonString);
    const newLog = new LogEntity(message, level);

    newLog.createdAt = new Date(createdAt);
    return newLog;
  }
}
