import {
  ResetError,
  resetError,
  SetHistoryWeatherData,
  setHistoryWeatherData
} from '@/store/actions/rootActions';
import {
  Config,
  RootState
} from '@/store/reducers';
import {
  OkWeatherResponse
} from '@/store/reducers/weatherResponseTypes';
import {
  CircularProgress
} from '@mui/material';
import React, {
  useEffect
} from 'react';
import {
  connect
} from 'react-redux';
import './index.scss';

interface Props {
  currentWeatherData: OkWeatherResponse | null;
  errorWeatherResponse: boolean;
  shouldInitRequest: boolean;
  config: Config
  fetchAgain: boolean;
  setHistoryWeatherData:(payload: OkWeatherResponse) => SetHistoryWeatherData
  resetError: () => ResetError
}

const CurrentWeatherSection: React.FC<Props> = (props: Props) => {
  const {
    currentWeatherData,
    errorWeatherResponse,
    shouldInitRequest,
    config,
    fetchAgain
  } = props

  // Actions

  const {
    setHistoryWeatherData,
    resetError
  } = props
  const {
    iconUrl
  } = config
  useEffect(() => {

    return () => {
      console.log('Размонт')
      resetError()
      if (currentWeatherData && !fetchAgain) {
        console.log('Записываю в историю')
        setHistoryWeatherData(currentWeatherData)
      }
    }
  },[currentWeatherData])
  const renderOkWeatherResponse = () => {
    const {
      name,
      main,
      wind,
      weather,
      sys
    } = currentWeatherData!
    return (
      <div
        className='okWeatherBlock'>
        <div
          className='okWeatherBlock__header'>
          <div>
            <p>
              City name / Country:
            </p>
            <p
              className='okWeatherBlock__value'>
              {`${name} / ${sys.country}`}
            </p>
          </div>
          <img
            className='okWeatherBlock__icon'
            src={`${iconUrl}${weather[0].icon}@2x.png`}
            alt='Weather icon' />
        </div>
        <div>
          <p>
            Temp Min/Max (Celsius):
          </p>
          <p
            className='okWeatherBlock__value'>
            {`${main.temp_min} / ${main.temp_max}`}
          </p>
        </div>
        <div>
          <p>
            Wind speed (meter/sec):
          </p>
          <p
            className='okWeatherBlock__value'>
            {wind.speed}
          </p>
        </div>
        <div>
          <p>
            Atmospheric pressure (hPa):
          </p>
          <p
            className='okWeatherBlock__value'>
            {main.pressure}
          </p>
        </div>
      </div>
    )
  }
  const renderWeatherResponse = () => {
    return (
      <div>
        {errorWeatherResponse && 'Sorry, city not found'}
        {currentWeatherData && renderOkWeatherResponse()}
      </div>
    )
  }
  return <div
    className='wrapper currentWeatherSection'>
    {shouldInitRequest
      ? <CircularProgress
          size='100px'/> :
      renderWeatherResponse()}
  </div>;
};

const mapStateToProps = (store: RootState) => {
  const {
    currentWeatherData,
    errorWeatherResponse,
    shouldInitRequest,
    config,
    fetchAgain
  } = store;
  return {
    currentWeatherData,
    errorWeatherResponse,
    shouldInitRequest,
    config,
    fetchAgain
  };
};

const mapDispatchToProps = {
  setHistoryWeatherData: (payload: OkWeatherResponse) => setHistoryWeatherData(payload),
  resetError: () => resetError()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentWeatherSection);
