import { FC, useState, useEffect } from 'react';
import { Grid, Divider, IconButton } from '@mui/material';

import ShowChartIcon from '@mui/icons-material/ShowChart';
import { NormalForm } from '../privateMUI/PrivateForms';
// import { useUserDataInput } from '../../hooks/util';
import { LinkButton } from '../privateMUI/PrivateBottuns';
import { NormalText } from '../privateMUI/PrivateTexts';

const SearchSymbol: FC = () => {
  // const initInput = {
  //   name: '',
  // };

  // const { values, handleChange } =
  //   useUserDataInput<typeof initInput>(initInput);

  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = event.target.value
      .replace(/[\W0-9]/g, (match) => {
        if (match) {
          setMessage('英字以外使用できません');
        }

        return '';
      })
      .replace(/[a-z]/g, (match) => match.toUpperCase());

    setValue(data);
  };

  useEffect(() => {
    if (message.length > 0) {
      setTimeout(() => {
        setMessage('');
      }, 2000);
    }
  }, [message]);

  const isError = message.length > 0 && value.length === 0;
  const isDisabled = value.length === 0;

  return (
    <Grid item width="100%">
      <NormalText>
        <IconButton>
          <ShowChartIcon />
        </IconButton>
        シンボル検索
      </NormalText>
      <NormalForm
        value={value}
        handleChange={handleChange}
        label="検索したいシンボルを入力してください"
        isPassword={false}
        error={isError}
        errorText={message}
      />
      <LinkButton
        linkTo={`/stocks/${value}/520`}
        label="シンボル検索"
        disabled={isDisabled}
      />
      <Divider sx={{ width: '100%' }} />
    </Grid>
  );
};

export default SearchSymbol;
