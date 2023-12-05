import fs from "fs";

//todo Change this to a database call with fallback to json in public folder
export const getSiteData = (fileName: string) => {
  try {
    const data = fs.readFileSync(fileName, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error occurred:", error);
    throw new Error(`Failed to retrieve data from ${fileName}`);
  }
};
