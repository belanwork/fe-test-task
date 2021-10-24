import {
  Action
} from 'redux';
import {
  actionTypes, Color
} from '../reducers';
import {
  OkWeatherResponse
} from '../reducers/weatherResponseTypes';
import {
  ErrorWeatherResponsePayload, ShouldInitPayload, WeatherPayload
} from './actionsPayloads';

export interface SetInputWeatherValue {
  type: string;
  payload: string;
}

export const setInputValue = (payload: string): SetInputWeatherValue => {
  return {
    type: actionTypes.SET_INPUT_VALUE,
    payload,
  };
};


export interface SetShouldInitRequest {
  type: string;
  payload: ShouldInitPayload;
}


export const setShouldInitRequest = (payload: ShouldInitPayload): SetShouldInitRequest => {
  return {
    type: actionTypes.SET_SHOULD_INIT_REQUEST,
    payload,
  };
};

export interface SetCurrentWeatherData {
  type: string;
  payload: WeatherPayload;
}


export const setCurrentWeatherData = (payload: WeatherPayload): SetCurrentWeatherData => {
  return {
    type: actionTypes.SET_CURRENT_WEATHER_DATA,
    payload,
  };
};


export interface SetErrorWeatherResponse {
  type: string;
  payload: ErrorWeatherResponsePayload;
}

export const setErrorWeatherResponse = (payload: ErrorWeatherResponsePayload): SetErrorWeatherResponse => {
  return {
    type: actionTypes.SET_ERROR_WEATHER_RESPONSE,
    payload,
  };
};

export interface SetHistoryWeatherData {
  type: string;
  payload: OkWeatherResponse
}

export const setHistoryWeatherData = (payload: OkWeatherResponse): SetHistoryWeatherData => {
  return {
    type: actionTypes.SET_HISTORY_WEATHER_DATA,
    payload,
  };
};

export interface ResetError {
  type: string
}

export const resetError = (): ResetError => {
  return {
    type: actionTypes.RESET_ERROR
  }
}