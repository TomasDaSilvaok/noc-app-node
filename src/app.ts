import { CheckService } from "./domain/use-cases/checks/check-service";
import { CronService } from "./presentation/cron/cron-service";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

function main() {
  Server.start();

  const url = "https://google.com";
  const job1 = CronService.createJob("*/5 * * * * *", () => {
    // new CheckService().execute("http://localhost:3000/posts");
    new CheckService(
        () => { console.log(`${url} is ok!`)},
        (error) => {console.log(error);}
    ).execute(url);
  });

  job1.stop();
}


