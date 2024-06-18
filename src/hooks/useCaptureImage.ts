export const useCaptureImage = (video: HTMLVideoElement) => {
    const canvas = document.createElement('canvas');

    // scale the canvas accordingly
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        return;
    }

    // draw the video at that frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // convert it to a usable data URL
    return canvas.toDataURL('image/jpg');
};
