import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";

// ─── Component ────────────────────────────────────────────────────────────────
const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles = "",
  keyboardType = "default",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = title === "Password";

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    // ✅ Template literal so otherStyles actually applies
    <View className={`space-y-2 ${otherStyles}`}>
      {/* Field label */}
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      {/* Input row */}
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          keyboardType={keyboardType}
          secureTextEntry={isPassword && !showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          {...props}
        />

        {/* Password toggle */}
        {isPassword && (
          <TouchableOpacity
            onPress={togglePassword}
            accessible
            accessibilityLabel={
              showPassword ? "Hide password" : "Show password"
            }
            accessibilityRole="button"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Image
              source={showPassword ? icons.eyeHide : icons.eye}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
