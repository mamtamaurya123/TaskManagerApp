// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Animated,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StatusBar,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   Dimensions,
// } from 'react-native';
// import { useAuth } from '../store/AuthStore';
// import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, DUMMY_CREDENTIALS } from '../constants';

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// const LoginScreen: React.FC = () => {
//   const { login } = useAuth();

//   const [username, setUsername]   = useState('');
//   const [password, setPassword]   = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError]         = useState('');
//   const [showPass, setShowPass]   = useState(false);

//   // Ref for password field — allows "next" key to jump to it
//   const passwordRef = useRef<TextInput>(null);

//   // Animated
//   const fadeAnim  = useRef(new Animated.Value(0)).current;
//   const slideAnim = useRef(new Animated.Value(40)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim,  { toValue: 1, duration: 600, useNativeDriver: true }),
//       Animated.spring(slideAnim, { toValue: 0, friction: 8, tension: 65, useNativeDriver: true }),
//     ]).start();
//   }, []);

//   const handleLogin = async () => {
//     if (!username.trim() || !password.trim()) {
//       setError('Please enter username and password');
//       return;
//     }
//     setError('');
//     setIsLoading(true);
//     const result = await login(username.trim(), password);
//     setIsLoading(false);
//     if (!result.success) setError(result.error ?? 'Login failed');
//   };

//   return (
//     // ── FIX 1: behavior="padding" works on both iOS & Android ──
//     <KeyboardAvoidingView
//       style={styles.root}
//       behavior="padding"
//       keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
//     >
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

//       {/* ── FIX 2: ScrollView scrolls content above keyboard ── */}
//       <ScrollView
//         contentContainerStyle={styles.scroll}
//         keyboardShouldPersistTaps="handled"
//         showsVerticalScrollIndicator={false}
//         // ── FIX 3: Automatically insets content above keyboard ──
//         automaticallyAdjustKeyboardInsets={true}
//         bounces={false}
//       >
//         {/* Hero — smaller so form stays visible */}
//         <View style={styles.hero}>
//           <Animated.View style={[styles.logoWrap, { opacity: fadeAnim }]}>
//             <Text style={styles.logoEmoji}>✅</Text>
//           </Animated.View>
//           <Animated.Text style={[styles.heroTitle, { opacity: fadeAnim }]}>
//             TaskFlow
//           </Animated.Text>
//           <Animated.Text style={[styles.heroSub, { opacity: fadeAnim }]}>
//             Organize your day, your way
//           </Animated.Text>
//         </View>

//         {/* Form Card */}
//         <Animated.View
//           style={[
//             styles.formCard,
//             { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
//           ]}
//         >
//           <Text style={styles.formTitle}>Welcome back</Text>
//           <Text style={styles.formSub}>Sign in to continue</Text>

//           {/* Username Field */}
//           <View style={styles.fieldWrap}>
//             <Text style={styles.label}>Username</Text>
//             <View style={styles.inputRow}>
//               <Text style={styles.inputIcon}>👤</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder={`Try "${DUMMY_CREDENTIALS.username}"`}
//                 placeholderTextColor={COLORS.textLight}
//                 value={username}
//                 onChangeText={t => { setUsername(t); setError(''); }}
//                 autoCapitalize="none"
//                 autoCorrect={false}
//                 returnKeyType="next"
//                 // ── FIX 4: Jump to password on "next" press ──
//                 onSubmitEditing={() => passwordRef.current?.focus()}
//                 blurOnSubmit={false}
//               />
//             </View>
//           </View>

//           {/* Password Field */}
//           <View style={styles.fieldWrap}>
//             <Text style={styles.label}>Password</Text>
//             <View style={styles.inputRow}>
//               <Text style={styles.inputIcon}>🔒</Text>
//               {/* ── FIX 5: Attach ref so keyboard scrolls to it ── */}
//               <TextInput
//                 ref={passwordRef}
//                 style={styles.input}
//                 placeholder={`Try "${DUMMY_CREDENTIALS.password}"`}
//                 placeholderTextColor={COLORS.textLight}
//                 value={password}
//                 onChangeText={t => { setPassword(t); setError(''); }}
//                 secureTextEntry={!showPass}
//                 returnKeyType="done"
//                 onSubmitEditing={handleLogin}
//               />
//               {/* Show / hide password toggle */}
//               <TouchableOpacity
//                 onPress={() => setShowPass(v => !v)}
//                 style={styles.eyeBtn}
//                 activeOpacity={0.7}
//               >
//                 <Text style={styles.eyeIcon}>{showPass ? 'Show' : "Hide"}</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Error Banner */}
//           {!!error && (
//             <View style={styles.errorBanner}>
//               <Text style={styles.errorText}>⚠️  {error}</Text>
//             </View>
//           )}

//           {/* Login Button */}
//           <TouchableOpacity
//             onPress={handleLogin}
//             disabled={isLoading}
//             activeOpacity={0.85}
//             style={[styles.loginBtn, isLoading && { opacity: 0.7 }]}
//           >
//             {isLoading
//               ? <ActivityIndicator color="#fff" />
//               : <Text style={styles.loginBtnText}>Sign In →</Text>
//             }
//           </TouchableOpacity>

//           {/* Hint Box */}
//           <View style={styles.hintBox}>
//             <Text style={styles.hintText}>
//               Demo: <Text style={styles.hintVal}>admin</Text>
//               {' / '}
//               <Text style={styles.hintVal}>admin123</Text>
//             </Text>
//           </View>

//           {/* Extra bottom padding so button is never hidden by keyboard */}
//           <View style={{ height: SPACING.xxl }} />
//         </Animated.View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: COLORS.primary,
//   },
//   scroll: {
//     flexGrow: 1,
//     // ── FIX 6: Min height ensures card is always reachable ──
//     minHeight: SCREEN_HEIGHT,
//   },

//   // Hero — compact so it doesn't push form off screen
//   hero: {
//     alignItems: 'center',
//     paddingTop: SCREEN_HEIGHT * 0.08, // 8% of screen height — responsive
//     paddingBottom: SPACING.lg,
//   },
//   logoWrap: {
//     width: 72,
//     height: 72,
//     borderRadius: 22,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: SPACING.sm,
//   },
//   logoEmoji:  { fontSize: 36 },
//   heroTitle:  { fontSize: 32, fontWeight: '800', color: '#fff', letterSpacing: -0.5 },
//   heroSub:    { fontSize: FONT_SIZES.sm, color: 'rgba(255,255,255,0.75)', marginTop: 4 },

//   // Form card — rounded top corners, white background
//   formCard: {
//     backgroundColor: COLORS.background,
//     borderTopLeftRadius:  40,
//     borderTopRightRadius: 40,
//     paddingHorizontal: SPACING.xl,
//     paddingTop: SPACING.xl,
//     // ── FIX 7: flex: 1 fills remaining space ──
//     flex: 1,
//   },
//   formTitle: { fontSize: FONT_SIZES.xxl, fontWeight: '800', color: COLORS.text },
//   formSub:   { fontSize: FONT_SIZES.md, color: COLORS.textSecondary, marginBottom: SPACING.xl, marginTop: 4 },

//   // Input fields
//   fieldWrap: { marginBottom: SPACING.md },
//   label:     { fontSize: FONT_SIZES.sm, fontWeight: '600', color: COLORS.text, marginBottom: 6 },
//   inputRow:  {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1.5,
//     borderColor: COLORS.border,
//     borderRadius: BORDER_RADIUS.md,
//     backgroundColor: COLORS.card,
//     height: 52, // fixed height — consistent across devices
//   },
//   inputIcon: { fontSize: 16, paddingHorizontal: SPACING.sm },
//   input: {
//     flex: 1,
//     height: '100%',
//     fontSize: FONT_SIZES.md,
//     color: COLORS.text,
//     paddingRight: SPACING.sm,
//   },
//   eyeBtn:  { paddingHorizontal: SPACING.sm },
//   eyeIcon: { fontSize: 16 },

//   // Error
//   errorBanner: {
//     backgroundColor: '#FFF0F0',
//     borderRadius: BORDER_RADIUS.md,
//     padding: SPACING.sm,
//     marginBottom: SPACING.md,
//     borderLeftWidth: 3,
//     borderLeftColor: COLORS.danger,
//   },
//   errorText: { color: COLORS.danger, fontSize: FONT_SIZES.sm, fontWeight: '500' },

//   // Button
//   loginBtn: {
//     backgroundColor: COLORS.primary,
//     height: 52,
//     borderRadius: BORDER_RADIUS.md,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: SPACING.sm,
//     shadowColor: COLORS.primary,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.35,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   loginBtnText: { color: '#fff', fontSize: FONT_SIZES.lg, fontWeight: '700', letterSpacing: 0.3 },

//   // Hint
//   hintBox: {
//     marginTop: SPACING.lg,
//     padding: SPACING.md,
//     backgroundColor: COLORS.primaryLight,
//     borderRadius: BORDER_RADIUS.md,
//     alignItems: 'center',
//   },
//   hintText: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary },
//   hintVal:  { fontWeight: '700', color: COLORS.primary },
// });

// export default LoginScreen;

// ============================================================
// LOGIN SCREEN — Uses centralized Icons.tsx
// ============================================================

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useAuth } from "../store/AuthStore";
import { Icons } from "../Icons/Icons";
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
  DUMMY_CREDENTIALS,
  CONSTANTS_DATA,
  FONT_WEIGHT,
} from "../constants";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const LoginScreen: React.FC = () => {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const passwordRef = useRef<TextInput>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 65,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password");
      return;
    }
    setError("");
    setIsLoading(true);
    const result = await login(username.trim(), password);
    setIsLoading(false);
    if (!result.success) setError(result.error ?? "Login failed");
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -100}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
        bounces={false}
      >
        <View style={styles.hero}>
          <Animated.View style={[styles.logoWrap, { opacity: fadeAnim }]}>
            {/* <Text style={styles.logoEmoji}>✅</Text> */}
            <Icons.TaskDone size={40} color={COLORS.warning} />
          </Animated.View>
          <Animated.Text style={[styles.heroTitle, { opacity: fadeAnim }]}>
            {CONSTANTS_DATA.TASKSFLOW}
          </Animated.Text>
          <Animated.Text style={[styles.heroSub, { opacity: fadeAnim }]}>
            {CONSTANTS_DATA.Organize}
          </Animated.Text>
        </View>

        {/* ── Form Card ── */}
        <Animated.View
          style={[
            styles.formCard,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={styles.formTitle}>{CONSTANTS_DATA.Welcome}</Text>
          <Text style={styles.formSub}>{CONSTANTS_DATA.Sign}</Text>

          {/* Username Field */}
          <View style={styles.fieldWrap}>
            <Text style={styles.label}>{CONSTANTS_DATA.Username}</Text>
            <View style={styles.inputRow}>
              <View style={styles.iconWrap}>
                <Icons.User size={18} color={COLORS.textSecondary} />
              </View>
              <TextInput
                style={styles.input}
                placeholder={`Try "${DUMMY_CREDENTIALS.username}"`}
                placeholderTextColor={COLORS.textLight}
                value={username}
                onChangeText={(t) => {
                  setUsername(t);
                  setError("");
                }}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                blurOnSubmit={false}
              />
            </View>
          </View>

          {/* Password Field */}
          <View style={styles.fieldWrap}>
            <Text style={styles.label}>{CONSTANTS_DATA.Password}</Text>
            <View style={styles.inputRow}>
              <View style={styles.iconWrap}>
                <Icons.Lock size={18} color={COLORS.textSecondary} />
              </View>
              <TextInput
                ref={passwordRef}
                style={styles.input}
                placeholder={`Try "${DUMMY_CREDENTIALS.password}"`}
                placeholderTextColor={COLORS.textLight}
                value={password}
                onChangeText={(t) => {
                  setPassword(t);
                  setError("");
                }}
                secureTextEntry={!showPass}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              <TouchableOpacity
                onPress={() => setShowPass((v) => !v)}
                style={styles.eyeBtn}
                activeOpacity={0.7}
              >
                {showPass ? (
                  <Icons.EyeHide size={20} color={COLORS.textSecondary} />
                ) : (
                  <Icons.EyeShow size={20} color={COLORS.textSecondary} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Error Banner */}
          {!!error && (
            <View style={styles.errorBanner}>
              <Icons.Warning size={16} color={COLORS.danger} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.85}
            style={[styles.loginBtn, isLoading && { opacity: 0.7 }]}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.card} />
            ) : (
              <View style={styles.loginBtnContent}>
                <Text style={styles.loginBtnText}>{CONSTANTS_DATA.Signin}</Text>
                <Icons.LogIn size={20} color={COLORS.card} />
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.hintBox}>
            <Icons.Info size={14} color={COLORS.primary} />
            <Text style={styles.hintText}>
              {CONSTANTS_DATA.Demo}
              <Text style={styles.hintVal}>{DUMMY_CREDENTIALS.username}</Text>
              {" / "}
              <Text style={styles.hintVal}>{DUMMY_CREDENTIALS.password}</Text>
            </Text>
          </View>

          <View style={{ height: SPACING.xxl }} />
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  scroll: {
    flexGrow: 1,
    minHeight: SCREEN_HEIGHT,
  },
  hero: {
    alignItems: "center",
    paddingTop: SCREEN_HEIGHT * 0.08,
    paddingBottom: SPACING.lg,
  },
  logoWrap: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  logoEmoji: { fontSize: 36 },
  heroTitle: {
    fontSize: 32,
    fontWeight: FONT_WEIGHT.bold_800,
    color: COLORS.card,
    letterSpacing: -0.5,
  },
  heroSub: {
    fontSize: FONT_SIZES.sm,
    color: "rgba(255,255,255,0.75)",
    marginTop: 4,
  },
  formCard: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    flex: 1,
  },
  formTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHT.bold_800,
    color: COLORS.text,
  },
  formSub: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
    marginTop: 4,
  },
  fieldWrap: { marginBottom: SPACING.md },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHT.bold_600,
    color: COLORS.text,
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.card,
    height: 52,
  },
  iconWrap: {
    width: 44,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    paddingHorizontal: SPACING.sm,
  },
  eyeBtn: {
    paddingHorizontal: SPACING.sm,
    height: "100%",
    justifyContent: "center",
  },
  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.sm,
    marginBottom: SPACING.md,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.danger,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHT.bold_500,
    flex: 1,
  },
  loginBtn: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.sm,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  loginBtnContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  loginBtnText: {
    color: COLORS.card,
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHT.bold_700,
    letterSpacing: 0.3,
  },
  hintBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    marginTop: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: COLORS.primaryLight,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: "center",
  },
  hintText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  hintVal: {
    fontWeight: FONT_WEIGHT.bold_700,
    color: COLORS.primary,
  },
});

export default LoginScreen;
