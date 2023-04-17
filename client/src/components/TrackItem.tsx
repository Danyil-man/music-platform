import { ITrack } from "@/types/track";
import { Card, IconButton, Grid } from "@material-ui/core";
import styles from "../styles/TrackItem.module.scss";
import { Pause, PlayArrow, Delete } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useActions } from "@/hooks/useActions";

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}
const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
  const router = useRouter();
  const {playTrack, pauseTrack, setActiveTrack} = useActions();
  const play = (e: any) => {
    e.stopPropagation();
    setActiveTrack(track);
    playTrack();
  }
  return (
    <Card
      className={styles.track}
      onClick={() =>
        router.push('/tracks/' + track._id)
      }
    >
      <IconButton onClick={play}>{active ? <Pause /> : <PlayArrow />}</IconButton>
      <img width={70} height={70} src={'http://localhost:5000/' + track.picture} alt="track-image" />
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: "gray" }}>{track.artist}</div>
      </Grid>
      {active && <>02:42 / 3:02</>}
      <IconButton onClick={(e => e.stopPropagation())} style={{ marginLeft: "auto" }}>
        <Delete />
      </IconButton>
    </Card>
  );
};

export default TrackItem;
