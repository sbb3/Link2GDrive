let uploadProgress = 10; // This variable will store the upload progress

export const setUploadProgress = (progress) => {
  console.log(`progress111: ${progress}%`);
  uploadProgress = progress;
};

export const GET = () => {
  return new Response(`data: ${uploadProgress}\n\n`, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
};
