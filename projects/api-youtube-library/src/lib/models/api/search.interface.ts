export interface SearchResponse {
    kind: string;
    etag: string;
    nextPageToken?: string;
    regionCode?: string;
    pageInfo: PageInfo;
    items: SearchItem[];
}

export interface SearchItem {
    kind: string;
    etag: string;
    id: SearchItemId;
    snippet: SearchSnippet;
}

export interface SearchItemId {
    kind: string;
    channelId?: string;
    videoId?: string;
    playlistId?: string;
}

export interface SearchSnippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    liveBroadcastContent?: string;
}

export interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}

export interface Thumbnails {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard?: Thumbnail;
    maxres?: Thumbnail;
}

export interface Thumbnail {
    url: string;
    width: number;
    height: number;
}
