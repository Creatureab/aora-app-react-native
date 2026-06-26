import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomButton } from "../../components/CustomButtons";
import { FormField } from "../../components/FormField";
import { images } from "../../constants";
//import { useGlobalContext } from "../context/GlobalProvider";
//import { getCurrentUser, signIn } from "../../lib/appwrite";

// ─── Constants ────────────────────────────────────────────────────────────────
const INITIAL_FORM = { email: "", password: "" };

// ─── Validation ───────────────────────────────────────────────────────────────
const validate = ({ email, password }) => {
  if (!email.trim() || !password.trim()) return "Please fill in all fields.";
  if (!/\S+@\S+\.\S+/.test(email)) return "Enter a valid email address.";
  return null;
};

// ─── Component ────────────────────────────────────────────────────────────────
const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { height: windowHeight } = useWindowDimensions();

  const handleField = (field) => (value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    // 1. Validate locally first
    const error = validate(form);
    if (error) {
      Alert.alert("Validation Error", error);
      return;
    }

    setIsSubmitting(true);
    try {
      // 2. Sign in via Appwrite
      await signIn(form.email, form.password);

      // 3. Fetch current user and update global context
      const user = await getCurrentUser();
      setUser(user);
      setIsLogged(true);

      // 4. Navigate to home
      router.replace("/home");
    } catch (err) {
      Alert.alert("Sign In Failed", err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.container, { minHeight: windowHeight - 100 }]}>
          {/* ── Logo ─────────────────────────────────────────── */}
          <Image
            source={images.logo}
            resizeMode="contain"
            style={styles.logo}
          />

          {/* ── Heading ──────────────────────────────────────── */}
          <Text style={styles.heading}>Log in to Aora</Text>
          <Text style={styles.subheading}>
            Welcome back! Please enter your details.
          </Text>

          {/* ── Divider ──────────────────────────────────────── */}
          <View style={styles.divider} />

          {/* ── Email ────────────────────────────────────────── */}
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={handleField("email")}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder="Enter your email"
          />

          {/* ── Password ─────────────────────────────────────── */}
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={handleField("password")}
            otherStyles="mt-7"
            secureTextEntry
            placeholder="Enter your password"
          />

          {/* ── Submit ───────────────────────────────────────── */}
          <CustomButton
            title="Sign In"
            handlePress={handleSubmit}
            containerStyles="w-full mt-8"
            isLoading={isSubmitting}
          />

          {/* ── Sign up link ─────────────────────────────────── */}
          <View style={styles.linkRow}>
            <Text style={styles.linkText}>Don't have an account?</Text>
            <Link href="/sign-up" style={styles.link}>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#161622", // bg-primary
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 16, // px-4
    paddingVertical: 24, // my-6
  },
  logo: {
    width: 115,
    height: 34,
  },
  heading: {
    fontSize: 24, // text-2xl
    color: "#FFFFFF", // text-white
    fontFamily: "Poppins-SemiBold", // font-psemibold
    marginTop: 40, // mt-10
  },
  subheading: {
    fontSize: 14,
    color: "#9CA3AF", // text-gray-400
    fontFamily: "Poppins-Regular",
    marginTop: 6,
  },
  divider: {
    height: 1,
    backgroundColor: "#1F2937", // gray-800
    marginTop: 24,
    marginBottom: 4,
  },
  linkRow: {
    flexDirection: "row", // flex-row
    justifyContent: "center", // justify-center
    alignItems: "center", // items-center
    paddingTop: 20, // pt-5
    gap: 8, // gap-2
  },
  linkText: {
    fontSize: 16, // text-lg (approx)
    color: "#9CA3AF", // text-gray-100 (muted)
    fontFamily: "Poppins-Regular", // font-pregular
  },
  link: {
    fontSize: 16,
    color: "#FFA001", // text-secondary (gold)
    fontFamily: "Poppins-SemiBold", // font-psemibold
  },
});

export default SignIn;
