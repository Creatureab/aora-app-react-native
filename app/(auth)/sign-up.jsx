import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButtons from "../../components/CustomButtons";
import FormField from "../../components/FormField";
import { images } from "../../constants";

// ─── Constants ────────────────────────────────────────────────────────────────
const INITIAL_FORM = { username: "", email: "", password: "" };

// ─── Component ────────────────────────────────────────────────────────────────
const SignUp = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleField = (field) => (value) =>
    setForm((prev) => ({ ...prev, [field]: value }));
  const submit = () => {};

  return (
    // ── Outer safe area — dark background fills entire screen
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View className="w-full justify-center min-h-[85vh] px-6 py-8">
          {/* ── Logo ─────────────────────────────────────────── */}
          <Image
            source={images.logo}
            resizeMode="contain"
            style={styles.logo}
          />

          {/* ── Heading ──────────────────────────────────────── */}
          <Text className="text-3xl text-white font-pbold mt-10">
            Create Account
          </Text>
          <Text className="text-base text-gray-400 font-pregular mt-2">
            Sign up to get started with Aora
          </Text>

          {/* ── Divider ──────────────────────────────────────── */}
          <View className="h-[1px] bg-gray-800 mt-6 mb-2" />

          {/* ── Username field ───────────────────────────────── */}
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={handleField("username")}
            otherStyles="mt-5"
            keyboardType="default"
            placeholder="Enter your username"
          />

          {/* ── Email field ──────────────────────────────────── */}
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={handleField("email")}
            otherStyles="mt-5"
            keyboardType="email-address"
            placeholder="Enter your email"
          />

          {/* ── Password field ───────────────────────────────── */}
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={handleField("password")}
            otherStyles="mt-5"
            secureTextEntry
            placeholder="Create a password"
          />

          {/* ── Submit button ────────────────────────────────── */}
          <CustomButtons
            title="sigin-in"
            handlePress={submit}
            containerStyles="w-full mt-8"
            isLoading={isSubmitting}
          />

          {/* ── Sign in link ─────────────────────────────────── */}
          <View className="flex-row justify-center items-center mt-6 gap-2">
            <Text className="text-gray-400 font-pregular text-base">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className="text-secondary font-psemibold text-base"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Styles (only for things NativeWind can't handle cleanly) ─────────────────
const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  logo: {
    width: 115,
    height: 35,
  },
});

export default SignUp;
