import { auth } from "auth";
import mime from "mime";
import { google } from "googleapis";
import axios from "axios";
// import { setUploadProgress } from "../../../components/sse23/route";

let progress = 0;

export const POST = auth(async (req) => {
  if (!req.auth) {
    return Response.json({ msg: "Not authenticated" }, { status: 401 });
  }

  const { link } = await req.json();

  if (!link) {
    return Response.json({ msg: "No link provided" }, { status: 400 });
  }

  const response = await axios({
    method: "get",
    url: link,
    responseType: "stream",
  });

  console.log("Downloading file");

  const fileSize = response.headers["content-length"];
  const contentType = response.headers["content-type"];
  const ext = mime.getExtension(contentType);
  const fileName = `${Date.now()}.${ext}`;

  // Authenticate with Google
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: req.auth?.accessToken });

  const drive = google.drive({ version: "v3", auth: oauth2Client });

  console.log("Uploading file to Google Drive");
  // Upload the file to Google Drive
  drive.files.create(
    {
      requestBody: {
        name: fileName,
        mimeType: contentType,
      },
      media: {
        mimeType: contentType,
        body: response.data,
      },
    },
    {
      onUploadProgress: (e) => {
        progress = Math.round((e.bytesRead / fileSize) * 100);
        // setUploadProgress(progress);
      },
    }
  );
  return Response.json({ msg: "File is being uploaded" });
});

export const GET = () => {
  console.log(`data: ${progress}\n\n`);
  return new Response(`data: ${progress}\n\n`, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
};

// TODO: add a loading state to the button, while the file is being uploaded
// TODO: add a toast notification when the file has been uploaded
// TODO: add the uploaded file to the list of uploaded files
// TODO: add a progress bar to show the progress of the file upload
// TODO: favicon
// TODO: responsive design
// TODO: no url provided error
