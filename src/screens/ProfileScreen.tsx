// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useAuth } from "../store/AuthStore";
// import { useTaskStore } from "../store/TaskStore";
// import { Card } from "../components/UIKit";
// import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, FONT_WEIGHT, CONSTANTS_DATA } from "../constants";
// import { groupByPriority } from "../utils/helpers";

// const ProfileScreen: React.FC = () => {
//   const { user, logout } = useAuth();
//   const { state } = useTaskStore();
//   const { tasks } = state;

//   const completed = tasks.filter((t) => t.status === "completed").length;
//   const pending = tasks.filter((t) => t.status === "pending").length;
//   const total = tasks.length;
//   const pct = total ? Math.round((completed / total) * 100) : 0;
//   const byPriority = groupByPriority(tasks);

//   const initials =
//     user?.name
//       ?.split(" ")
//       .map((n) => n[0])
//       .join("") ?? "U";

//   const handleLogout = () => {
//     Alert.alert("Sign Out", "Are you sure?", [
//       { text: CONSTANTS_DATA.Cancel, style: "cancel" },
//       { text:CONSTANTS_DATA.Sign_Out, style: "destructive", onPress: logout },
//     ]);
//   };

//   const statCards = [
//     {
//       icon: "list-outline" as const,
//       label: CONSTANTS_DATA.Total,
//       value: total,
//       color: COLORS.primary,
//     },
//     {
//       icon: "checkmark-circle" as const,
//       label: CONSTANTS_DATA.Done,
//       value: completed,
//       color: COLORS.success,
//     },
//     {
//       icon: "time-outline" as const,
//       label: CONSTANTS_DATA.Pending,
//       value: pending,
//       color: COLORS.warning,
//     },
//   ];

//   const priorityBars = [
//     { label: CONSTANTS_DATA.High, color: COLORS.danger, count: byPriority["high"]?.length ?? 0 },
//     {
//       label: CONSTANTS_DATA.Medium,
//       color: COLORS.warning,
//       count: byPriority["medium"]?.length ?? 0,
//     },
//     { label: CONSTANTS_DATA.Low, color: COLORS.success, count: byPriority["low"]?.length ?? 0 },
//   ];

//   return (
//     <ScrollView style={styles.root} contentContainerStyle={styles.scroll}>
//       {/* Profile */}
//       <View style={styles.avatarSection}>
//         <View style={styles.avatar}>
//           <Text style={styles.avatarText}>{initials}</Text>
//         </View>
//         <Text style={styles.name}>{user?.name}</Text>
//         <Text style={styles.username}>{user?.username}</Text>
//       </View>

//       {/* Stat Cards */}
//       <View style={styles.statsRow}>
//         {statCards.map(({ icon, label, value, color }) => (
//           <Card key={label} style={styles.statCard}>
//             <Ionicons name={icon} size={24} color={color} />
//             <Text style={[styles.statValue, { color }]}>{value}</Text>
//             <Text style={styles.statLabel}>{label}</Text>
//           </Card>
//         ))}
//       </View>

//       {/* Priority Breakdown */}
//       <Card style={styles.breakdownCard}>
//         <Text style={styles.cardTitle}>{CONSTANTS_DATA.TaskPriorty}</Text>
//         {priorityBars.map(({ label, color, count }) => (
//           <View key={label} style={styles.barRow}>
//             <View style={[styles.dot, { backgroundColor: color }]} />
//             <Text style={styles.barLabel}>{label}</Text>
//             <View style={styles.barTrack}>
//               <View
//                 style={[
//                   styles.barFill,
//                   {
//                     backgroundColor: color,
//                     width: total ? (`${(count / total) * 100}%` as any) : "0%",
//                   },
//                 ]}
//               />
//             </View>
//             <Text style={styles.barCount}>{count}</Text>
//           </View>
//         ))}
//       </Card>

//       {/* Completion Rate */}
//       {total > 0 && (
//         <Card style={styles.rateCard}>
//           <Text style={styles.cardTitle}>{CONSTANTS_DATA.COMP}</Text>
//           <Text style={styles.rateValue}>{pct}%</Text>
//           <View style={styles.rateTrack}>
//             <View style={[styles.rateFill, { width: `${pct}%` as any }]} />
//           </View>
//         </Card>
//       )}

//       {/* Logout */}
//       <TouchableOpacity
//         onPress={handleLogout}
//         style={styles.logoutBtn}
//         activeOpacity={0.8}
//       >
//         <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
//         <Text style={styles.logoutText}>{CONSTANTS_DATA.Sign_Out}</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   root: {
//      flex: 1,
//      backgroundColor: COLORS.background
//     },
//   scroll: {
//     paddingHorizontal: SPACING.md,
//      paddingBottom: SPACING.xxl
//     },
//   avatarSection: {
//     alignItems: "center",
//     paddingVertical: SPACING.xl
//   },
//   avatar: {
//     width: 88,
//     height: 88,
//     borderRadius: 44,
//     backgroundColor: COLORS.primary,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: SPACING.sm,
//     shadowColor: COLORS.primary,
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.35,
//     shadowRadius: 10,
//     elevation: 8,
//   },
//   avatarText: {
//     fontSize: 34,
//      fontWeight:  FONT_WEIGHT.bold_800,
//       color: COLORS.card},
//   name: {
//     fontSize: FONT_SIZES.xxl,
//      fontWeight: FONT_WEIGHT.bold_800,
//       color: COLORS.text
//     },
//   username: {
//     fontSize: FONT_SIZES.md,
//     color: COLORS.textSecondary,
//     marginTop: 4,
//   },
//   statsRow: {
//     flexDirection: "row",
//     gap: SPACING.sm,
//      marginBottom: SPACING.md
//     },
//   statCard: {
//     flex: 1,
//     alignItems: "center",
//      padding: SPACING.md,
//       gap: 4
//     },
//   statValue: {
//     fontSize: FONT_SIZES.xxl,
//     fontWeight: FONT_WEIGHT.bold_800
//   },
//   statLabel: {
//     fontSize: FONT_SIZES.xs,
//      color: COLORS.textSecondary
//      },
//   breakdownCard: {
//     marginBottom: SPACING.md
//   },
//   cardTitle: {
//     fontSize: FONT_SIZES.md,
//     fontWeight: FONT_WEIGHT.bold_700,
//     color: COLORS.text,
//     marginBottom: SPACING.md,
//   },
//   barRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: SPACING.sm,
//     gap: SPACING.sm,
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5
//   },
//   barLabel: {
//     width: 52,
//     fontSize: FONT_SIZES.sm,
//     color: COLORS.textSecondary
//   },
//   barTrack: {
//     flex: 1,
//     height: 8,
//     backgroundColor: COLORS.border,
//     borderRadius: BORDER_RADIUS.full,
//     overflow: "hidden",
//   },
//   barFill: {
//     height: "100%",
//     borderRadius: BORDER_RADIUS.full
//   },
//   barCount: {
//     width: 20,
//     textAlign: "right",
//     fontSize: FONT_SIZES.sm,
//     fontWeight: FONT_WEIGHT.bold_700,
//     color: COLORS.text,
//   },
//   rateCard: {
//     marginBottom: SPACING.md,
//     alignItems: "center"
//   },
//   rateValue: {
//     fontSize: 48,
//     fontWeight: FONT_WEIGHT.bold_800,
//     color: COLORS.primary,
//     marginVertical: SPACING.sm,
//   },
//   rateTrack: {
//     width: "100%",
//     height: 10,
//     backgroundColor: COLORS.border,
//     borderRadius: BORDER_RADIUS.full,
//     overflow: "hidden",
//   },
//   rateFill: {
//     height: "100%",
//     backgroundColor: COLORS.primary,
//     borderRadius: BORDER_RADIUS.full,
//   },
//   logoutBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: SPACING.sm,
//     backgroundColor:COLORS.offwhite,
//     borderRadius: BORDER_RADIUS.lg,
//     padding: SPACING.md,
//     borderWidth: 1,
//     borderColor: COLORS.lightcream,
//   },
//   logoutText: {
//     color: COLORS.danger,
//     fontSize: FONT_SIZES.md,
//     fontWeight: FONT_WEIGHT.bold_700,
//   },
// });

// export default ProfileScreen;

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useAuth } from "../store/AuthStore";
import { useTaskStore } from "../store/TaskStore";
import { Card } from "../components/UIKit";
import { Icons } from "../Icons/Icons"; // ← replaces Ionicons import
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
  FONT_WEIGHT,
  CONSTANTS_DATA,
} from "../constants";
import { groupByPriority } from "../utils/helpers";

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const { state } = useTaskStore();
  const { tasks } = state;

  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = tasks.filter((t) => t.status === "pending").length;
  const total = tasks.length;
  const pct = total ? Math.round((completed / total) * 100) : 0;
  const byPriority = groupByPriority(tasks);

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("") ?? "U";

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure?", [
      { text: CONSTANTS_DATA.Cancel, style: "cancel" },
      { text: CONSTANTS_DATA.Sign_Out, style: "destructive", onPress: logout },
    ]);
  };

  const statCards = [
    {
      IconComp: Icons.Task,
      label: CONSTANTS_DATA.Total,
      value: total,
      color: COLORS.primary,
    },
    {
      IconComp: Icons.TaskDone,
      label: CONSTANTS_DATA.Done,
      value: completed,
      color: COLORS.success,
    },
    {
      IconComp: Icons.TaskPending,
      label: CONSTANTS_DATA.Pending,
      value: pending,
      color: COLORS.warning,
    },
  ];

  const priorityBars = [
    {
      label: CONSTANTS_DATA.High,
      color: COLORS.danger,
      count: byPriority["high"]?.length ?? 0,
    },
    {
      label: CONSTANTS_DATA.Medium,
      color: COLORS.warning,
      count: byPriority["medium"]?.length ?? 0,
    },
    {
      label: CONSTANTS_DATA.Low,
      color: COLORS.success,
      count: byPriority["low"]?.length ?? 0,
    },
  ];

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.scroll}>
      {/* ── Avatar Section ── */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.username}>{user?.username}</Text>
      </View>

      {/* ── Stat Cards ── */}
      <View style={styles.statsRow}>
        {statCards.map(({ IconComp, label, value, color }) => (
          <Card key={label} style={styles.statCard}>
            <IconComp size={24} color={color} />
            <Text style={[styles.statValue, { color }]}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
          </Card>
        ))}
      </View>

      <Card style={styles.breakdownCard}>
        <Text style={styles.cardTitle}>{CONSTANTS_DATA.TaskPriorty}</Text>
        {priorityBars.map(({ label, color, count }) => (
          <View key={label} style={styles.barRow}>
            <View style={[styles.dot, { backgroundColor: color }]} />
            <Text style={styles.barLabel}>{label}</Text>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barFill,
                  {
                    backgroundColor: color,
                    width: total ? (`${(count / total) * 100}%` as any) : "0%",
                  },
                ]}
              />
            </View>
            <Text style={styles.barCount}>{count}</Text>
          </View>
        ))}
      </Card>

      {/* ── Completion Rate ── */}
      {total > 0 && (
        <Card style={styles.rateCard}>
          <Text style={styles.cardTitle}>{CONSTANTS_DATA.COMP}</Text>

          {/* Stats icon from Icons.tsx */}
          <Icons.Stats size={28} color={COLORS.primary} />

          <Text style={styles.rateValue}>{pct}%</Text>
          <View style={styles.rateTrack}>
            <View style={[styles.rateFill, { width: `${pct}%` as any }]} />
          </View>
          <Text style={styles.rateCaption}>
            {completed} of {total} tasks completed
          </Text>
        </Card>
      )}

      {/* ── Logout Button ── */}
      <TouchableOpacity
        onPress={handleLogout}
        style={styles.logoutBtn}
        activeOpacity={0.8}
      >
        <Icons.LogOut size={20} color={COLORS.danger} />
        <Text style={styles.logoutText}>{CONSTANTS_DATA.Sign_Out}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  avatarSection: {
    alignItems: "center",
    paddingVertical: SPACING.xl,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.sm,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  avatarText: {
    fontSize: 34,
    fontWeight: FONT_WEIGHT.bold_800,
    color: COLORS.card,
  },
  name: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHT.bold_800,
    color: COLORS.text,
  },
  username: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  statsRow: {
    flexDirection: "row",
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    padding: SPACING.md,
    gap: 4,
  },
  statValue: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHT.bold_800,
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },

  // Priority breakdown
  breakdownCard: {
    marginBottom: SPACING.md,
  },
  cardTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHT.bold_700,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  barLabel: {
    width: 52,
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  barTrack: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.full,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: BORDER_RADIUS.full,
  },
  barCount: {
    width: 20,
    textAlign: "right",
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHT.bold_700,
    color: COLORS.text,
  },
  rateCard: {
    marginBottom: SPACING.md,
    alignItems: "center",
    gap: SPACING.xs,
  },
  rateValue: {
    fontSize: 48,
    fontWeight: FONT_WEIGHT.bold_800,
    color: COLORS.primary,
    marginVertical: SPACING.sm,
  },
  rateTrack: {
    width: "100%",
    height: 10,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.full,
    overflow: "hidden",
  },
  rateFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.full,
  },
  rateCaption: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },

  // Logout
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    backgroundColor: COLORS.offwhite,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.lightcream,
  },
  logoutText: {
    color: COLORS.danger,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHT.bold_700,
  },
});

export default ProfileScreen;
