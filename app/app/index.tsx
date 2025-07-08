import { init } from '@instantdb/react-native';
import { View } from 'react-native';

import { Text } from '~app/components/ui/text';
import schema from '~shared/instant.schema';

const APP_ID = 'TEST_APP_ID';
export const db = init({
	appId: APP_ID,
	schema,
	devtool: false,
});

export default function Screen() {
	const { data, isLoading, error } = db.useQuery({
		expenses: {},
	});
	if (isLoading) return <Text>Loading...</Text>;
	if (error || !data) return <Text>Error: {error?.message}</Text>;
	const expense = data.expenses[0]!;

	return (
		<View>
			<Text className="text-lg font-bold text-foreground">{expense.name}</Text>
			<Text className="text-lg font-bold text-foreground">{expense.amount}</Text>
		</View>
	);
}
