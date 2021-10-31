import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ApiResponse } from './Types';

// tslint:disable-next-line
const Help: FC = () => {
  const [state, setState] = useState<string>('');

  const theme = useTheme();

  const env = process.env.REACT_APP_SERVER_URL ?? ''; // 文字列型であることを強制

  const url = `${env}/help`;
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
        <Typography variant="h2" color={theme.palette.text.secondary}>
          responces: {state}
        </Typography>

        <Typography variant="h2" color={theme.palette.text.secondary}>
          HELP
        </Typography>
      </header>
    </div>
  );
};

export default Help;
