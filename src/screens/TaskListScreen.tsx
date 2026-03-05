import React, { useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useTaskStore } from "../store/TaskStore";
import { useAuth } from "../store/AuthStore";
import TaskCard from "../components/TaskCard";
import { AppInput, EmptyState } from "../components/UIKit";
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
  CONSTANTS_DATA,
  FONT_WEIGHT,
} from "../constants";
import { Task, TaskStackParamList, TaskStatus } from "../types";

type NavProp = StackNavigationProp<TaskStackParamList>;

const TABS: { label: string; value: TaskStatus | "all" }[] = [
  { label: CONSTANTS_DATA.All, value: CONSTANTS_DATA.all },
  { label: CONSTANTS_DATA.Pending, value: CONSTANTS_DATA.pending },
  { label: CONSTANTS_DATA.Done, value: CONSTANTS_DATA.completed },
];

const TaskListScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const {
    state,
    deleteTask,
    toggleTask,
    setFilter,
    setSearch,
    getFilteredTasks,
  } = useTaskStore();
  const { user } = useAuth();
  const tasks = getFilteredTasks();
  const completed = state.tasks.filter(
    (t) => t.status === CONSTANTS_DATA.completed,
  ).length;
  const total = state.tasks.length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  const handleDelete = useCallback(
    (task: Task) => {
      Alert.alert("Delete Task", `Delete "${task.title}"?`, [
        { text: CONSTANTS_DATA.Cancel, style: "cancel" },
        {
          text: CONSTANTS_DATA.Delete,
          style: "destructive",
          onPress: () => deleteTask(task.id),
        },
      ]);
    },
    [deleteTask],
  );

  const renderTask = useCallback(
    ({ item }: { item: Task }) => (
      <TaskCard
        task={item}
        onPress={() =>
          navigation.navigate(CONSTANTS_DATA.TaskDetail, { taskId: item.id })
        }
        onToggle={() => toggleTask(item.id)}
        onDelete={() => handleDelete(item)}
        onEdit={() =>
          navigation.navigate(CONSTANTS_DATA.AddEditTask, { taskId: item.id })
        }
      />
    ),
    [navigation, toggleTask, handleDelete],
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            {CONSTANTS_DATA.Heyy} {user?.name?.split(" ")[0]}
          </Text>
          <Text style={styles.stats}>
            {completed}/{total} {CONSTANTS_DATA.completed}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(CONSTANTS_DATA.AddEditTask, {})}
          style={styles.addBtn}
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={18} color={COLORS.card} />
          <Text style={styles.addBtnText}>{CONSTANTS_DATA.Add}</Text>
        </TouchableOpacity>
      </View>

      {/* Progress */}
      {total > 0 && (
        <View style={styles.progressRow}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${pct}%` as any }]} />
          </View>
          <Text style={styles.progressLabel}>{pct}%</Text>
        </View>
      )}

      {/* Search */}
      <AppInput
        placeholder={CONSTANTS_DATA.SearchText}
        value={state.searchQuery}
        onChangeText={setSearch}
        containerStyle={styles.searchWrap}
        iconName="search-outline"
      />

      {/* Filter Tabs */}
      <View style={styles.tabRow}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.value}
            onPress={() => setFilter(tab.value)}
            style={[styles.tab, state.filter === tab.value && styles.tabActive]}
            activeOpacity={0.75}
          >
            <Text
              style={[
                styles.tabText,
                state.filter === tab.value && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Rendering data*/}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={
          tasks.length === 0 ? styles.listEmpty : styles.listContent
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            title={
              state.searchQuery
                ? CONSTANTS_DATA.No_results_found
                : CONSTANTS_DATA.No_tasks_yet
            }
            subtitle={
              state.searchQuery
                ? CONSTANTS_DATA.Try_a_different_keyword
                : CONSTANTS_DATA.Tap
            }
            iconName={
              state.searchQuery ? "search-outline" : "clipboard-outline"
            }
            action={
              !state.searchQuery
                ? {
                    label: CONSTANTS_DATA.Create_Task,
                    onPress: () =>
                      navigation.navigate(CONSTANTS_DATA.AddEditTask, {}),
                  }
                : undefined
            }
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  greeting: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHT.bold_800,
    color: COLORS.text,
  },
  stats: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
  },
  addBtnText: {
    color: COLORS.card,
    fontWeight: FONT_WEIGHT.bold_700,
    fontSize: FONT_SIZES.sm,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.full,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.full,
  },
  progressLabel: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHT.bold_700,
    color: COLORS.primary,
    width: 35,
    textAlign: "right",
  },
  searchWrap: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.xs,
  },
  tabRow: {
    flexDirection: "row",
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    gap: SPACING.xs,
  },
  tab: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHT.bold_500,
  },
  tabTextActive: {
    color: COLORS.card,
    fontWeight: FONT_WEIGHT.bold_700,
  },
  listContent: {
    paddingBottom: SPACING.xxl,
  },
  listEmpty: { flex: 1 },
});

export default TaskListScreen;
