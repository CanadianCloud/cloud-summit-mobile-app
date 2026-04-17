import { Platform } from 'react-native';

export const FONTS = {
  // No local font files are bundled right now, so we use the platform default.
  // If you later add Inter ttf/otf files to `assets/`, you can update this single constant.
  sans: Platform.select({
    ios: 'System',
    android: 'System',
    default: 'System',
  }),
} as const;
