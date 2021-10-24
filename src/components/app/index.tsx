import {
  RootState
} from '@/store/reducers';
import {
  OkWeatherResponse
} from '@/store/reducers/weatherResponseTypes';
import {
  createTheme, ThemeProvider,
} from '@mui/material';
import React, {
  useEffect
} from 'react';
import {
  connect
} from 'react-redux';
import CurrentWeatherSection from '../currentWeatherSection';
import HistoryWeatherSection from '../historyWeatherSection';
import InputWeatherSection from '../inputWeatherSection';
import './index.scss';

interface Props {
  errorWeatherResponse: boolean;
  currentWeatherData: OkWeatherResponse | null;
  historyWeatherData: Array<OkWeatherResponse>
}
const theme = createTheme({
  palette: {
    primary: {
      main: '#85C1E9'
    }
  }
});

const App: React.FC<Props> = (props:Props) => {
  const {
    errorWeatherResponse,
    currentWeatherData,
    historyWeatherData
  } = props
  return (
    <div
      className='app'>
      <ThemeProvider
        theme={theme}>
        <InputWeatherSection />
        <CurrentWeatherSection />
        {Boolean(historyWeatherData.length) && <HistoryWeatherSection />}
      </ThemeProvider >
    </div>
  );
};

const mapStateToProps = (store: RootState) => {
  const {
    historyWeatherData,
    errorWeatherResponse,
    currentWeatherData,
  } = store;
  return {
    historyWeatherData,
    errorWeatherResponse,
    currentWeatherData,
  };
};
export default connect(
  mapStateToProps,
)(App);
