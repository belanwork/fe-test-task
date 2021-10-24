import {
  Config,
  RootState
} from '@/store/reducers';
import {
  OkWeatherResponse
} from '@/store/reducers/weatherResponseTypes';
import React from 'react';
import {
  connect
} from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  SetCurrentWeatherData,
  setCurrentWeatherData, SetErrorWeatherResponse, setErrorWeatherResponse
} from '@/store/actions/rootActions';
import {
  ErrorWeatherResponsePayload,
  WeatherPayload
} from '@/store/actions/actionsPayloads';

interface Props {
  historyWeatherData: Array<OkWeatherResponse>
  config: Config
  setCurrentWeatherData: (payload: WeatherPayload) => SetCurrentWeatherData
  setErrorWeatherResponse: (payload: ErrorWeatherResponsePayload) => SetErrorWeatherResponse
}
const HistoryWeatherSection: React.FC<Props> = (props: Props) => {
  const {
    historyWeatherData,
    config
  } = props
  // Actions

  const {
    setCurrentWeatherData,
    setErrorWeatherResponse
  } = props
  const {
    apiKey,
    apiUrl
  } = config
  const fetchAgain = (el:OkWeatherResponse) => {
    console.log(el)
    const querryParams = `?q=${el.name}&units=metric&appid=${apiKey}`
    const url = `${apiUrl}${querryParams}`;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('City not found!');
      })
      .then((json) => {
        return setCurrentWeatherData({
          data: json,
          shouldInitRequest: false,
          inputColor: 'primary',
          fetchAgain: true,
        })
      })
      .catch((e) => setErrorWeatherResponse({
        shouldInitRequest: false,
        errorWeatherResponse: true,
        inputColor: 'primary'
      }))
  }

  return <div
    className='wrapper'>
    <TableContainer
      style={
        {
          maxHeight: 300
        }
      }
      component={Paper}>
      <Table
        aria-label='simple table'>
        <TableBody>
          {historyWeatherData.map((historyEl, index) => {
            const {
              id,
              name,
              main,
              weather
            } = historyEl
            return <TableRow
              key={`${id}-${index}`}
              sx={{
                cursor: 'pointer'
              }}
            >
              <TableCell
                align='center'
                onClick={() => fetchAgain(historyEl)}>
                {name}
              </TableCell>
              <TableCell
                align='center'
                onClick={() => fetchAgain(historyEl)}>
                {main.temp}
              </TableCell>
              <TableCell
                align='center'
                onClick={() => fetchAgain(historyEl)}>
                {weather[0].description}
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </div>;
};

const mapStateToProps = (store: RootState) => {
  const {
    historyWeatherData,
    config
  } = store;
  return {
    historyWeatherData,
    config
  };
};

const mapDispatchToProps = {
  setCurrentWeatherData: (payload: WeatherPayload) => setCurrentWeatherData(payload),
  setErrorWeatherResponse: (payload: ErrorWeatherResponsePayload) => setErrorWeatherResponse(payload),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryWeatherSection);
