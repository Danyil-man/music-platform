import { Pause, PlayArrow, VolumeUp } from "@material-ui/icons";
import { Grid, IconButton } from "@mui/material";
import styles from "../styles/Player.module.scss";
import TrackProgress from "./TrackProgress";
import { useTypeSelector } from "@/hooks/useTypeSelector";
import { useActions } from "@/hooks/useActions";
import { ChangeEvent, useEffect } from "react";

let audio: any;

const Player = () => {
  const { pause, active, currentTime, duration, volume } = useTypeSelector(
    (state) => state.player
  );
  const {
    pauseTrack,
    playTrack,
    setVolume,
    setCurrentTime,
    setDuration,
    setActiveTrack,
  } = useActions();
  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      play();
    }
  }, [active]);

  const setAudio = () => {
    if (active) {
      audio.src = 'http://localhost:5000/' + active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      };
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      };
    }
  };

  const play = () => {
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  };
  const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100;
    setVolume(Number(e.target.value));
  };

  const changeCurrentTime = (e: ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  };

  if(!active){
    return null
  }
  return (
    <div className={styles.player}>
      <IconButton onClick={play}>
        {pause ? <PlayArrow /> : <Pause />}
      </IconButton>
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{active?.name}</div>
        <div style={{ fontSize: 12, color: "gray" }}>{active?.artist}</div>
      </Grid>
      <TrackProgress
        label="track"
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      />
      <VolumeUp style={{ marginLeft: "auto" }} />
      <TrackProgress label="volume" left={volume} right={100} onChange={changeVolume} />
    </div>
  );
};

export default Player;
