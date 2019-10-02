

class weatherService {

    api_key = '3848a78e064441404169004b561c6bb0';
    base_url = 'https://api.openweathermap.org/data/2.5/weather?';

    async getWeatherFromCoords(lat, long) {
        return await fetch(this.base_url + 'lat=' + lat + '&lon=' + long + '&appid=' + this.api_key);
    }

}

export default new weatherService();
