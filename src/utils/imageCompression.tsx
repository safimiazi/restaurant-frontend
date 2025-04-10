import imageCompression from "browser-image-compression";

const compressImage = async (file: File) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 800,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(file, options);
    if (!compressedFile) {
      throw new Error("Compressed file is null");
    }
    const newFile: File = new File([compressedFile], file.name, {
      type: file.type,
    });

    return newFile;
  } catch (error) {
    console.error("Error compressing image:", error);
    return null;
  }
};

export default compressImage;
