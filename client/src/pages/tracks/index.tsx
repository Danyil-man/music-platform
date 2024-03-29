import { Box, Button, Card, Grid, TextField } from "@material-ui/core";
import MainLayout from "../../layouts/MainLayout";
import { useRouter } from "next/router";
import TrackList from "@/components/TrackList";
import { useTypeSelector } from "@/hooks/useTypeSelector";
import { NextThunkDispatch, wrapper } from "@/store";
import { fetchTracks, searchTrack } from "@/store/action-creators/track";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";

const Tracks = () => {
  const router = useRouter();
  const { tracks, error } = useTypeSelector((state) => state.track);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch() as NextThunkDispatch;
  // const [timer, setTimer] = useState(null);

  const search = async (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    await dispatch(await searchTrack(e.target.value))
    // if (timer) {
    //   clearTimeout(timer);
    // }
    // setTimer(setTimeout(async() => {
    //   await dispatch(await searchTrack(e.target.value))
    // }, 500)
    // )
  }

  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>List of tracks</h1>
              <Button onClick={() => router.push("/tracks/create")}>
                Upload
              </Button>
            </Grid>
          </Box>
          {/* <TextField fullWidth value={query} onChange={search} /> */}
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Tracks;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(await fetchTracks());
    return { props: {} };
  }
);
