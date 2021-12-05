import { v4 as uuidV4 } from 'uuid';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { useAppStore } from '../../lib/stores';

interface EmbedTweetsProp {
    tweetIds: string[];
}

export const EmbedTweets = ({ tweetIds }: EmbedTweetsProp) => {
    const darkMode = useAppStore((state) => state.darkMode);
    return (
        <div>
            <div className="bg-gray-900 p-1" id="tweet-container">
                {tweetIds.map((tweetId) => (
                    <TwitterTweetEmbed
                        tweetId={tweetId}
                        key={uuidV4()}
                        options={{ theme: darkMode ? 'dark' : 'light' }}
                    />
                ))}
            </div>
        </div>
    );
};
