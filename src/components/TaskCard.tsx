import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Task } from "../types";
import { Badge, Card } from "./UIKit";
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
  PRIORITY_CONFIG,
  FONT_WEIGHT,
  CONSTANTS_DATA,
} from "../constants";
import { timeAgo, truncate } from "../utils/helpers";

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onPress,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const p = PRIORITY_CONFIG[task.priority];
  const done = task.status === CONSTANTS_DATA.completed;

  const handleToggle = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.96,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();
    onToggle();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Card onPress={onPress} style={[styles.card, done && styles.doneCard]}>
        <View style={[styles.priorityBar, { backgroundColor: p.color }]} />

        <View style={styles.body}>
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={handleToggle}
              activeOpacity={0.8}
              style={[
                styles.checkbox,
                done && {
                  backgroundColor: COLORS.primary,
                  borderColor: COLORS.primary,
                },
              ]}
            >
              {done && (
                <Ionicons name="checkmark" size={14} color={COLORS.card} />
              )}
            </TouchableOpacity>

            <View style={styles.titleArea}>
              <Text
                style={[styles.title, done && styles.doneText]}
                numberOfLines={1}
              >
                {task.title}
              </Text>
              <Text style={styles.meta}>{timeAgo(task.createdAt)}</Text>
            </View>

            <Badge label={p.label} color={p.color} bgColor={p.bgColor} />
          </View>

          {/* Description */}
          {!!task.description && (
            <Text style={[styles.desc, done && styles.doneText]}>
              {truncate(task.description, 80)}
            </Text>
          )}

          {/* Footer */}
          <View style={styles.footer}>
            <View
              style={[
                styles.statusPill,
                { backgroundColor: done ? COLORS.cream : COLORS.yellow },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: done ? COLORS.success : COLORS.warning },
                ]}
              >
                {done ? CONSTANTS_DATA.Done : CONSTANTS_DATA.Pending}
              </Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                onPress={onEdit}
                style={styles.actionBtn}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="create-outline"
                  size={16}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onDelete}
                style={[styles.actionBtn, { backgroundColor: COLORS.card }]}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="trash-outline"
                  size={16}
                  color={COLORS.danger}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.xs,
    padding: 0,
    overflow: "hidden",
  },
  doneCard: { opacity: 0.72 },
  priorityBar: {
    width: 5,
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderBottomLeftRadius: BORDER_RADIUS.lg,
  },
  body: { flex: 1, padding: SPACING.md },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
  },
  titleArea: { flex: 1 },
  title: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHT.bold_700,
    color: COLORS.text,
  },
  doneText: {
    textDecorationLine: "line-through",
    color: COLORS.textLight,
  },
  meta: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
    marginTop: 2,
  },
  desc: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 19,
    marginBottom: SPACING.sm,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.xs,
  },
  statusPill: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.full,
  },
  statusText: { fontSize: FONT_SIZES.xs, fontWeight: FONT_WEIGHT.bold_600 },
  actions: { flexDirection: "row", gap: SPACING.xs },
  actionBtn: {
    padding: 6,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.primaryLight,
  },
});

export default React.memo(TaskCard);
