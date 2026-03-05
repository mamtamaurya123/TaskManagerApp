import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTaskStore } from "../store/TaskStore";
import { AppButton, AppInput } from "../components/UIKit";
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
  PRIORITY_CONFIG,
  CONSTANTS_DATA,
  FONT_WEIGHT,
} from "../constants";
import { validateTaskForm } from "../utils/helpers";
import { TaskPriority, TaskStackParamList } from "../types";

type RoutePropType = RouteProp<TaskStackParamList, "AddEditTask">;
type NavProp = StackNavigationProp<TaskStackParamList>;

const PRIORITIES: TaskPriority[] = ["low", "medium", "high"];

const AddEditTaskScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RoutePropType>();
  const { taskId } = route.params ?? {};
  const { state, addTask, updateTask } = useTaskStore();

  const existingTask = state.tasks.find((t) => t.id === taskId);
  const isEdit = !!existingTask;

  const [title, setTitle] = useState(existingTask?.title ?? "");
  const [desc, setDesc] = useState(existingTask?.description ?? "");
  const [priority, setPriority] = useState<TaskPriority>(
    existingTask?.priority ?? "medium",
  );
  const [dueDate, setDueDate] = useState(existingTask?.dueDate ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdit ? CONSTANTS_DATA.Edit_Task : CONSTANTS_DATA.New_Task,
    });
  }, [navigation, isEdit]);

  const handleSave = async () => {
    const { valid, errors: e } = validateTaskForm(title, desc);
    if (!valid) {
      setErrors(e);
      return;
    }
    setIsSaving(true);
    try {
      if (isEdit && existingTask) {
        await updateTask({
          ...existingTask,
          title: title.trim(),
          description: desc.trim(),
          priority,
          dueDate,
        });
      } else {
        await addTask({
          title: title.trim(),
          description: desc.trim(),
          priority,
          dueDate,
        });
      }
      navigation.goBack();
    } catch {
      Alert.alert("Error", "Failed to save task.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 80}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title & Description */}
        <View style={styles.section}>
          <AppInput
            label={CONSTANTS_DATA.Taskk}
            placeholder={CONSTANTS_DATA.What}
            value={title}
            onChangeText={(t) => {
              setTitle(t);
              setErrors((e) => ({ ...e, title: "" }));
            }}
            error={errors.title}
            autoFocus={!isEdit}
            returnKeyType="next"
            iconName="create-outline"
          />
          <AppInput
            label={CONSTANTS_DATA.Description}
            placeholder={CONSTANTS_DATA.ADD_Details}
            value={desc}
            onChangeText={(t) => {
              setDesc(t);
              setErrors((e) => ({ ...e, description: "" }));
            }}
            error={errors.description}
            multiline
            numberOfLines={4}
            style={styles.multiline}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{CONSTANTS_DATA.Priority}</Text>
          <View style={styles.priorityRow}>
            {PRIORITIES.map((p) => {
              const conf = PRIORITY_CONFIG[p];
              const sel = priority === p;
              return (
                <TouchableOpacity
                  key={p}
                  onPress={() => setPriority(p)}
                  activeOpacity={0.8}
                  style={[
                    styles.chip,
                    { borderColor: conf.color },
                    sel && { backgroundColor: conf.color },
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      { color: sel ? COLORS.card : conf.color },
                    ]}
                  >
                    {conf.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <AppInput
            label={CONSTANTS_DATA.Due}
            placeholder={CONSTANTS_DATA.EG}
            value={dueDate}
            onChangeText={setDueDate}
            iconName="calendar-outline"
          />
        </View>

        {/* Actions Button */}
        <View style={styles.actionRow}>
          <AppButton
            title={CONSTANTS_DATA.Cancel}
            onPress={() => navigation.goBack()}
            variant="ghost"
            size="lg"
            style={styles.actionBtn}
          />
          <AppButton
            title={
              isEdit ? CONSTANTS_DATA.UPDATE_TASK : CONSTANTS_DATA.CreateTask
            }
            onPress={handleSave}
            size="lg"
            isLoading={isSaving}
            style={styles.actionBtn}
            iconName={
              isEdit ? "checkmark-circle-outline" : "add-circle-outline"
            }
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    padding: SPACING.md,
  },
  section: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHT.bold_700,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  multiline: {
    height: 100,
    paddingTop: SPACING.sm,
  },
  priorityRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  chip: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    alignItems: "center",
  },
  chipText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHT.bold_700,
  },
  actionRow: {
    flexDirection: "row",
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  actionBtn: {
    flex: 1,
  },
});

export default AddEditTaskScreen;
