let totalHashrate = 0;
let totalShares = 0;

export default defineEventHandler(async (event) => {
    if (event.method === "POST") {
        const body = await readBody(event);
        totalHashrate += body.hashrate || 0;
        totalShares += body.shares || 0;
        return { success: true };
    }

    return { totalHashrate, totalShares };
});
