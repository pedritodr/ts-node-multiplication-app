const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  const { argv } = await import("./argv.plugin");
  return argv;
};

describe("Test argv.plugin", () => {
  const originalArgv = process.argv;
  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });
  test("should return default values", async () => {
    const yarg = await runCommand(["-b", "5"]);

    expect(yarg).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: "multiplication table",
        d: "outputs",
      })
    );
  });

  test("should return configuration with custom values", async () => {
    const yarg = await runCommand([
      "-b",
      "6",
      "-l",
      "20",
      "-n",
      "custom name",
      "-d",
      "custom/outputs",
      "-s",
    ]);

    expect(yarg).toEqual(
      expect.objectContaining({
        b: 6,
        l: 20,
        s: true,
        n: "custom name",
        d: "custom/outputs",
      })
    );
  });
});
