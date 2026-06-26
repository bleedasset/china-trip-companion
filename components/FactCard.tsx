import { Colors, Radius, Spacing, Typography } from '@/constants';
import { FactCategory, getRandomFact } from '@/data/funFacts';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';

export function FactCard({ category }: { category: FactCategory }) {
  const scheme = useColorScheme();
  const colors = scheme === 'dark' ? Colors.dark : Colors.light;
  const [fact, setFact] = useState(() => getRandomFact(category));

  useFocusEffect(
    useCallback(() => {
      setFact(getRandomFact(category));
    }, [category])
  );

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={[styles.iconCircle, { backgroundColor: colors.accent }]}>
        <Ionicons name="sparkles" size={16} color="#fff" />
      </View>
      <View style={styles.content}>
        <Text style={[styles.label, { color: colors.accent }]}>Did you know?</Text>
        <Text style={[styles.text, { color: colors.textSecondary }]}>{fact}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    marginTop: Spacing.lg,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1, gap: 2 },
  label: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold, textTransform: 'uppercase', letterSpacing: 0.5 },
  text: { fontSize: Typography.sizes.sm, lineHeight: 20 },
});