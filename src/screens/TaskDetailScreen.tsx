import React from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useTaskStore } from "../store/TaskStore";
import { Badge, AppButton, Divider, Card } from "../components/UIKit";
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
  PRIORITY_CONFIG,
  FONT_WEIGHT,
} from "../constants";
import { formatDate, timeAgo } from "../utils/helpers";
import { TaskStackParamList } from "../types";

type RoutePropType = RouteProp<TaskStackParamList, "TaskDetail">;
type NavProp = StackNavigationProp<TaskStackParamList>;

const TaskDetailScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const {
    params: { taskId },
  } = useRoute<RoutePropType>();
  const { state, deleteTask, toggleTask } = useTaskStore();
  const task = state.tasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <View style={styles.notFound}>
        <Ionicons
          name="alert-circle-outline"
          size={48}
          color={COLORS.textLight}
        />
        <Text style={styles.notFoundText}>Task not found</Text>
        <AppButton
          title="Go Back"
          onPress={() => navigation.goBack()}
          size="sm"
        />
      </View>
    );
  }

  const p = PRIORITY_CONFIG[task.priority];
  const done = task.status === "completed";

  const handleDelete = () => {
    Alert.alert("Delete Task", "This cannot be undone. Continue?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteTask(task.id);
          navigation.goBack();
        },
      },
    ]);
  };

  const metaRows = [
    {
      icon: "calendar-outline" as const,
      label: "Created",
      value: formatDate(task.createdAt),
    },
    {
      icon: "time-outline" as const,
      label: "Updated",
      value: timeAgo(task.updatedAt ?? task.createdAt),
    },
    { icon: "flag-outline" as const, label: "Priority", value: p.label },
    ...(task.dueDate
      ? [{ icon: "alarm-outline" as const, label: "Due", value: task.dueDate }]
      : []),
  ];

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.scroll}>
      {/* Status Banner */}
      <View
        style={[
          styles.statusBanner,
          { backgroundColor: done ? "#DCFCE7" : COLORS.primaryLight },
        ]}
      >
        <Ionicons
          name={done ? "checkmark-circle" : "time"}
          size={18}
          color={done ? COLORS.success : COLORS.primary}
        />
        <Text
          style={[
            styles.statusText,
            { color: done ? COLORS.success : COLORS.primary },
          ]}
        >
          {done ? "Completed" : "In Progress"}
        </Text>
      </View>

      {/* Main Card */}
      <Card style={styles.mainCard}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, done && styles.strikethrough]}>
            {task.title}
          </Text>
          <Badge label={p.label} color={p.color} bgColor={p.bgColor} />
        </View>
        {!!task.description && (
          <>
            <Divider style={{ marginVertical: SPACING.md }} />
            <Text style={styles.sectionLabel}>DESCRIPTION</Text>
            <Text style={styles.desc}>{task.description}</Text>
          </>
        )}
      </Card>

      {/* Meta Card */}
      <Card style={styles.metaCard}>
        <Text style={styles.sectionLabel}>DETAILS</Text>
        {metaRows.map(({ icon, label, value }) => (
          <View key={label} style={styles.metaRow}>
            <Ionicons name={icon} size={16} color={COLORS.textSecondary} />
            <Text style={styles.metaLabel}>{label}</Text>
            <Text style={styles.metaValue}>{value}</Text>
          </View>
        ))}
      </Card>

      {/* Actions */}
      <View style={styles.actions}>
        <AppButton
          title={done ? "Mark as Pending" : "Mark as Done"}
          onPress={() => toggleTask(task.id)}
          variant={done ? "secondary" : "primary"}
          size="lg"
          iconName={done ? "refresh-outline" : "checkmark-circle-outline"}
        />
        <View style={styles.secondaryRow}>
          <AppButton
            title="Edit"
            onPress={() =>
              navigation.navigate("AddEditTask", { taskId: task.id })
            }
            variant="ghost"
            size="md"
            style={{ flex: 1 }}
            iconName="create-outline"
          />
          <AppButton
            title="Delete"
            onPress={handleDelete}
            variant="danger"
            size="md"
            style={{ flex: 1 }}
            iconName="trash-outline"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: SPACING.md, paddingBottom: SPACING.xxl },
  statusBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.sm,
    justifyContent: "center",
    marginBottom: SPACING.md,
  },
  statusText: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHT.bold_700 },
  mainCard: { marginBottom: SPACING.md },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: SPACING.sm,
  },
  title: {
    flex: 1,
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHT.bold_800,
    color: COLORS.text,
    lineHeight: 28,
  },
  strikethrough: {
    textDecorationLine: "line-through",
    color: COLORS.textLight,
  },
  sectionLabel: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHT.bold_700,
    color: COLORS.textSecondary,
    letterSpacing: 0.8,
    marginBottom: SPACING.sm,
  },
  desc: { fontSize: FONT_SIZES.md, color: COLORS.text, lineHeight: 24 },
  metaCard: { marginBottom: SPACING.md },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  metaLabel: { flex: 1, fontSize: FONT_SIZES.sm, color: COLORS.textSecondary },
  metaValue: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHT.bold_600,
    color: COLORS.text,
  },
  actions: { gap: SPACING.sm },
  secondaryRow: { flexDirection: "row", gap: SPACING.sm },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.md,
  },
  notFoundText: { fontSize: FONT_SIZES.lg, color: COLORS.textSecondary },
});

export default TaskDetailScreen;
