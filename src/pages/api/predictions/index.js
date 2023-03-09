const REPLICATE_API_HOST = "https://api.replicate.com";

import packageData from "../../../package.json";

export default async function handler(req, res) {

    if (!process.env.REPLICATE_API_TOKEN) {
        throw new Error(
            "The REPLICATE_API_TOKEN environment variable is not set."
        );
    }

    const headers = {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": `${packageData.name}/${packageData.version}`,
    };

    const response = await fetch(`${REPLICATE_API_HOST}/v1/predictions`, {
        method: "POST",
        headers,
        body: JSON.stringify({
            // Pinned to a specific version of Stable Diffusion
            // See https://replicate.com/stability-ai/stable-diffussion/versions
            version: "435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117",

            // This is the text prompt that will be submitted by a form on the frontend
            input: req.body,
        }),
    });

    if (response.status !== 201) {
        let error = await response.json();
        res.statusCode = 500;
        res.end(JSON.stringify({ detail: error.detail }));
        return;
    }

    const prediction = await response.json();
    res.statusCode = 201;
    res.end(JSON.stringify(prediction));
}