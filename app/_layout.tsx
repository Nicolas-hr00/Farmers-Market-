import { Link, Stack } from 'expo-router';
import { Pressable, Text } from 'react-native';

export default function RootLayout() {
  return (
    <Stack >
      <Stack.Screen
        name="index"
        options={{ title: 'Farmers Market' }}
      />
      <Stack.Screen name="customer" options={{ title: 'Customer'}}/>
      <Stack.Screen name="vendor" options={{ title: 'Vendor'}}/>
      <Stack.Screen name="sign-in" options= {{ title: 'Sign-In'}}/>
       <Stack.Screen
  name="sign-up"
  options={{
    title: 'Sign up',
    headerBackTitle: 'Back',
    headerTransparent: false,
  }}
/>
    </Stack>

  
  );
}
