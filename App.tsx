import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./src/store/AuthStore";
import { TaskProvider } from "./src/store/TaskStore";
import AppNavigator from "./src/navigation/AppNavigator";
const App = () => {
  return (
    <GestureHandlerRootView style={styles.mainContainer}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <AuthProvider>
          <TaskProvider>
            <AppNavigator />
          </TaskProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
export default App;
