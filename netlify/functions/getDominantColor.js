exports.handler = async function (event, context) {
    const { queryStringParameters: { url } } = event;
    
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Hello!' })
    };
};