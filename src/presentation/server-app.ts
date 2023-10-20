import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface OptionsRun {
  base: number;
  limit: number;
  show: boolean;
  name: string;
  destination: string;
}

export class ServerApp {
  static run({ base, limit, show, name, destination }: OptionsRun) {
    console.log("server app started");
    const table = new CreateTable().execute({ base, limit });
    const wasCreated = new SaveFile().execute({
      fileContent: table,
      fileDestination: destination,
      fileName: name,
    });
    wasCreated ? console.log("File created") : console.log("Error");
    if (show) console.log(table);
  }
}
