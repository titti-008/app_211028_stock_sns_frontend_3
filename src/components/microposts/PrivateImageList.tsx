import { FC } from 'react';
import {
  Grid,
  // ImageListItem, ImageList
} from '@mui/material';

type PropsType = {
  src: string[];
};

const PrivateImageList: FC<PropsType> = (_props) => {
  const props = _props;

  console.log('props.src', props);

  return (
    <Grid item width="100%">
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        height="100%"
        wrap="nowrap"
        overflow="scroll"
      >
        {props.src ? (
          <Grid item>
            {/* <ImageList sx={{ width: '100%' }} cols={2} rowHeight={164}> */}
            {/* {images.map((item: string) => ( */}
            {props.src.map((image) => (
              <a href={image}>
                {/* <ImageListItem> */}
                <img src={image} alt="" width="250px" />
                {/* </ImageListItem> */}
              </a>
            ))}
            {/* ))} */}
            {/* </ImageList> */}
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
    </Grid>
  );
};

export default PrivateImageList;
