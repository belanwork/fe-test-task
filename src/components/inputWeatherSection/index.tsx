import React, {
  useEffect, useState,
} from 'react';
import TextField from '@mui/material/TextField';
import {
  connect,
} from 'react-redux';
import {
  Color,
  Config, RootState,
} from '@/store/reducers';
import {
  SetInputWeatherValue,
  setInputValue,
  SetShouldInitRequest,
  setShouldInitRequest,
  setCurrentWeatherData,
  SetCurrentWeatherData,
  setErrorWeatherResponse,
  SetErrorWeatherResponse,
  setHistoryWeatherData,
  SetHistoryWeatherData,
} from '@/store/actions/rootActions';
import {
  OkWeatherResponse
} from '@/store/reducers/weatherResponseTypes';
import {
  ErrorWeatherResponsePayload, ShouldInitPayload, WeatherPayload
} from '@/store/actions/actionsPayloads';

interface Props {
  config: Config;
  inputWeatherValue: string;
  shouldInitRequest: boolean;
  inputColor: Color;
  setInputValue: (payload: string) => SetInputWeatherValue;
  setShouldInitRequest: (payload: ShouldInitPayload) => SetShouldInitRequest;
  setCurrentWeatherData: (payload: WeatherPayload) => SetCurrentWeatherData
  setErrorWeatherResponse: (payload: ErrorWeatherResponsePayload) => SetErrorWeatherResponse
  setHistoryWeatherData:(payload: OkWeatherResponse) => SetHistoryWeatherData

}

const InputWeatherSeaction: React.FC<Props> = (props) => {
  const {
    config,
    inputWeatherValue,
    shouldInitRequest,
    inputColor
  } = props;

  // Actions
  const {
    setInputValue,
    setShouldInitRequest,
    setCurrentWeatherData,
    setErrorWeatherResponse,
  } = props

  const {
    apiKey,
    delayBeforeFetch,
    apiUrl
  } = config;

  useEffect(() => {
    const initRequest = setTimeout(() => {
      if (inputWeatherValue) {
        console.log('Прошла 1 секунда, запускаю поиск');
        setShouldInitRequest({
          shouldInitRequest: true,
          errorWeatherResponse: false,
          currentWeatherData: null
        })
      }
    }, delayBeforeFetch);
    return () => {
      clearTimeout(initRequest);
    };
  }, [inputWeatherValue]);

  useEffect(() => {
    let delayTimer: ReturnType<typeof setTimeout>;
    if (shouldInitRequest) {
      const querryParams = `?q=${inputWeatherValue}&units=metric&appid=${apiKey}`
      const url = `${apiUrl}${querryParams}`;
      fetch(url)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject('City not found!');
        })
        .then((json) => {
          delayTimer = setTimeout(() => {
            setCurrentWeatherData({
              data: json,
              shouldInitRequest: false,
              inputColor: 'success',
              fetchAgain: false,
            })
          }, 1000)
        })
        .catch((e) => {
          delayTimer = setTimeout(() => {
            setErrorWeatherResponse({
              shouldInitRequest: false,
              errorWeatherResponse: true,
              inputColor: 'error'
            })
          }, 1000)
          return })
    }
    return () => {
      clearTimeout(delayTimer)
    }
  },[shouldInitRequest]);

  return (
    <div
      className='wrapper'>
      <TextField
        fullWidth
        className='weatherInput'
        value={inputWeatherValue}
        variant='outlined'
        color={inputColor}
        placeholder='Please enter a city name...'
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
    </div>
  );
};

const mapStateToProps = (store: RootState) => {
  const {
    config,
    inputWeatherValue,
    shouldInitRequest,
    inputColor
  } = store;
  return {
    config,
    inputWeatherValue,
    shouldInitRequest,
    inputColor
  };
};

const mapDispatchToProps = {
  setInputValue: (payload: string) => setInputValue(payload),
  setShouldInitRequest: (payload: ShouldInitPayload) => setShouldInitRequest(payload),
  setCurrentWeatherData: (payload: WeatherPayload) => setCurrentWeatherData(payload),
  setErrorWeatherResponse: (payload: ErrorWeatherResponsePayload) => setErrorWeatherResponse(payload),
  setHistoryWeatherData: (payload: OkWeatherResponse) => setHistoryWeatherData(payload)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputWeatherSeaction);
