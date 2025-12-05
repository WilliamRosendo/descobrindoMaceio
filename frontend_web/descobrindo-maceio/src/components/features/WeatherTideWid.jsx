import React, { useState, useEffect } from 'react';
import { Cloud, Droplets, Wind, Waves, TrendingUp, TrendingDown, Loader2, Thermometer, X } from 'lucide-react';
import './WeatherTideWidget.css';

const WeatherTideWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [tideData, setTideData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [showTideModal, setShowTideModal] = useState(false);

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

        const tideResponse = await fetch(
          "http://localhost:5000/api/tide?lat=-9.6658&lon=-35.7353&estado=al"
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
    <>
      <div className="weather-tide-container">
        {/* Botão de Clima */}
        <button 
          className="weather-card weather-button"
          onClick={() => setShowWeatherModal(true)}
        >
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

          <p className="click-hint">Clique para ver detalhes</p>
        </button>

        {/* Botão de Marés */}
        <button 
          className="tide-card tide-button"
          onClick={() => setShowTideModal(true)}
        >
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

          <div className="tide-preview">
            {tideData && tideData.length > 0 ? (
              <div className="tide-preview-content">
                <div className="tide-preview-item">
                  <TrendingUp size={20} className="tide-icon tide-high" />
                  <span className="tide-preview-time">{tideData[0]?.hour}</span>
                  <span className="tide-preview-level">{parseFloat(tideData[0]?.level).toFixed(1)}m</span>
                </div>
                {tideData[1] && (
                  <div className="tide-preview-item">
                    <TrendingDown size={20} className="tide-icon tide-low" />
                    <span className="tide-preview-time">{tideData[1]?.hour}</span>
                    <span className="tide-preview-level">{parseFloat(tideData[1]?.level).toFixed(1)}m</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="no-tide-data">Dados indisponíveis</p>
            )}
          </div>

          <p className="click-hint">Clique para ver todas as marés</p>
        </button>
      </div>

      {/* Modal de Clima */}
      {showWeatherModal && (
        <div className="modal-overlay" onClick={() => setShowWeatherModal(false)}>
          <div className="modal-content weather-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setShowWeatherModal(false)}
              aria-label="Fechar modal"
            >
              <X size={24} />
            </button>

            <div className="modal-header">
              <Cloud size={40} />
              <div>
                <h2 className="modal-title">Clima em Maceió</h2>
                <p className="modal-subtitle">Condições meteorológicas atuais</p>
              </div>
            </div>

            <div className="modal-body">
              <div className="weather-main-modal">
                <div className="temperature-display-large">
                  <Thermometer className="temp-icon-large" size={60} />
                  <span className="temperature-large">
                    {weatherData?.temperature_2m ? Math.round(weatherData.temperature_2m) : '--'}
                  </span>
                  <span className="temp-unit-large">°C</span>
                </div>
                <p className="weather-condition-large">
                  {getWeatherDescription(weatherData?.weather_code)}
                </p>
              </div>

              <div className="weather-details-modal">
                <div className="detail-card">
                  <Droplets size={32} className="detail-icon-large" />
                  <div className="detail-content-large">
                    <span className="detail-label-large">Umidade</span>
                    <span className="detail-value-large">{weatherData?.relative_humidity_2m || '--'}%</span>
                  </div>
                </div>

                <div className="detail-card">
                  <Wind size={32} className="detail-icon-large" />
                  <div className="detail-content-large">
                    <span className="detail-label-large">Vento</span>
                    <span className="detail-value-large">
                      {weatherData?.wind_speed_10m ? Math.round(weatherData.wind_speed_10m) : '--'} km/h
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Marés */}
      {showTideModal && (
        <div className="modal-overlay" onClick={() => setShowTideModal(false)}>
          <div className="modal-content tide-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setShowTideModal(false)}
              aria-label="Fechar modal"
            >
              <X size={24} />
            </button>

            <div className="modal-header">
              <Waves size={40} />
              <div>
                <h2 className="modal-title">Tábua de Marés</h2>
                <p className="modal-subtitle">Previsão completa para hoje</p>
              </div>
            </div>

            <div className="modal-body">
              <div className="tide-list-modal">
                {tideData && tideData.length > 0 ? (
                  tideData.map((tide, index) => {
                    const type = getTideType(index);
                    return (
                      <div key={index} className="tide-item-modal">
                        <div className="tide-left">
                          {type === 'alta' ? (
                            <TrendingUp size={24} className="tide-icon tide-high" />
                          ) : (
                            <TrendingDown size={24} className="tide-icon tide-low" />
                          )}
                          <div className="tide-info">
                            <span className="tide-time-large">{tide.hour}</span>
                            <span className="tide-type-large">Maré {type}</span>
                          </div>
                        </div>
                        <div className="tide-level-large">
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
        </div>
      )}
    </>
  );
};

export default WeatherTideWidget;