import { Colors, ColorScheme } from '@/constants';
import { useColorScheme } from 'react-native';

export function useTheme(): ColorScheme {
  const scheme = useColorScheme();
  return scheme === 'dark' ? Colors.dark : Colors.light;
}