import { useEffect, useRef, useState } from "react";
import { Captions, CaptionsOff, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import video from "@/assets/palak-intro.mp4.asset.json";
import compatibleVideo from "@/assets/palak-intro.webm.asset.json";
import poster from "@/assets/palak-poster.jpg.asset.json";
import voice from "@/assets/intro-voice.mp3.asset.json";
import { useIntroPlayback } from "@/components/PortfolioExperience";
import { Button } from "@/components/ui/button";

const CAPTIONS: { t: number; text: string }[] = [
  { t: 0, text: "Hi, I'm Palak Tripathi." },
  { t: 2.2, text: "I'm a Computer Science and Business Systems student" },
  { t: 5.4, text: "passionate about software development, creative technology," },
  { t: 9.2, text: "and building useful digital experiences." },
  { t: 11.8, text: "Welcome to my portfolio." },
  { t: 13.6, text: "Let me show you what I've been learning, building, and creating." },
];

type Status = "idle" | "loading" | "playing" | "paused" | "done" | "error";

export function MeetPalak() {
  const autoIntro = useIntroPlayback();
  const vRef = useRef<HTMLVideoElement>(null);
  const aRef = useRef<HTMLAudioElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [muted, setMuted] = useState(false);
  const [cc, setCc] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(18);

  useEffect(() => {
    if (!autoIntro) return;
    const v = vRef.current,
      a = aRef.current;
    if (!v || !a) return;
    setMuted(true);
    a.muted = true;
    v.muted = true;
    v.loop = true;
    v.scrollIntoView({ block: "center", behavior: "instant" });
    void v
      .play()
      .then(() => {
        setStatus("playing");
        void a.play().catch(() => {});
      })
      .catch(() => setStatus("idle"));
  }, [autoIntro]);

  useEffect(() => {
    const a = aRef.current;
    if (!a) return;
    const onTime = () => setTime(a.currentTime);
    const onMeta = () => a.duration && setDuration(a.duration);
    const onEnd = () => {
      setStatus("done");
      vRef.current?.pause();
    };
    const onErr = () => setStatus("error");
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    a.addEventListener("error", onErr);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
      a.removeEventListener("error", onErr);
    };
  }, []);

  const play = async (restart = false) => {
    const a = aRef.current,
      v = vRef.current;
    if (!a || !v) return;
    try {
      setStatus("loading");
      if (restart || status === "done") {
        a.currentTime = 0;
        v.currentTime = 0;
      }
      v.loop = true;
      v.muted = true; // narration carries the voice; video keeps lip motion
      await a.play();
      v.play().catch(() => {}); // video is visual only; never block the voice
      setStatus("playing");
    } catch {
      setStatus("error");
    }
  };
  const pause = () => {
    aRef.current?.pause();
    vRef.current?.pause();
    setStatus("paused");
  };
  const toggleMute = () => {
    const a = aRef.current;
    if (!a) return;
    a.muted = !muted;
    setMuted(!muted);
    if (muted && status === "playing") {
      if (a.paused) a.currentTime = Math.min(time, a.duration || time);
      void a.play().catch(() => setStatus("error"));
    }
  };

  const caption = [...CAPTIONS].reverse().find((c) => time >= c.t)?.text;
  const active = status === "playing" || status === "paused" || status === "loading";

  return (
    <div className="relative">
      <div
        className="absolute -inset-6 rounded-[2.5rem] bg-brand opacity-30 blur-3xl"
        aria-hidden
      />
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-glow">
        <video
          ref={vRef}
          poster={poster.url}
          playsInline
          muted
          preload="metadata"
          className="aspect-video w-full object-cover"
          aria-label="Palak Tripathi introduction video"
          onTimeUpdate={(event) => {
            if (aRef.current?.paused) setTime(event.currentTarget.currentTime);
          }}
        >
          <source src={compatibleVideo.url} type="video/webm" />
          <source src={video.url} type="video/mp4" />
        </video>
        <audio ref={aRef} src={voice.url} preload="auto" />

        {!active && (
          <Button
            onClick={() => play(status === "done")}
            variant="ghost"
            className="group absolute inset-0 h-full w-full flex items-center justify-center bg-navy/25 transition hover:bg-navy/15"
          >
            <span className="flex items-center gap-3 rounded-full bg-brand px-7 py-4 font-display text-lg font-semibold text-primary-foreground shadow-glow transition group-hover:scale-105">
              {status === "done" ? (
                <RotateCcw className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 fill-current" />
              )}
              {status === "done" ? "Hear it again" : status === "error" ? "Retry" : "Meet Palak"}
            </span>
          </Button>
        )}

        {status === "error" && (
          <p className="absolute left-4 top-4 rounded-full bg-destructive px-3 py-1 text-sm text-destructive-foreground">
            Couldn't play audio — tap to retry
          </p>
        )}

        {cc && active && caption && (
          <p className="absolute inset-x-6 bottom-20 mx-auto max-w-xl rounded-xl bg-navy/75 px-4 py-2 text-center text-base font-medium text-primary-foreground backdrop-blur">
            {caption}
          </p>
        )}

        {active && (
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-navy/80 to-transparent px-4 pb-4 pt-10 text-primary-foreground">
            <Button
              variant="ghost"
              size="icon"
              aria-label={status === "playing" ? "Pause" : "Play"}
              onClick={() => (status === "playing" ? pause() : play())}
              className="rounded-full bg-primary-foreground/15 p-2.5 hover:bg-primary-foreground/25"
            >
              {status === "playing" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Replay"
              onClick={() => play(true)}
              className="rounded-full bg-primary-foreground/15 p-2.5 hover:bg-primary-foreground/25"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-primary-foreground/25">
              <div
                className="h-full bg-brand transition-[width] duration-200"
                style={{ width: `${Math.min(100, (time / duration) * 100)}%` }}
              />
            </div>
            {status === "playing" && (
              <div className="flex h-4 items-end gap-0.5" aria-hidden>
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="w-1 rounded-full bg-cyan animate-eq"
                    style={{ height: "100%", animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              aria-label={muted ? "Unmute" : "Mute"}
              title={muted ? "Play introduction voice" : "Mute introduction voice"}
              onClick={toggleMute}
              className="rounded-full bg-primary-foreground/15 p-2.5 hover:bg-primary-foreground/25"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle captions"
              onClick={() => setCc(!cc)}
              className="rounded-full bg-primary-foreground/15 p-2.5 hover:bg-primary-foreground/25"
            >
              {cc ? <Captions className="h-4 w-4" /> : <CaptionsOff className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
