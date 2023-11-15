/* eslint-disable no-undef */
module.exports = {
  important: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#112545',
        primary: '#64B937',
        primary_dark: '#854019',
        'card-bg': '#ffffff',
      },
      margin: {
        page: '20px',
      },
      padding: {
        page: '20px',
      },
      screens: {
        xxs: '380px',
        x: '414px',
        pro: '428px',
        galaxy: '800px',
        air: '820px',
        fold: '884px',
        laptop: '1024px',
        desktop: '1280px',
        dell: '1440px',
        mac: '1728px',
        imac: '2048px',
      },
    },
  },
  plugins: [],
};
