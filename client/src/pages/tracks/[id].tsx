import MainLayout from "@/layouts/MainLayout"
import { Button, Grid, TextField } from "@material-ui/core"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { FC, useState } from "react"
import axios from 'axios'
import { useInput } from "@/hooks/useInput"
import { ITrack } from "@/types/track"
import { Divider } from "@mui/material"

interface TrackPageProps {
    serverTrack: ITrack
}

const TrackPage:FC<TrackPageProps> = ({serverTrack}) => {
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const router = useRouter();
    const username = useInput('');
    const text = useInput('');
    
    const addComment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/tracks/comment', {
                username: username.value,
                text: text.value,
                trackId: track._id
            })   
            setTrack({...track, comments: [...track.comments, response.data]})
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <MainLayout>
            <Button style={{fontSize: 32}} variant="outlined" onClick={() => router.push('/tracks')}>
                List
            </Button>
            <Grid container style={{margin: '20px 0'}}>
                <img src={'http://localhost:5000/' + track.picture} width={200} height={200} alt="picture"/>
                <div style={{marginLeft: 30}}>
                    <h1>Name - {track.name}</h1>
                    <h1>Artists - {track.artist}</h1>
                    <h1>Listens - {track.listens}</h1>
                </div>
            </Grid>
            <h1>Lyrics</h1>
            <p>{track.text}</p>
            <h1>Comments</h1>
            <Grid container>
                <TextField {...username} label="Your name" fullWidth />
                <TextField {...text} label="Comment" fullWidth multiline rows={4} />
                <Button onClick={addComment}>
                    Send
                </Button>
            </Grid>
            <div>
                {track.comments.map(comment => <>
                    <div>
                        Author: {comment.username}
                    </div>
                    <div>
                       Comment: {comment.text}
                    </div>
                    <Divider />
                </>)}
            </div>
        </MainLayout>
    )
}

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    console.log('PARAMS' + params);
    
    const response = await axios.get('http://localhost:5000/tracks/' + params?.id)
    return { props: {
        serverTrack: response.data
    }}
}