import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

const SCREEN_OPTIONS = { headerShown: false };

const AuthLayout = () => {
  return (
    <View style={styles.container}>
      <Stack screenOptions={SCREEN_OPTIONS}>
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
      </Stack>

      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622", // dark background
  },
});

export default AuthLayout;
