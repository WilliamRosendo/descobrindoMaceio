import React, { useState, useEffect } from 'react';
import { Cloud, Droplets, Wind, Waves, TrendingUp, TrendingDown, Loader2, Thermometer } from 'lucide-react';
import './WeatherTideWidget.css';

const WeatherTideWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [tideData, setTideData] = useState(null);
  const [loading, setLoading] = useState(true);

  const latitude = -9.6658;
  const longitude = -35.7353;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=America/Maceio`
        );
        const weather = await weatherResponse.json();
        setWeatherData(weather.current);

        const baseUrl = import.meta.env.PROD ? '' : 'http://localhost:5000';
        const tideResponse = await fetch(
          `${baseUrl}/api/tide?lat=-9.6658&lon=-35.7353&estado=al`
        );

        const tide = await tideResponse.json();
        const hours = tide.data?.[0]?.months?.[0]?.days?.[0]?.hours || [];
        setTideData(hours);

      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getWeatherDescription = (code) => {
    const descriptions = {
      0: 'Céu limpo',
      1: 'Principalmente limpo',
      2: 'Parcialmente nublado',
      3: 'Nublado',
      45: 'Neblina',
      48: 'Nevoeiro',
      51: 'Garoa leve',
      53: 'Garoa moderada',
      55: 'Garoa densa',
      61: 'Chuva leve',
      63: 'Chuva moderada',
      65: 'Chuva forte',
      80: 'Pancadas de chuva',
      95: 'Tempestade'
    };
    return descriptions[code] || 'Carregando...';
  };

  const getTideType = (index) => {

    return index % 2 === 0 ? 'alta' : 'baixa';
  };

  if (loading) {
    return (
      <div className="weather-tide-loading">
        <Loader2 size={32} className="loading-spinner" />
        <p className="loading-text">Carregando informações...</p>
      </div>
    );
  }

  return (
    <div className="weather-tide-container">
      
      <div className="weather-card">
        <div className="card-glow weather-glow"></div>
        
        <div className="card-header">
          <div className="header-left">
            <Cloud className="header-icon" size={32} />
            <div>
              <h3 className="card-title">Clima em Maceió</h3>
              <p className="card-subtitle">Condições atuais</p>
            </div>
          </div>
        </div>

        <div className="weather-main">
          <div className="temperature-display">
            <Thermometer className="temp-icon" size={40} />
            <span className="temperature">
              {weatherData?.temperature_2m ? Math.round(weatherData.temperature_2m) : '--'}
            </span>
            <span className="temp-unit">°C</span>
          </div>
          <p className="weather-condition">
            {getWeatherDescription(weatherData?.weather_code)}
          </p>
        </div>

        <div className="weather-details">
          <div className="detail-item">
            <Droplets size={20} className="detail-icon" />
            <div className="detail-content">
              <span className="detail-label">Umidade</span>
              <span className="detail-value">{weatherData?.relative_humidity_2m || '--'}%</span>
            </div>
          </div>

          <div className="detail-divider"></div>

          <div className="detail-item">
            <Wind size={20} className="detail-icon" />
            <div className="detail-content">
              <span className="detail-label">Vento</span>
              <span className="detail-value">
                {weatherData?.wind_speed_10m ? Math.round(weatherData.wind_speed_10m) : '--'} km/h
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="tide-card">
        <div className="card-glow tide-glow"></div>
        
        <div className="card-header">
          <div className="header-left">
            <Waves className="header-icon" size={32} />
            <div>
              <h3 className="card-title">Tábua de Marés</h3>
              <p className="card-subtitle">Previsão de hoje</p>
            </div>
          </div>
        </div>

        <div className="tide-list">
          {tideData && tideData.length > 0 ? (
            tideData.slice(0, 6).map((tide, index) => {
              const type = getTideType(index);
              return (
                <div key={index} className="tide-item">
                  <div className="tide-left">
                    {type === 'alta' ? (
                      <TrendingUp size={20} className="tide-icon tide-high" />
                    ) : (
                      <TrendingDown size={20} className="tide-icon tide-low" />
                    )}
                    <div className="tide-info">
                      <span className="tide-time">{tide.hour}</span>
                      <span className="tide-type">Maré {type}</span>
                    </div>
                  </div>
                  <div className="tide-level">
                    {parseFloat(tide.level).toFixed(1)}m
                  </div>
                </div>
              );
            })
          ) : (
            <p className="no-tide-data">Dados de maré indisponíveis</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default WeatherTideWidget;