import * as SystemUI from 'expo-system-ui';
import { useColorScheme as useNativewindColorScheme } from 'nativewind';

export function useColorScheme() {
	const { colorScheme, setColorScheme: nativeWindSetColorScheme, toggleColorScheme } = useNativewindColorScheme();

	// TODO: Use the background color design token from nativewind
	const setColorScheme = (scheme: 'light' | 'dark' | 'system') => {
		nativeWindSetColorScheme(scheme);
		SystemUI.setBackgroundColorAsync('black');
	};

	return {
		colorScheme: colorScheme ?? 'dark',
		isDarkColorScheme: colorScheme === 'dark',
		setColorScheme,
		toggleColorScheme,
	};
}
