import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import saveAs from 'file-saver';
// import alphavantage from 'alphavantage';
import { ApiResponse } from './Types';
import logo from '../logo.svg';

const HelloWorld: FC = () => {
  const [state, setState] = useState<string>('');

  const baseUrl = process.env.REACT_APP_SERVER_URL ?? ''; // 文字列型であることを強制

  const url = `${baseUrl}/hello_world`;

  /* eslint-disable */

  const exportCSV = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/earnings/export_csv`,
        {
          responseType: 'blob',
        },
      );

      if (response.status === 200) {
        const mineType = response.headers['content-type'];
        const name = response.headers['content-disposition'];
        const blob = new Blob([response.data], { type: mineType });
        saveAs(blob, name);
      } else {
        console.log('status200以外のレスポンス発生');
        console.log(response);
      }
    } catch (err) {
      console.log('データの取得に失敗');
      console.log(err);
    }
  };

  const componetDitMount = async () => {
    try {
      const response = await axios.get<ApiResponse>(url);

      if (response.status === 200) {
        setState(response.data.text);
      } else {
        console.log('status200以外のレスポンス発生');
        console.log(response);
      }
    } catch (err) {
      console.log('データの取得に失敗');
      console.log(err);
    }
  };

  useEffect(() => {
    void componetDitMount();
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>responces: {state}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={exportCSV}>Api</button>
    </div>
  );
};

export default HelloWorld;

// tslint:disable-next-line
/* eslint-disable */
