import { DefaultMantineColor, Tuple } from '@mantine/core';

type ExtendedCustomColors =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'neutral'
  | DefaultMantineColor;

export default <Record<ExtendedCustomColors, Tuple<string, 9>>>{
  primary: [
    '#FFECD1',
    '#FFD3A4',
    '#FFB577',
    '#FF9755',
    '#FF671D',
    '#DB4915',
    '#B7300E',
    '#00ABB6',
    '#00ABB6',
  ],
  secondary: [
    '#CCFEF4',
    '#9AFEF1',
    '#67FCF5',
    '#41F3FA',
    '#04DBF7',
    '#02ABD4',
    '#0281B1',
    '#015C8F',
    '#004376',
  ],
  success: [
    '#EEFDD5',
    '#D9FBAC',
    '#BCF481',
    '#9FE960',
    '#74DB30',
    '#56BC23',
    '#3D9D18',
    '#277F0F',
    '#186909',
  ],
  info: [
    '#D5ECFF',
    '#ACD7FF',
    '#82BEFF',
    '#63A8FF',
    '#3083FF',
    '#2365DB',
    '#184BB7',
    '#0F3493',
    '#09247A',
  ],
  warning: [
    '#FEFBCC',
    '#FEF799',
    '#FCF066',
    '#FAE940',
    '#F7DE02',
    '#D4BC01',
    '#B19C01',
    '#8F7C00',
    '#766500',
  ],
  danger: [
    '#FFE6DB',
    '#FFC8B8',
    '#FFA395',
    '#FF807A',
    '#FF4F57',
    '#DB394F',
    '#B72747',
    '#93193F',
    '#7A0F3A',
  ],
  neutral: [
    '#F5F5F5',
    '#EDEDED',
    '#E0E0E0',
    '#C2C2C2',
    '#9E9E9E',
    '#757575',
    '#616161',
    '#424242',
    '#0A0A0A',
  ],
};
