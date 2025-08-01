"use client";

import { useState, useRef } from "react";
import { Box, Button, Stack } from "@mui/material";

export default function CameraUploader({
  onImageSelect,
}: {
  onImageSelect: (image: string) => void;
}) {
  const [streaming, setStreaming] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      setStreaming(true);
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      onImageSelect(dataUrl);
    }
  };

  const stopCamera = () => {
    const video = videoRef.current;
    const stream = video?.srcObject as MediaStream;
    stream?.getTracks().forEach((track) => track.stop());
    setStreaming(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onImageSelect(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Stack spacing={2} alignItems="center">
      {!streaming && (
        <Button variant="contained" onClick={startCamera}>
          Start Camera
        </Button>
      )}
      {streaming && (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: 320, height: 240, borderRadius: 10 }}
          />
          <Button variant="outlined" onClick={capturePhoto}>
            Capture
          </Button>
          <Button color="error" onClick={stopCamera}>
            Stop
          </Button>
        </>
      )}

      <input
        accept="image/*"
        type="file"
        onChange={handleFileUpload}
        style={{ display: "none" }}
        id="upload-button"
      />
      <label htmlFor="upload-button">
        <Button variant="contained" component="span">
          Upload Image
        </Button>
      </label>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </Stack>
  );
}
