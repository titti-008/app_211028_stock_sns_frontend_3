import { Box } from '@mui/material';
// import { styled } from "@mui/styles";

// const BaseStyled = styled()

const BaseGround = (children: Node) => {
  const pad = 10;
  const marg = 10;

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: 'default',
        padding: pad,
        margin: marg,
      }}
    >
      {children}
    </Box>
  );
};

export default BaseGround;
