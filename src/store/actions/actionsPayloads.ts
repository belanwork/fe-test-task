import {
  Color
} from '../reducers';
import {
  OkWeatherResponse
} from '../reducers/weatherResponseTypes';

export interface ShouldInitPayload {
  errorWeatherResponse: boolean;
  shouldInitRequest: boolean
  currentWeatherData: null
}

export interface WeatherPayload {
  data: OkWeatherResponse;
  shouldInitRequest: boolean;
  inputColor: string;
  fetchAgain: boolean
}

export interface ErrorWeatherResponsePayload {
  errorWeatherResponse: boolean;
  inputColor: Color;
  shouldInitRequest: boolean;
}