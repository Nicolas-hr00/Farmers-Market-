import { Link, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

type ChoiceButtonProps = { 
  title: string;
  subtitle: string;
  onPress: () => void; 
};

function ChoiceButton({ title, subtitle, onPress }: ChoiceButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.arrow}>→</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'left', 'right']}
    >
      <View style={styles.content}>
        <Text style={styles.heading}>Welcome!</Text>

        <ChoiceButton
          title="I'm shopping"
          subtitle="Browse local vendors and place preorders"
          onPress={() => router.push('/customer')}
        />

        <ChoiceButton
          title="I'm a vendor"
          subtitle="Browse as a vendor and get your menu ready"
          onPress={() => router.push('/vendor')}
        />

        <Link href="/sign-in" style={styles.signInLink}>
          Already have an account? Sign in
        </Link>
      </View>

      <View
        style={[
          styles.signUpFooter,
          { paddingBottom: insets.bottom },
        ]}
      >
        <Link href="/sign-up" asChild>
          <Pressable
            style={({ pressed }) => [
              styles.signUpButton,
              pressed && styles.signUpButtonPressed,
            ]}
          >
            <Text style={styles.signUpText}>Create an account</Text>
            <Text style={styles.signUpArrow}>→</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 104,
    backgroundColor: '#234735',
    borderRadius: 18,
    padding: 20,
    paddingRight: 48,
    marginTop: 14,
    justifyContent: 'center',
    shadowColor: '#173323',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 3,
  },
  signInLink: {
    color: '#234735',
    fontSize: 16,
    marginTop: 24,
  },
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
  heading: {
    color: '#234735',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 12,
  },
  title: {
    color: '#FFFEF9',
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    color: '#E4ECD9',
    fontSize: 14, 
    marginTop: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F5EC',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  arrow: {
    position: 'absolute',
    right: 18,
    top: 28,
    color: '#F0C75E',
    fontSize: 24,
    fontWeight: '700',
  },
  signUpFooter: {
    width: '100%',
    backgroundColor: '#F0C75E',
    paddingTop: 8,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    shadowColor: '#173323',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
  },
  signUpButton: {
    width: '100%',
    minHeight: 72,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  signUpButtonPressed: {
    opacity: 0.86,
  },
  signUpText: {
    width: '100%',
    textAlign: 'center',
    color: '#173323',
    fontSize: 18,
    fontWeight: '700',
  },
  signUpArrow: {
    position: 'absolute',
    right: 24,
    color: '#F0C75E',
    fontSize: 24,
    fontWeight: '700',
  },
});