import { FC } from 'react';
import axios from 'axios';
import saveAs from 'file-saver';
import { SubmitButton } from './privateMUI/PrivateBottuns';
import { useAppContext } from '../hooks/ReduserContext';

const HelloWorld: FC = () => {
  const { state } = useAppContext();
  const { currentUser } = state;

  const baseUrl = process.env.REACT_APP_SERVER_URL ?? ''; // 文字列型であることを強制

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

  return (
    <>
      {currentUser?.admin && (
        <SubmitButton
          onClick={exportCSV}
          label="earnings CSVダウンロード"
          disabled={false}
          isLoading={false}
        />
      )}
    </>
  );
};

export default HelloWorld;

/* eslint-disable */

/* eslint-disable */
