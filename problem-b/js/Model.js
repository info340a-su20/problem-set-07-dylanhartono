'use strict';

import allTweets from './uw_ischool_tweets';

// Private do not share!
const tweetData = allTweets.map((tweetObj) => {
    let mappedObj = {
        text: tweetObj.text,
        timestamp: Date.parse(tweetObj.created_at)
    }
    return mappedObj;
})

export function getRecentTweets() {
    tweetData.sort((a, b) => {
        return b.timestamp - a.timestamp     
    })
    return tweetData.slice(0, 5);
}

export function searchTweets(searchQuery) {
    let results = tweetData.filter((tweetObj) => {
        return tweetObj
            .text
            .toLowerCase()
            .indexOf(
                searchQuery.toLowerCase()
                ) >= 0;
    })
    return results;
}