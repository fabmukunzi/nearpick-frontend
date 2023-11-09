import { theme, ThemeConfig } from 'antd';

const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#10239e',
    colorText: '#001d66',
    colorLink: '#10239e',
    colorError:'#ff7875'
  },
  components: {
    Button: {
      defaultBg:'#001d66',
      colorPrimaryBg:'#001d66',
      controlHeight:40,
      fontWeight: 'bold',
      colorText:'white',
      textHoverBg: '#d9d9d9'
    },
    Input: {
      controlHeight: 32,
      controlHeightLG: 45,
      controlHeightSM: 24,
    },
  },
};

export default antdTheme;
