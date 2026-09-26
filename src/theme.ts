import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    colorPrimary: '#341E13',
    colorLink: '#5C3E55',
    colorText: '#341E13',
    colorBorder: '#EFE6D8',
    colorError: '#B91C1C',
    fontFamily: "'DM Sans', sans-serif",
    borderRadius: 6,
    borderRadiusLG: 12,
  },
  components: {
    Button: {
      fontWeight: 600,
      primaryShadow: 'none',
    },
    Input: {
      hoverBorderColor: '#5C3E55',
      activeBorderColor: '#5C3E55',
      activeShadow: 'none',
    },
    InputNumber: {
      hoverBorderColor: '#5C3E55',
      activeBorderColor: '#5C3E55',
      activeShadow: 'none',
    },
    Form: {
      labelFontSize: 14,
      verticalLabelPadding: '0 0 4px',
    },
    Modal: {
      titleFontSize: 18,
    },
  },
};
