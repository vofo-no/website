import { Command } from "commander";

import { makeUtil } from "./make-util";
import { revalidateStatisticsCache } from "./revalidate-cache";
import { SsbUtil } from "./ssb-util";

const program = new Command();

program
  .name("data-utils")
  .description("Verktøy til å behandle statistikkdata for studieforbundene")
  .version("0.2.0");

program
  .command("init")
  .description(
    "Henter informasjon om fylker og kommuner for et bestemt årstall fra SSB. Lagres under /data/<årstall>.",
  )
  .argument("<year>", "årstall")
  .option("-f, --force", "overskriv eksisterende oppsett")
  .action(SsbUtil);

program
  .command("make")
  .description("Lager statistikk for årstallet")
  .argument("<year>", "årstall")
  .action(makeUtil);

program
  .command("revalidate")
  .description("Markerer at mellomlagret data må hentes på nytt.")
  .argument("<year>", "årstall")
  .argument("[hostname]", "hostname", "www.vofo.no")
  .action(revalidateStatisticsCache);

program.parse();
