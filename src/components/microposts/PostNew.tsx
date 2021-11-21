import { FC, useState } from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@mui/material';
import { createMicropost } from '../api';
import { SubmitButton } from '../privateMUI/PrivateBottuns';
import { historyPropsType, ErrorResponse } from '../Types';
import { SuccessToasts, ErrorToasts } from '../toast/PrivateToast';

const PostNew: FC<historyPropsType> = (_props) => {
  /* eslint-disable */
  const props = _props;
  /* eslint-disable */
  const [content, setContent] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const MaxLength = 300;

  const isOver = content.length > MaxLength;
  const isError = isOver || content.length === 0;

  const submitCreateContent = async () => {
    try {
      const response = await createMicropost(content);
      if (response.status === 200) {
        SuccessToasts(response.data.messages);
        props.history.push('/');
      } else if (response.status === 202) {
        ErrorToasts(response.data.messages);
      }
    } catch (err) {
      if ((err as ErrorResponse).response !== undefined)
        console.log('投稿失敗');
      console.log((err as ErrorResponse).response);
      ErrorToasts([
        '投稿に失敗しました。',
        'データサーバーとの接続に問題がある可能性があります。',
      ]);
    }
  };

  return (
    <>
      <Grid item width="100%">
        <TextField
          error={isOver}
          margin="normal"
          label="つぶやきを投稿"
          multiline
          rows={8}
          fullWidth
          value={content}
          onChange={handleChange}
        />
        <FormControl variant="outlined" margin="normal" fullWidth>
          <InputLabel htmlFor="content">つぶやきを投稿</InputLabel>
          <Input
            error={isOver}
            value={content}
            multiline
            rows={8}
            onChange={handleChange}
            aria-describedby="component-text"
          />

          <FormHelperText id="component-text">
            残り{MaxLength - content.length}字
          </FormHelperText>
        </FormControl>
      </Grid>

      <Grid item>
        <SubmitButton
          onClick={submitCreateContent}
          label="投稿する"
          disabled={isError}
        />
      </Grid>
    </>
  );
};

export default PostNew;
