import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButtons from "../components/CustomButtons";
import { images } from "../constants";

// ─── Constants ────────────────────────────────────────────────────────────────
const CARDS_ASPECT_RATIO = 298 / 380;
const MAX_CARDS_WIDTH = 380;
const HORIZONTAL_PADDING = 32;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getCardsDimensions = (windowWidth, windowHeight) => {
  const width = Math.min(windowWidth - HORIZONTAL_PADDING, MAX_CARDS_WIDTH);
  const height = Math.min(width * CARDS_ASPECT_RATIO, windowHeight * 0.38);
  return { width, height };
};

// ─── Component ────────────────────────────────────────────────────────────────
const Welcome = () => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const { width: cardsWidth, height: cardsHeight } = getCardsDimensions(
    windowWidth,
    windowHeight,
  );

  const handleContinue = () => router.push("/sign-in");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View
          style={[
            styles.container,
            {
              paddingTop: windowHeight * 0.04,
              paddingBottom: 32,
            },
          ]}
        >
          {/* Logo */}
          <Image
            source={images.logo}
            style={styles.logo}
            resizeMode="contain"
            accessible
            accessibilityLabel="Aora logo"
          />

          {/* Hero cards image */}
          <Image
            source={images.cards}
            style={[
              styles.cards,
              {
                width: cardsWidth,
                height: cardsHeight,
                marginTop: windowHeight * 0.04,
              },
            ]}
            resizeMode="contain"
          />

          {/* Heading + decorative underline */}
          <View style={styles.headingWrapper}>
            <Text style={styles.heading}>
              Discover Endless{"\n"}Possibilities with{" "}
              <Text style={styles.headingAccent}>Aora</Text>
            </Text>
            <Image
              source={images.path}
              style={[styles.pathUnderline, { right: windowWidth * 0.12 }]}
              resizeMode="contain"
            />
          </View>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Where creativity meets innovation: embark on a journey of limitless
            exploration with Aora
          </Text>

          {/* Pushes button to bottom */}
          <View style={styles.spacer} />

          {/* CTA */}
          <CustomButtons
            title="Continue with Email"
            handlePress={handleContinue}
            containerStyles="w-full"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 2,
    backgroundColor: "#161622",
  },
  scrollContent: {
    flexGrow: 2,
  },
  container: {
    flex: 2,
    alignItems: "center",
    paddingHorizontal: HORIZONTAL_PADDING / 2,
  },
  logo: {
    width: 200,
    height: 80,
  },
  cards: {
    maxWidth: "100%",
  },
  headingWrapper: {
    position: "relative",
    marginTop: 50,
    paddingBottom: 16,
    alignItems: "center",
  },
  heading: {
    fontSize: 32,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 42,
  },
  headingAccent: {
    color: "#FFA001",
  },
  pathUnderline: {
    width: 100,
    height: 12,
    position: "absolute",
    bottom: 0,
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    color: "#9CA3AF",
    fontSize: 15,
    textAlign: "center",
    marginTop: 16,
    paddingHorizontal: 16,
    lineHeight: 22,
  },
  spacer: {
    flex: 1,
    minHeight: 32,
  },
});

export default Welcome;
