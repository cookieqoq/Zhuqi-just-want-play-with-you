async function getWeatherData() {
    const lastFetch = localStorage.getItem('weatherTime');
    const now = new Date().getTime();

    // 如果距離上次抓取不到 10 分鐘 (600,000 毫秒)，就用舊資料
    if (lastFetch && (now - lastFetch < 600000)) {
        const savedData = JSON.parse(localStorage.getItem('weatherData'));
        displayWeather(savedData); // 顯示舊資料
        return;
    }

    try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=23.50&longitude=120.69&current_weather=true');
        const data = await response.json();

        // 儲存資料與時間
        localStorage.setItem('weatherData', JSON.stringify(data));
        localStorage.setItem('weatherTime', now);

        displayWeather(data);
    } catch (e) {
        console.error("抓取失敗", e);
    }
}

getWeatherData();