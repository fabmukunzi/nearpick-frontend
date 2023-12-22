import { theme, ThemeConfig } from 'antd';

const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#00b012',
    colorText: 'rgb(26,32,26)',
    colorError: '#ff7875',
    fontWeightStrong: 10,
    fontFamilyCode: 'Poppins',
    colorLink: 'black',
    colorLinkHover: '#00b012',
    colorLinkActive: '#00b012',
  },
  components: {
    Button: {
      defaultBg: '#00b012',
      // colorPrimaryBg:'#00b012',
      // groupBorderColor:'#00b012',
      controlHeight: 40,
      // fontWeight: 'bold',
      colorText: 'white',
      // textHoverBg: 'white'
    },
    Input: {
      controlHeight: 32,
      controlHeightLG: 45,
      controlHeightSM: 24,
    },
    Menu: {
      lineHeight: 1,
    },
    Card:{
      colorBorder:'#00b012'
    }
  },
};

export default antdTheme;
