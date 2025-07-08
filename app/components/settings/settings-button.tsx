import { useRouter } from 'expo-router';
import { Settings } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { useColorScheme } from '~app/lib/useColorScheme';

export function SettingsButton() {
	const { isDarkColorScheme } = useColorScheme();
	const color = isDarkColorScheme ? 'white' : 'black';
	const router = useRouter();

	const openSettings = () => {
		router.push('/settings');
	};

	return (
		<Pressable
			onPress={openSettings}
			className="active:opacity-70 web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2"
		>
			<View className="aspect-square flex-1 items-start justify-center pt-0.5 web:px-5">
				<Settings color={color} size={24} strokeWidth={1.25} />
			</View>
		</Pressable>
	);
}
