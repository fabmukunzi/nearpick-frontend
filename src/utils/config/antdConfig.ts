import { theme, ThemeConfig } from 'antd';

const antdTheme: ThemeConfig = {
  // token: {
  //   colorPrimary: 'white',
  //   colorText: 'white',
  //   colorLink: 'grey',
  //   colorError:'#ff7875',
  //   fontWeightStrong:10,
  //   fontFamilyCode:'Poppins'
  // },
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
