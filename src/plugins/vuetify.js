import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader

const lightTheme = {
  dark: false,
  colors: {
    primary: '#FF6A3D',
    secondary: '#222222',
    accent: '#6B7280',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    background: '#FFFFFF',
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: lightTheme
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});
