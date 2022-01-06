const axios = require('axios')
const forecast = async (latitude, longitude) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + process.env.WEATHERSTACK_API_KEY + '&query=' + latitude + ',' + longitude
    try {
        const res = await axios.get(url);
        const data = res.data.current;
        if(!data)
            return null;
        return {
            temperature: data.temperature,
            feelslike: data.feelslike,
            weather_description: data.weather_descriptions[0],
            wind_speed: data.wind_speed,
            wind_dir: data.wind_dir,
            precip: data.precip,
            humidity: data.humidity,
            pressure: data.pressure,
            cloudcover: data.cloudcover,
            visibility: data.visibility,
            is_day: data.is_day
        }
    } catch (e) {
        return e
    }
}
module.exports = forecast