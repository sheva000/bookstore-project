const getBaseUrl = () => {
    const baseUrl = `${window.location.protocol}//${window.location.hostname}`;
    console.log(baseUrl);
    return baseUrl+":5000"
}

export default getBaseUrl