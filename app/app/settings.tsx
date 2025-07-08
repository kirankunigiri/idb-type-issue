import { View } from 'react-native';

import { ThemeToggle } from '~app/components/ThemeToggle';
import { Text } from '~app/components/ui/text';

export default function SettingsScreen() {
	return (
		<View className="bg-background p-6">
			<Text className="mb-6 text-2xl font-bold text-foreground">Settings</Text>

			<View className="flex-row items-center justify-between py-4">
				<View className="">
					<Text className="mb-1 text-lg font-semibold text-foreground">Theme</Text>
					<Text className="text-sm text-muted-foreground">
						Toggle between light and dark mode
					</Text>
				</View>
				<ThemeToggle />
			</View>
		</View>
	);
}
