import React, { FC, useState, useRef } from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  IconButton,
} from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import imageCompression from 'browser-image-compression';
import { createMicropost } from '../api';
import { SubmitButton } from '../privateMUI/PrivateBottuns';
// import { HistoryPropsType, ErrorResponse } from '../Types';
import { SuccessToasts, ErrorToasts } from '../toast/PrivateToast';
import PrivateImageList from './PrivateImageList';
import { HistoryPropsType } from '../Types';

const PostNew: FC<HistoryPropsType> = ({ history }) => {
  const [content, setContent] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const MaxLength = 300;

  const isOver = content.length > MaxLength;
  const isError = isOver || content.length === 0;

  const [images, setImages] = useState<File[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const fileUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files === null) {
      return;
    }
    const file = event.target.files[0];
    if (file === null) {
      return;
    }
    if (images.length >= 4) {
      ErrorToasts(['画像のアップロードは一度に4枚までです']);

      return;
    }

    const complessOption = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
    };

    const compressFile = await imageCompression(file, complessOption);

    setImages([...images, compressFile].slice(0, 4));
  };

  const params = new FormData();
  params.append('content', content);

  const imagesUrl = images.map((image) => {
    const imageUrl = image ? URL.createObjectURL(image) : '';
    params.append(`images[]`, image);

    return imageUrl;
  });

  const queryKey = `microposts-myfeed`;

  const queryClient = useQueryClient();

  const mutation = useMutation(createMicropost, {
    onSuccess: (res) => {
      SuccessToasts(res.data.messages);
      void queryClient.invalidateQueries(queryKey);
      setContent('');
      setImages([]);
      history.push('/');
    },
  });

  return (
    <>
      <Grid item width="100%">
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
          {images.length !== 0 && <PrivateImageList src={imagesUrl} />}
          <FormHelperText id="component-text">
            残り{MaxLength - content.length}字
          </FormHelperText>
        </FormControl>

        <IconButton onClick={fileUpload}>
          <input
            hidden
            type="file"
            name="image"
            ref={inputRef}
            onChange={onFileInputChange}
            accept="image/png, image/jpeg, image/gif, image/bmp, image/svg+xml"
          />
          <AttachFileIcon />
        </IconButton>
      </Grid>

      <Grid item>
        <SubmitButton
          onClick={() => mutation.mutate(params)}
          label="投稿する"
          disabled={isError}
          isLoading={false}
        />
      </Grid>
    </>
  );
};

export default PostNew;

/* eslint-disable */
/* eslint-disable */
