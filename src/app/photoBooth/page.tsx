"use client";

import { useRef, useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

const frameList = [
  { name: "None", value: null },
  { name: "Vintage Frame", value: "/frames/frame1.png" }, 
];

const effectList = ["none", "grayscale(100%)", "sepia(100%)"];

export default function PhotoBooth() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frame, setFrame] = useState<string | null>(frameList[1].value);
  const [effect, setEffect] = useState(effectList[0]);
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => console.error("Camera error:", err));
  }, []);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const video = videoRef.current;
      const width = video.videoWidth;
      const height = video.videoHeight;

      canvasRef.current.width = width;
      canvasRef.current.height = height;

      if (!ctx) return;

      ctx.save();
      ctx.filter = effect;

      if (frame) {
        ctx.beginPath();
        ctx.ellipse(
          width * 0.5, 
          height * 0.55, 
          width * 0.32, 
          height * 0.35, 
          0,
          0,
          Math.PI * 2
        );
        ctx.clip();
      }

      ctx.drawImage(video, 0, 0, width, height);
      ctx.restore();

      if (frame) {
        const frameImg = new Image();
        frameImg.src = frame;
        frameImg.onload = () => {
          ctx.drawImage(frameImg, 0, 0, width, height);
          const dataUrl = canvasRef.current!.toDataURL("image/png");
          savePhoto(dataUrl);
        };
      } else {
        const dataUrl = canvasRef.current.toDataURL("image/png");
        savePhoto(dataUrl);
      }
    }
  };

  const savePhoto = (dataUrl: string) => {
    setPhotos((prev) => [dataUrl, ...prev].slice(0, 5));
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        📸 Photo Booth
      </Typography>

      <Grid container spacing={3}>
        <Grid size={8}>
          <Box
            sx={{
              position: "relative",
              width: 400,
              height: 520,
              mx: "auto",
              backgroundColor: "transparent",
              overflow: "visible",
            }}
          >
            <video
              ref={videoRef}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
                filter: effect,
                clipPath: frame ? "ellipse(32% 35% at 50% 52%)" : "none",
                WebkitClipPath: frame ? "ellipse(32% 35% at 50% 52%)" : "none",
              }}
              playsInline
              muted
            />
            {frame && (
              <img
                src={frame}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              />
            )}
          </Box>

          <Box mt={2} display="flex" gap={2}>
            <FormControl size="small">
              <InputLabel>Frame</InputLabel>
              <Select
                value={frame || ""}
                onChange={(e) =>
                  setFrame(e.target.value === "" ? null : e.target.value)
                }
                label="Frame"
              >
                {frameList.map((f) => (
                  <MenuItem key={f.name} value={f.value || ""}>
                    {f.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small">
              <InputLabel>Effect</InputLabel>
              <Select
                value={effect}
                onChange={(e) => setEffect(e.target.value)}
                label="Effect"
              >
                {effectList.map((e) => (
                  <MenuItem key={e} value={e}>
                    {e === "none" ? "None" : e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="contained" onClick={capturePhoto}>
              Capture
            </Button>
          </Box>
        </Grid>

        <Grid size={4}>
          <Typography variant="h6">Last Photos</Typography>
          {photos.map((p, i) => (
            <Box
              key={i}
              mt={2}
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: 240,
                mx: "auto",
                aspectRatio: "3/4",
              }}
            >
              <img
                src={p}
                alt={`photo-${i}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  clipPath: frame ? "ellipse(32% 35% at 50% 52%)" : "none",
                  WebkitClipPath: frame
                    ? "ellipse(32% 35% at 50% 52%)"
                    : "none",
                }}
              />

              {frame && (
                <img
                  src={frame}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    pointerEvents: "none",
                    zIndex: 2,
                  }}
                />
              )}
            </Box>
          ))}
        </Grid>
      </Grid>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </Container>
  );
}
