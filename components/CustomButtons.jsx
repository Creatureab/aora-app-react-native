import { LinearGradient } from "expo-linear-gradient";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

// ─── Constants ────────────────────────────────────────────────────────────────
const DEFAULT_GRADIENT = ["#F5C518", "#FFA001", "#FF8C00"];
const GRADIENT_START = { x: 0, y: 0 };
const GRADIENT_END = { x: 1, y: 0 };

// ─── Component ────────────────────────────────────────────────────────────────
/**
 * CustomButtons
 *
 * @param {string}   title           - Button label
 * @param {function} handlePress     - onPress handler
 * @param {string}   containerStyles - Extra NativeWind classes for outer wrapper
 * @param {object}   textStyle       - Extra StyleSheet style for label (use object, not string)
 * @param {boolean}  isLoading       - Shows spinner and disables interaction
 * @param {string[]} gradientColors  - 2-3 hex colours for L→R gradient; defaults to gold
 */
const CustomButtons = ({
  title,
  handlePress,
  containerStyles = "",
  textStyle,
  isLoading = false,
  gradientColors = DEFAULT_GRADIENT,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.75}
      disabled={isLoading}
      accessible
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: isLoading, busy: isLoading }}
      className={`rounded-xl min-h-[62px] justify-center items-center overflow-hidden
        ${isLoading ? "opacity-50" : "opacity-100"}
        ${containerStyles}`}
    >
      {/* Gradient fills the entire button behind content */}
      <LinearGradient
        colors={gradientColors}
        start={GRADIENT_START}
        end={GRADIENT_END}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      {/* Content: spinner while loading, label otherwise */}
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color="#161622"
          accessibilityLabel="Loading"
        />
      ) : (
        <Text
          className="font-psemibold text-lg"
          style={[styles.label, textStyle]}
          numberOfLines={1}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  label: {
    color: "#162216", // dark text on gold = high contrast, premium feel
    letterSpacing: 0.4,
  },
});

export default CustomButtons;
