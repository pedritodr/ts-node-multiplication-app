import { SaveFile } from "./save-file.use-case";
import fs from "fs";
describe("save-file.use-case", () => {
  const customOptions = {
    fileContent: "custom content",
    fileDestination: "custom-outputs/file-destination",
    fileName: "custom-table-name",
  };

  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

  afterEach(() => {
    const fileOutputExist = fs.existsSync("outputs");
    if (fileOutputExist) fs.rmSync("outputs", { recursive: true });
  });

  test("should save file with default values", () => {
    const saveFile = new SaveFile();
    const filePath = "outputs/table.txt";
    const options = {
      fileContent: "test content",
    };

    const result = saveFile.execute(options);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });

    expect(result).toBeTruthy();
    expect(fileExists).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });

  test("should save file with custom values", () => {
    const saveFile = new SaveFile();

    const result = saveFile.execute(customOptions);
    const fileExists = fs.existsSync(customFilePath);
    const fileContent = fs.readFileSync(customFilePath, {
      encoding: "utf8",
    });

    expect(result).toBeTruthy();
    expect(fileExists).toBeTruthy();
    expect(fileContent).toBe(customOptions.fileContent);
  });

  test("should return false if directory  could not be created", () => {
    const saveFile = new SaveFile();
    const mkirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("This is a custom error message from testing");
    });

    const result = saveFile.execute(customOptions);
    expect(result).toBeFalsy();
    mkirSpy.mockRestore();
  });

  test("should return false if file could not be created", () => {
    const saveFile = new SaveFile();
    const writeFileSpy = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {
        throw new Error("This is a custom write error message from testing");
      });

    const result = saveFile.execute(customOptions);
    expect(result).toBeFalsy();
    writeFileSpy.mockRestore();
  });
});
