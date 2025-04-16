export default defineEventHandler(async (event) => {
    const req = event.node.req;

    // Определяем страну из заголовка Cloudflare
    const country = req.headers['cf-ipcountry'] || 'Unknown';

    return { country };
});
