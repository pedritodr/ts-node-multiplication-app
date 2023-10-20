import { ServerApp } from "./presentation/server-app";

describe("App test", () => {
  test("should call Server.run with values", async () => {
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;
    process.argv = [
      "node",
      "app.ts",
      "-b",
      "10",
      "-s",
      "-l",
      "10",
      "-n",
      "name file",
      "-d",
      "custom-outputs",
    ];

    await import("./app");

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 10,
      limit: 10,
      destination: "custom-outputs",
      name: "name file",
      show: true,
    });
  });
});
