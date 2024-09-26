import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
    if (!file || !file.originalname || !file.buffer) {
        throw new Error("Invalid file format.");
    }

    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString(); // Use file.originalname to get the extension
    return parser.format(extName, file.buffer); // Format with the file's buffer data
};

export default getDataUri;