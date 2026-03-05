import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";

// Icon Props Type
interface IconProps {
  size?: number;
  color?: string;
}

// Icon Factory — creates typed icon components
const createIcon = (name: keyof typeof Ionicons.glyphMap) => {
  const IconComponent: React.FC<IconProps> = ({
    size = 20,
    color = COLORS.text,
  }) => <Ionicons name={name} size={size} color={color} />;
  return IconComponent;
};

//Auth / Login Icons
export const Icons = {
  // Login Screen
  User: createIcon("person-outline"),
  UserFilled: createIcon("person"),
  Lock: createIcon("lock-closed-outline"),
  LockFilled: createIcon("lock-closed"),
  EyeShow: createIcon("eye-outline"),
  EyeHide: createIcon("eye-off-outline"),
  LogIn: createIcon("log-in-outline"),
  LogOut: createIcon("log-out-outline"),

  // Task Icons
  Task: createIcon("checkbox-outline"),
  TaskFilled: createIcon("checkbox"),
  TaskAdd: createIcon("add-circle-outline"),
  TaskEdit: createIcon("create-outline"),
  TaskDelete: createIcon("trash-outline"),
  TaskDone: createIcon("checkmark-circle"),
  TaskPending: createIcon("time-outline"),
  Clipboard: createIcon("clipboard-outline"),

  //Navigation Icons
  Back: createIcon("arrow-back-outline"),
  Close: createIcon("close-outline"),
  CloseCircle: createIcon("close-circle"),
  Menu: createIcon("menu-outline"),
  Add: createIcon("add"),

  //Input Icons───
  Search: createIcon("search-outline"),
  Calendar: createIcon("calendar-outline"),
  Description: createIcon("document-text-outline"),
  Flag: createIcon("flag-outline"),
  Alarm: createIcon("alarm-outline"),

  // Status Icons──
  Success: createIcon("checkmark-circle"),
  Warning: createIcon("warning-outline"),
  Info: createIcon("information-circle-outline"),
  Alert: createIcon("alert-circle-outline"),

  // Priority Icons
  ArrowUp: createIcon("arrow-up-outline"),
  ArrowDown: createIcon("arrow-down-outline"),
  Remove: createIcon("remove-outline"),

  // Profile / Misc
  Profile: createIcon("person-circle-outline"),
  ProfileFilled: createIcon("person-circle"),
  Settings: createIcon("settings-outline"),
  Star: createIcon("star-outline"),
  StarFilled: createIcon("star"),
  Time: createIcon("time-outline"),
  Stats: createIcon("bar-chart-outline"),
};

export { Ionicons };
export default Icons;
