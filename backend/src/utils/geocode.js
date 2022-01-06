const axios = require('axios')
const geocode = async (address) => {
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + process.env.MAPBOX_API_KEY + '&limit=1'
    try {
        const res = await axios.get(geocodeUrl)
        const data = res.data
        if (data.features.length === 0) {
            return null
        }
        return  {
            latitude: data.features[0].center[1],
            longitude: data.features[0].center[0],
            location: data.features[0].place_name
        }
    } catch (e) {
        return e
    }
}
module.exports = geocode