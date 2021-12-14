import { FC, useRef } from 'react';
import { Grid, Box } from '@mui/material';
import { useColors } from '../../hooks/useColors';
// import { styled } from "@mui/styles";

// const BaseStyled = styled()

const BaseGround: FC = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const colors = useColors();

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        height: '100vh',
        backgroundColor: colors.baseGround,
        margin: 0,
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        columnSpacing={{ xs: 0, sm: 0, md: 1 }}
        paddingY={{ xs: 0, sm: 0, md: 1 }}
        alignItems="flex-start"
        height="100%"
        wrap="nowrap"
        overflow="scroll"
      >
        {children}
      </Grid>
    </Box>
  );
};

export default BaseGround;
