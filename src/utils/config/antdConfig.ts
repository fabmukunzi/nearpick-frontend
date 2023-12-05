import { theme, ThemeConfig } from 'antd';

const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#64B937',
    colorText: 'rgb(26,32,26)',
    colorError: '#ff7875',
    fontWeightStrong: 10,
    fontFamilyCode: 'Poppins',
    colorLink: 'black',
    colorLinkHover: '#64B937',
    colorLinkActive: '#64B937',
  },
  components: {
    Button: {
      defaultBg: '#64B937',
      // colorPrimaryBg:'#64B937',
      // groupBorderColor:'#64B937',
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
      colorBorder:'#64B937'
    }
  },
};

export default antdTheme;
