export interface CreateTableOptions {
  base: number;
  limit?: number;
}

export interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string;
}

export class CreateTable implements CreateTableUseCase {
  constructor() {}

  execute({ base, limit = 10 }: CreateTableOptions) {
    let bodyTable: string = "";

    for (let i = 0; i <= limit; i++) {
      bodyTable += `${base} x ${i} = ${base * i}`;
      if (i < limit) bodyTable += "\n";
    }
    return bodyTable;
  }
}
