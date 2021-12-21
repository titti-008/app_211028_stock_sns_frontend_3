import { FC } from 'react';
import { Slider } from '@mui/material';

type PropsType = {
  value: number[];
  setValue: React.Dispatch<React.SetStateAction<number[]>>;
  maxYear: number;
};

const YearSlider: FC<PropsType> = ({ value, setValue, maxYear }) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const valuetext = (year: number) => `${year}年前`;

  const marks = [
    {
      value: 0,
      label: '現在',
    },
    {
      value: -1,
      label: '1年前',
    },
    {
      value: -2,
      label: '2年前',
    },
    {
      value: -5,
      label: '5年前',
    },
    {
      value: -10,
      label: '10年前',
    },
  ];

  return (
    <Slider
      getAriaLabel={() => '表示範囲(○○日前)'}
      min={-maxYear}
      max={0}
      step={1}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="on"
      getAriaValueText={valuetext}
      sx={{ marginTop: '30px', width: '90%' }}
      marks={marks}
    />
  );
};

export default YearSlider;
