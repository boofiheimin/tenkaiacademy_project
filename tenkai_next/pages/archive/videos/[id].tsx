import { GetServerSideProps } from 'next';
import { VideoView } from '../../../components/VideoView';
import { Video } from '../../../interfaces/video.interface';
import { fetchVideo } from '../../../lib/api';

interface Props {
    video: Video;
}

const Video = ({ video }: Props) => {
    return <VideoView video={video} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const response = await fetchVideo(context.params.id as string);

    if (!response) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            video: response,
        },
    };
};

export default Video;
