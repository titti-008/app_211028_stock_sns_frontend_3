import { FC } from 'react';
import { Grid, IconButton } from '@mui/material';

import ShowChartIcon from '@mui/icons-material/ShowChart';
import { NormalForm } from '../privateMUI/PrivateForms';
import { useUserDataInput } from '../../hooks/util';
import { LinkButton } from '../privateMUI/PrivateBottuns';
import { NormalText } from '../privateMUI/PrivateTexts';

const SearchSymbol: FC = () => {
  const initInput = {
    name: '',
  };

  const { values, handleChange } =
    useUserDataInput<typeof initInput>(initInput);

  return (
    <Grid item width="100%">
      <NormalText>
        <IconButton>
          <ShowChartIcon />
        </IconButton>
        シンボル検索
      </NormalText>
      <NormalForm
        value={values.name}
        handleChange={handleChange('name')}
        label="検索したいシンボルを入力してください"
        isPassword={false}
        error={false}
        errorText=""
      />
      <LinkButton linkTo={`/stocks/${values.name}`} label="シンボル検索" />
    </Grid>
  );
};

export default SearchSymbol;

/* eslint-disable */
/* eslint-disable */
