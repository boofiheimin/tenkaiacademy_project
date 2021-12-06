import { v4 as uuidV4 } from 'uuid';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { useAppStore } from '../../lib/stores';

interface EmbedTweetsProp {
    tweetIds: string[];
}

export const EmbedTweets = ({ tweetIds }: EmbedTweetsProp) => {
    const darkMode = useAppStore((state) => state.darkMode);
    return (
        <div className="flex-grow smMax:h-0">
            <div className="dark:bg-gray-900 bg-white shadow p-1 smMax:overflow-y-auto" id="tweet-container">
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
