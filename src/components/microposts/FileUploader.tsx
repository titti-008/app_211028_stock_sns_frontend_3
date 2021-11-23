import { Input } from '@mui/material';
import { FC, ChangeEvent } from 'react';

const UploadImage: FC = () => {
  const imageHander = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      return;
    }
    const file = event.target.files[0];
    if (file === null) {
      return;
    }
    const imgTag = document.getElementById('preview') as HTMLImageElement;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result: string = reader.result as string;
      imgTag.src = result;
    };
  };

  return (
    <>
      <div>
        <Input type="file" onChange={imageHander} />
        {/* <input
          type="file"
          accept="image/png, image/jpeg, image/gif, image/bmp, image/svg+xml"
          onChange={imageHander}
        /> */}
        <img id="preview" src="" alt="画像" />
      </div>
    </>
  );
};

export default UploadImage;
