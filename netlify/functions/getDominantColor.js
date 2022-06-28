const ColorThief = require('colorthief');

exports.handler = async function (event, context) {
    const { queryStringParameters: { url } } = event;
    const palette = await ColorThief.getPalette(url);
    return {
        statusCode: 200,
        body: JSON.stringify({ palette })
    };
};