export const colors = {
  palette: {
    white: '#FFFFFF',
    gray: {
      '200': '#EEEEEE',
      '400': '#BDBDBD',
      '700': '#616161',
    },
    green: {
      '400': '#66BB6A',
      '500': '#4CAF50',
      '600': '#43A047',
    },
  },
};
export const styles = {
  radius: 2,
  border: `solid 1px ${colors.palette.gray['200']}`,
  colors: {
    white: colors.palette.white,
    primary: colors.palette.green['600'],
    secondaryText: colors.palette.gray['700'],
  },
};
