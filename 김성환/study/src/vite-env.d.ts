/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TMDB_BASE_URL: string;
}

interface ImportMeta {
    readonly env: VITE_TMDB_BASE_URL;
}