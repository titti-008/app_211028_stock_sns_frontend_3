import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { ApiResponse } from './Types';

// tslint:disable-next-line
const Home: FC = () => {
  const [state, setState] = useState<string>('');

  const env = process.env.REACT_APP_SERVER_URL ?? ''; // 文字列型であることを強制

  const url = `${env}/home`;
  console.log(url);

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
        <p>responces: {state}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1>HOME</h1>
        </a>
      </header>
    </div>
  );
};

export default Home;
