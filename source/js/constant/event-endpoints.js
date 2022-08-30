export const baseURL = `https://event.fostiums.org`

export const endpoints = {
    getPamphlet: {
        method: 'GET',
        url: (imageName) => `${baseURL}/images/pamflet/${imageName}`
    },
    getLatestEvent: {
        method: 'GET',
        url: `${baseURL}/api/events`
    },
    joinEvent: {
        method: 'GET',
        url: (slug) => `${baseURL}/${slug}`
    }
}