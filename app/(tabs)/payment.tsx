import { Colors, Radius, Shadow, Spacing, Typography } from '@/constants';
import { PaymentMethod, paymentMethods, quickFacts } from '@/data/paymentGuide';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PaymentScreen() {
  const scheme = useColorScheme();
  const colors = scheme === 'dark' ? Colors.dark : Colors.light;
  const [expanded, setExpanded] = useState<string | null>('wechat');

  const toggle = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Payment</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Set up mobile payments in China
          </Text>
        </View>

        <View style={styles.factsRow}>
          {quickFacts.map((fact) => (
            <View key={fact.title} style={[styles.factCard, { backgroundColor: colors.surface }]}>
              <Ionicons name={fact.icon} size={22} color={colors.primary} />
              <Text style={[styles.factTitle, { color: colors.text }]}>{fact.title}</Text>
              <Text style={[styles.factText, { color: colors.textSecondary }]}>{fact.text}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>How to set up</Text>

        {paymentMethods.map((method) => (
          <MethodCard
            key={method.id}
            method={method}
            expanded={expanded === method.id}
            onToggle={() => toggle(method.id)}
            colors={colors}
          />
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function MethodCard({
  method,
  expanded,
  onToggle,
  colors,
}: {
  method: PaymentMethod;
  expanded: boolean;
  onToggle: () => void;
  colors: typeof Colors.light;
}) {
  return (
    <View style={[styles.methodCard, { backgroundColor: colors.surface }, Shadow.sm]}>
      <TouchableOpacity style={styles.methodHeader} onPress={onToggle} activeOpacity={0.7}>
        <View style={[styles.methodIcon, { backgroundColor: method.color }]}>
          <Ionicons name={method.icon} size={24} color="#fff" />
        </View>
        <View style={styles.methodInfo}>
          <Text style={[styles.methodName, { color: colors.text }]}>{method.name}</Text>
          <Text style={[styles.methodNameZh, { color: colors.textMuted }]}>{method.nameZh}</Text>
        </View>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.textMuted}
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.methodBody}>
          <Text style={[styles.methodDesc, { color: colors.textSecondary }]}>
            {method.description}
          </Text>

          <View style={styles.stepsContainer}>
            {method.steps.map((step, i) => (
              <View key={i} style={styles.stepRow}>
                <View style={[styles.stepNumber, { backgroundColor: method.color }]}>
                  <Text style={styles.stepNumberText}>{i + 1}</Text>
                </View>
                <Text style={[styles.stepText, { color: colors.text }]}>{step}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.tipsBox, { backgroundColor: colors.background }]}>
            {method.tips.map((tip, i) => (
              <View key={i} style={styles.tipRow}>
                <Ionicons name="bulb-outline" size={16} color={colors.accent} />
                <Text style={[styles.tipText, { color: colors.textSecondary }]}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: Spacing.screen },
  header: { paddingTop: Spacing.lg, paddingBottom: Spacing.lg },
  title: { fontSize: Typography.sizes.xxxl, fontWeight: Typography.weights.bold, letterSpacing: -0.5 },
  subtitle: { fontSize: Typography.sizes.md, marginTop: Spacing.xs },
  factsRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.xl },
  factCard: { flex: 1, padding: Spacing.md, borderRadius: Radius.lg, gap: Spacing.xs },
  factTitle: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold },
  factText: { fontSize: Typography.sizes.xs, lineHeight: 16 },
  sectionTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    marginBottom: Spacing.md,
  },
  methodCard: { borderRadius: Radius.lg, marginBottom: Spacing.md, overflow: 'hidden' },
  methodHeader: { flexDirection: 'row', alignItems: 'center', padding: Spacing.lg, gap: Spacing.md },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodInfo: { flex: 1 },
  methodName: { fontSize: Typography.sizes.lg, fontWeight: Typography.weights.semibold },
  methodNameZh: { fontSize: Typography.sizes.sm, marginTop: 2 },
  methodBody: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.lg, gap: Spacing.lg },
  methodDesc: { fontSize: Typography.sizes.md, lineHeight: 22 },
  stepsContainer: { gap: Spacing.md },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepNumberText: { color: '#fff', fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold },
  stepText: { flex: 1, fontSize: Typography.sizes.md, lineHeight: 22 },
  tipsBox: { padding: Spacing.md, borderRadius: Radius.md, gap: Spacing.sm },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  tipText: { flex: 1, fontSize: Typography.sizes.sm, lineHeight: 19 },
});