import {
  AnyAction
} from 'redux';
import config from '../../config.json';
import {
  OkWeatherResponse
} from './weatherResponseTypes';

export type Config = typeof config;

export type Color = 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | undefined

export interface RootState {
  config: Config;
  inputWeatherValue: string;
  inputColor: Color;
  shouldInitRequest: boolean;
  currentWeatherData: null | OkWeatherResponse;
  errorWeatherResponse: boolean;
  fetchAgain: boolean;
  historyWeatherData: Array<OkWeatherResponse>
}


export enum actionTypes {
  SET_INPUT_VALUE = 'SET_INPUT_VALUE',
  SET_SHOULD_INIT_REQUEST = 'SET_SHOULD_INIT_REQUEST',
  SET_CURRENT_WEATHER_DATA = 'SET_CURRENT_WEATHER_DATA',
  SET_ERROR_WEATHER_RESPONSE = 'SET_ERROR_WEATHER_RESPONSE',
  SET_HISTORY_WEATHER_DATA = 'SET_HISTORY_WEATHER_DATA',
  RESET_ERROR = 'RESET_ERROR'
}

const initialState: RootState = {
  config,
  inputWeatherValue: '',
  inputColor: 'primary',
  shouldInitRequest: false,
  currentWeatherData: null,
  errorWeatherResponse: false,
  fetchAgain: false,
  historyWeatherData: []
};

export const rootReducer = (state: RootState = initialState, action: AnyAction ): RootState  => {
  switch (action.type) {
    case actionTypes.SET_INPUT_VALUE: {
      const {
        payload
      } = action;
      return {
        ...state,
        inputWeatherValue: payload
      };
    }
    case actionTypes.SET_SHOULD_INIT_REQUEST: {
      const {
        payload
      } = action;
      const {
        errorWeatherResponse,
        shouldInitRequest,
        currentWeatherData
      } = payload
      return {
        ...state,
        shouldInitRequest,
        errorWeatherResponse,
        currentWeatherData
      };
    }
    case actionTypes.SET_CURRENT_WEATHER_DATA: {
      const {
        payload
      } = action;
      const {
        data,
        shouldInitRequest,
        inputColor,
        fetchAgain
      } = payload
      return {
        ...state,
        shouldInitRequest,
        currentWeatherData: data,
        inputColor,
        fetchAgain
      };
    }
    case actionTypes.SET_ERROR_WEATHER_RESPONSE: {
      const {
        payload
      } = action;
      const {
        shouldInitRequest,
        errorWeatherResponse,
        inputColor
      } = payload
      return {
        ...state,
        errorWeatherResponse,
        inputColor,
        shouldInitRequest
      };
    }
    case actionTypes.SET_HISTORY_WEATHER_DATA: {
      const {
        payload
      } = action;
      return {
        ...state,
        historyWeatherData: [...state.historyWeatherData, payload]
      };
    }
    case actionTypes.RESET_ERROR: {
      return {
        ...state,
        errorWeatherResponse: false,
      };
    }
    default: {
      return state;
    }
  }
};
