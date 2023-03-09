import packageData from "../../package.json";
import dataUriToBuffer from "./data-uri-to-buffer";

const UPLOAD_IO_ACCOUNT_ID = process.env.NEXT_PUBLIC_UPLOAD_IO_ACCOUNT_ID;
const UPLOAD_IO_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_UPLOAD_IO_PUBLIC_API_KEY;

export default async function uploadFile(scribbleDataURI : any) {
    // @ts-ignore
    const uploadManager = new Upload.UploadManager(
        // @ts-ignore
        new Upload.Configuration({
            apiKey: UPLOAD_IO_PUBLIC_API_KEY // e.g. "public_xxxxx"
        })
    );

    const { fileUrl } = await uploadManager.upload({
        accountId: UPLOAD_IO_ACCOUNT_ID,
        data: dataUriToBuffer(scribbleDataURI),
        mime: "image/png",
        originalFileName: "scribble_input.png",
        path: {
            // See path variables: https://upload.io/docs/path-variables
            folderPath: `/uploads/${packageData.name}/${packageData.version}/{UTC_DATE}`,
            fileName: "{ORIGINAL_FILE_NAME}_{UNIQUE_DIGITS_8}{ORIGINAL_FILE_EXT}",
        },
        metadata: {
            userAgent: navigator.userAgent,
        },
    });

    return fileUrl;
}