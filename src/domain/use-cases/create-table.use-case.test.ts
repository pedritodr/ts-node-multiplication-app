import { CreateTable } from "./create-table.use-case";
describe("create-table.use-case", () => {
  test("should create table with default values", () => {
    const createTable = new CreateTable();

    const table = createTable.execute({ base: 2 });

    const rows = table.split("\n").length;

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(rows).toBe(11);
    expect(table).toContain("2 x 0 = 0");
    expect(table).toContain("2 x 10 = 20");
  });

  test("should create table with custom values", () => {
    const options = {
      base: 3,
      limit: 20,
    };
    const createTable = new CreateTable();

    const table = createTable.execute(options);

    const rows = table.split("\n").length;

    expect(rows).toBe(21);
    expect(table).toContain("3 x 0 = 0");
    expect(table).toContain("3 x 10 = 30");
  });
});
