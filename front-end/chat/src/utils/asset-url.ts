export function getImageUrl(path: string) {
    return new URL(`/images/${path}.svg`, import.meta.url).href;
}