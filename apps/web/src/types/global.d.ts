interface RequestWindowOptions {
  width?: number;
  height?: number;
}

interface DocumentPictureInPicture {
  requestWindow: (options?: RequestWindowOptions) => Promise<Window>;
}

interface Window {
  documentPictureInPicture: DocumentPictureInPicture;
}
