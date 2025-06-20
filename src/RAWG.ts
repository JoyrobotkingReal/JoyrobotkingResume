/**
 * @class RAWGClient
 * @description A TypeScript client for interacting with the RAWG Video Games Database API.
 * @see https://rawg.io/apidocs
 */
export class RAWGClient {
    private apiKey: string;
    private baseUrl: string = "https://api.rawg.io/api";

    /**
     * @constructor
     * @param {string} apiKey - Your RAWG API key.
     */
    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    /**
     * @method get
     * @description A generic method for making GET requests to the RAWG API.
     * @param {string} endpoint - The API endpoint to request.
     * @param {Record<string, string>} [params] - Optional query parameters.
     * @returns {Promise<T>} - A promise that resolves with the API response.
     */
    private async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
        const url = new URL(`${this.baseUrl}/${endpoint}`);
        url.searchParams.append("key", this.apiKey);
        if (params) {
            for (const key in params) {
                url.searchParams.append(key, params[key]);
            }
        }

        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error(`RAWG API request failed: ${response.statusText}`);
        }
        return response.json();
    }

    /**
     * @method searchGames
     * @description Searches for games.
     * @param {string} query - The search query.
     * @param {number} [page=1] - The page number to retrieve.
     * @param {number} [pageSize=20] - The number of results per page.
     * @returns {Promise<RAWGResponse<Game>>} - A promise that resolves with the search results.
     */
    public searchGames(query: string, page: number = 1, pageSize: number = 20): Promise<RAWGResponse<Game>> {
        return this.get<RAWGResponse<Game>>("games", {
            search: query,
            page: page.toString(),
            page_size: pageSize.toString()
        });
    }

    /**
     * @method getGameDetails
     * @description Retrieves details for a specific game.
     * @param {number | string} id - The ID or slug of the game.
     * @returns {Promise<Game>} - A promise that resolves with the game details.
     */
    public getGameDetails(id: number | string): Promise<Game> {
        return this.get<Game>(`games/${id}`);
    }

    /**
     * @method getGenres
     * @description Retrieves a list of genres.
     * @returns {Promise<RAWGResponse<Genre>>} - A promise that resolves with the list of genres.
     */
    public getGenres(): Promise<RAWGResponse<Genre>> {
        return this.get<RAWGResponse<Genre>>("genres");
    }

    /**
     * @method getPlatforms
     * @description Retrieves a list of platforms.
     * @returns {Promise<RAWGResponse<Platform>>} - A promise that resolves with the list of platforms.
     */
    public getPlatforms(): Promise<RAWGResponse<Platform>> {
        return this.get<RAWGResponse<Platform>>("platforms");
    }

    /**
     * @method getDevelopers
     * @description Retrieves a list of developers.
     * @returns {Promise<RAWGResponse<Developer>>} - A promise that resolves with the list of developers.
     */
    public getDevelopers(): Promise<RAWGResponse<Developer>> {
        return this.get<RAWGResponse<Developer>>("developers");
    }
}

/**
 * @interface RAWGResponse
 * @description Represents the standard response structure from the RAWG API.
 */
export interface RAWGResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

/**
 * @interface Game
 * @description Represents a game object from the RAWG API.
 */
export interface Game {
    id: number;
    slug: string;
    name: string;
    released: string;
    tba: boolean;
    background_image: string;
    rating: number;
    rating_top: number;
    ratings: Rating[];
    ratings_count: number;
    reviews_text_count: number;
    added: number;
    added_by_status: AddedByStatus;
    metacritic: number;
    playtime: number;
    suggestions_count: number;
    updated: string;
    user_game: any; // Can be more specific if needed
    reviews_count: number;
    saturated_color: string;
    dominant_color: string;
    platforms: PlatformDetails[];
    parent_platforms: ParentPlatform[];
    genres: Genre[];
    stores: StoreDetails[];
    clip: any; // Can be more specific if needed
    tags: Tag[];
    esrb_rating: EsrbRating;
    short_screenshots: ShortScreenshot[];
}

/**
 * @interface Rating
 * @description Represents a rating object.
 */
export interface Rating {
    id: number;
    title: string;
    count: number;
    percent: number;
}

/**
 * @interface AddedByStatus
 * @description Represents the 'added by status' object.
 */
export interface AddedByStatus {
    yet: number;
    owned: number;
    beaten: number;
    toplay: number;
    dropped: number;
    playing: number;
}

/**
 * @interface PlatformDetails
 * @description Represents the details of a platform.
 */
export interface PlatformDetails {
    platform: Platform;
    released_at: string;
    requirements_en: Requirements | null;
    requirements_ru: Requirements | null;
}

/**
 * @interface Platform
 * @description Represents a platform object.
 */
export interface Platform {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    year_end: number | null;
    year_start: number | null;
    games_count: number;
    image_background: string;
}

/**
 * @interface Requirements
 * @description Represents the system requirements for a game.
 */
export interface Requirements {
    minimum: string;
    recommended: string;
}

/**
 * @interface ParentPlatform
 * @description Represents a parent platform.
 */
export interface ParentPlatform {
    platform: Platform;
}

/**
 * @interface Genre
 * @description Represents a genre object.
 */
export interface Genre {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
}

/**
 * @interface StoreDetails
 * @description Represents the details of a store.
 */
export interface StoreDetails {
    id: number;
    store: Store;
}

/**
 * @interface Store
 * @description Represents a store object.
 */
export interface Store {
    id: number;
    name: string;
    slug: string;
    domain: string;
    games_count: number;
    image_background: string;
}

/**
 * @interface Tag
 * @description Represents a tag object.
 */
export interface Tag {
    id: number;
    name: string;
    slug: string;
    language: string;
    games_count: number;
    image_background: string;
}

/**
 * @interface EsrbRating
 * @description Represents an ESRB rating object.
 */
export interface EsrbRating {
    id: number;
    name: string;
    slug: string;
}

/**
 * @interface ShortScreenshot
 * @description Represents a short screenshot object.
 */
export interface ShortScreenshot {
    id: number;
    image: string;
}

/**
 * @interface Developer
 * @description Represents a developer object.
 */
export interface Developer {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
}

