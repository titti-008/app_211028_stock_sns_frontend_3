import { FC } from 'react';
import { Micropost } from '../Types';
import { NormalText } from '../privateMUI/PrivateTexts';
import IconText from '../privateMUI/IconText';

/* eslint-disable */
type PropsType = {
  microposts: Micropost[];
};

const Feed: FC<PropsType> = (_props) => {
  const props = _props;

  return (
    <>
      {props.microposts.length !== 0 ? (
        props.microposts.map((micropost: Micropost) => (
          <IconText
            linkTo={`/users/${micropost.user.id}`}
            key={micropost.user.id}
            name={micropost.user.name}
            date={new Date(micropost.createdAt)}
          >
            <NormalText>{micropost.content}</NormalText>
          </IconText>
        ))
      ) : (
        <NormalText>...loading</NormalText>
      )}
    </>
  );
};

export default Feed;

/* eslint-disable */
