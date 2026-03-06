import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { useAuth } from "../store/AuthStore";
import LoginScreen from "../screens/LoginScreen";
import TaskListScreen from "../screens/TaskListScreen";
import TaskDetailScreen from "../screens/TaskDetailScreen";
import AddEditTaskScreen from "../screens/AddEditTaskScreen";
import ProfileScreen from "../screens/ProfileScreen";

import {
  RootStackParamList,
  MainTabParamList,
  TaskStackParamList,
} from "../types";
import { COLORS, CONSTANTS_DATA, FONT_SIZES, FONT_WEIGHT } from "../constants";
import Icons from "../Icons/Icons";

const RootStack = createStackNavigator<RootStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const TaskStack = createStackNavigator<TaskStackParamList>();

//Task Stack
const TaskNavigator: React.FC = () => (
  <TaskStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: COLORS.background,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: COLORS.primary,
      headerTitleStyle: {
        fontWeight: FONT_WEIGHT.bold_700,
        fontSize: FONT_SIZES.lg,
        color: COLORS.text,
      },
      cardStyle: { backgroundColor: COLORS.background },
    }}
  >
    <TaskStack.Screen
      name={CONSTANTS_DATA.TaskList}
      component={TaskListScreen}
      options={{ title: CONSTANTS_DATA.MyTasks }}
    />
    <TaskStack.Screen
      name={CONSTANTS_DATA.TaskDetail}
      component={TaskDetailScreen}
      options={{ title: CONSTANTS_DATA.TaskDetails }}
    />
    <TaskStack.Screen
      name={CONSTANTS_DATA.AddEditTask}
      component={AddEditTaskScreen}
      options={{ title: CONSTANTS_DATA.New_Task }}
    />
  </TaskStack.Navigator>
);

//Main Tabs
const MainNavigator: React.FC = () => (
  <MainTab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: tabStyles.bar,
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.textLight,
      tabBarLabelStyle: tabStyles.label,
    }}
  >
    <MainTab.Screen
      name={CONSTANTS_DATA.TasksTab}
      component={TaskNavigator}
      options={{
        tabBarLabel: "Tasks",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="checkbox-outline" size={size} color={color} />
        ),
      }}
    />
    <MainTab.Screen
      name={CONSTANTS_DATA.ProfileTab}
      component={ProfileScreen}
      options={{
        headerShown: true,
        title: "Profile",
        headerStyle: {
          backgroundColor: COLORS.background,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontWeight: FONT_WEIGHT.bold_700,
          fontSize: FONT_SIZES.lg,
        },
        tabBarLabel: "Profile",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-outline" size={size} color={color} />
        ),
      }}
    />
  </MainTab.Navigator>
);

// Root + Auth
const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.splash}>
        {/* <Text style={styles.splashEmoji}>✅</Text> */}
         <Icons.TaskDone size={30} color={COLORS.success} />
        <Text style={styles.splashTitle}>{CONSTANTS_DATA.TASKSFLOW}</Text>
        <ActivityIndicator color={COLORS.card} style={{ marginTop: 24 }} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="Main" component={MainNavigator} />
        ) : (
          <RootStack.Screen name="Login" component={LoginScreen} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  splashEmoji: { fontSize: 64, marginBottom: 12 },
  splashTitle: {
    fontSize: 36,
    fontWeight: FONT_WEIGHT.bold_800,
    color: COLORS.card,
  },
});

const tabStyles = StyleSheet.create({
  bar: {
    backgroundColor: COLORS.card,
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    height: 90,
    paddingBottom: 10,
    paddingTop: 8,
    elevation: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  label: { fontSize: 11, fontWeight: FONT_WEIGHT.bold_600 },
});

export default AppNavigator;
