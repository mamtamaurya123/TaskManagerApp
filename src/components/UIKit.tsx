import React, { ReactNode } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInput,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
  FONT_WEIGHT,
} from "../constants";

//AppButton
interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  iconName?: keyof typeof Ionicons.glyphMap;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  style,
  iconName,
}) => {
  const variants = {
    primary: { bg: COLORS.primary, text: COLORS.card, border: "transparent" },
    secondary: {
      bg: COLORS.primaryLight,
      text: COLORS.primary,
      border: "transparent",
    },
    danger: { bg: COLORS.danger, text: COLORS.card, border: "transparent" },
    ghost: { bg: "transparent", text: COLORS.primary, border: COLORS.primary },
  };
  const sizes = {
    sm: { h: 36, font: FONT_SIZES.sm },
    md: { h: 48, font: FONT_SIZES.md },
    lg: { h: 52, font: FONT_SIZES.lg },
  };
  const { bg, text, border } = variants[variant];
  const { h, font } = sizes[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      style={[
        styles.btn,
        {
          backgroundColor: bg,
          height: h,
          borderWidth: border !== "transparent" ? 1.5 : 0,
          borderColor: border,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={text} size="small" />
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          {iconName && (
            <Ionicons name={iconName} size={font + 2} color={text} />
          )}
          <Text style={[styles.btnText, { color: text, fontSize: font }]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

//TextInput

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  iconName?: keyof typeof Ionicons.glyphMap;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  containerStyle,
  style,
  iconName,
  ...rest
}) => (
  <View style={[styles.inputWrapper, containerStyle]}>
    {label && <Text style={styles.label}>{label}</Text>}
    <View
      style={[styles.inputRow, error ? { borderColor: COLORS.danger } : {}]}
    >
      {iconName && (
        <Ionicons
          name={iconName}
          size={18}
          color={COLORS.textLight}
          style={{ marginLeft: SPACING.sm }}
        />
      )}
      <TextInput
        placeholderTextColor={COLORS.textLight}
        style={[styles.input, style as TextStyle]}
        {...rest}
      />
    </View>
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);

interface BadgeProps {
  label: string;
  color: string;
  bgColor: string;
}

export const Badge: React.FC<BadgeProps> = ({ label, color, bgColor }) => (
  <View style={[styles.badge, { backgroundColor: bgColor }]}>
    <Text style={[styles.badgeText, { color }]}>{label}</Text>
  </View>
);

//Card
interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, style, onPress }) => {
  const Wrapper: any = onPress ? TouchableOpacity : View;
  return (
    <Wrapper
      style={[styles.card, style]}
      {...(onPress ? { onPress, activeOpacity: 0.9 } : {})}
    >
      {children}
    </Wrapper>
  );
};

//EmptyState
interface EmptyStateProps {
  title: string;
  subtitle?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  action?: { label: string; onPress: () => void };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  subtitle,
  iconName = "clipboard-outline",
  action,
}) => (
  <View style={styles.emptyContainer}>
    <View style={styles.emptyIconWrap}>
      <Ionicons name={iconName} size={48} color={COLORS.primary} />
    </View>
    <Text style={styles.emptyTitle}>{title}</Text>
    {subtitle && <Text style={styles.emptySubtitle}>{subtitle}</Text>}
    {action && (
      <AppButton
        title={action.label}
        onPress={action.onPress}
        size="sm"
        style={{ marginTop: SPACING.md, paddingHorizontal: SPACING.xl }}
      />
    )}
  </View>
);

//Divider  styles
export const Divider: React.FC<{ style?: ViewStyle }> = ({ style }) => (
  <View style={[styles.divider, style]} />
);

const styles = StyleSheet.create({
  btn: {
    borderRadius: BORDER_RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
  },
  btnText: {
    fontWeight: FONT_WEIGHT.bold_700,
    letterSpacing: 0.3,
  },
  inputWrapper: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHT.bold_600,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.card,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
  errorText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.danger,
    marginTop: SPACING.xs,
  },
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.full,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHT.bold_700,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xxl,
  },
  emptyIconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHT.bold_700,
    color: COLORS.text,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: SPACING.xs,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
});
