import { Colors, Radius, Shadow, Spacing, Typography } from '@/constants';
import { TransportMode, transportModes, transportPhrases } from '@/data/transportGuide';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
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

export default function TransportScreen() {
  const scheme = useColorScheme();
  const colors = scheme === 'dark' ? Colors.dark : Colors.light;
  const [expanded, setExpanded] = useState<string | null>('metro');
  const [copied, setCopied] = useState<string | null>(null);

  const toggle = (id: string) => setExpanded(expanded === id ? null : id);

  const copyPhrase = async (zh: string) => {
    await Clipboard.setStringAsync(zh);
    setCopied(zh);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Transport</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Get around China with ease
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Ways to travel</Text>

        {transportModes.map((mode) => (
          <ModeCard
            key={mode.id}
            mode={mode}
            expanded={expanded === mode.id}
            onToggle={() => toggle(mode.id)}
            colors={colors}
          />
        ))}

        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: Spacing.xl }]}>
          Useful phrases
        </Text>
        <Text style={[styles.sectionHint, { color: colors.textMuted }]}>
          Tap a phrase to copy, then show it to the driver
        </Text>

        {transportPhrases.map((phrase) => (
          <TouchableOpacity
            key={phrase.zh}
            style={[styles.phraseCard, { backgroundColor: colors.surface }, Shadow.sm]}
            onPress={() => copyPhrase(phrase.zh)}
            activeOpacity={0.7}
          >
            <View style={styles.phraseInfo}>
              <Text style={[styles.phraseZh, { color: colors.text }]}>{phrase.zh}</Text>
              <Text style={[styles.phrasePinyin, { color: colors.textMuted }]}>{phrase.pinyin}</Text>
              <Text style={[styles.phraseEn, { color: colors.textSecondary }]}>{phrase.en}</Text>
            </View>
            <Ionicons
              name={copied === phrase.zh ? 'checkmark-circle' : 'copy-outline'}
              size={22}
              color={copied === phrase.zh ? colors.success : colors.primary}
            />
          </TouchableOpacity>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function ModeCard({
  mode,
  expanded,
  onToggle,
  colors,
}: {
  mode: TransportMode;
  expanded: boolean;
  onToggle: () => void;
  colors: typeof Colors.light;
}) {
  return (
    <View style={[styles.modeCard, { backgroundColor: colors.surface }, Shadow.sm]}>
      <TouchableOpacity style={styles.modeHeader} onPress={onToggle} activeOpacity={0.7}>
        <View style={[styles.modeIcon, { backgroundColor: mode.color }]}>
          <Ionicons name={mode.icon} size={24} color="#fff" />
        </View>
        <View style={styles.modeInfo}>
          <Text style={[styles.modeName, { color: colors.text }]}>{mode.name}</Text>
          <Text style={[styles.modeNameZh, { color: colors.textMuted }]}>{mode.nameZh}</Text>
        </View>
        <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={20} color={colors.textMuted} />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.modeBody}>
          <Text style={[styles.modeDesc, { color: colors.textSecondary }]}>{mode.description}</Text>
          <View style={styles.stepsContainer}>
            {mode.howTo.map((step, i) => (
              <View key={i} style={styles.stepRow}>
                <View style={[styles.stepDot, { backgroundColor: mode.color }]} />
                <Text style={[styles.stepText, { color: colors.text }]}>{step}</Text>
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
  sectionTitle: { fontSize: Typography.sizes.xl, fontWeight: Typography.weights.bold, marginBottom: Spacing.md },
  sectionHint: { fontSize: Typography.sizes.sm, marginTop: -Spacing.sm, marginBottom: Spacing.md },
  modeCard: { borderRadius: Radius.lg, marginBottom: Spacing.md, overflow: 'hidden' },
  modeHeader: { flexDirection: 'row', alignItems: 'center', padding: Spacing.lg, gap: Spacing.md },
  modeIcon: { width: 48, height: 48, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
  modeInfo: { flex: 1 },
  modeName: { fontSize: Typography.sizes.lg, fontWeight: Typography.weights.semibold },
  modeNameZh: { fontSize: Typography.sizes.sm, marginTop: 2 },
  modeBody: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.lg, gap: Spacing.md },
  modeDesc: { fontSize: Typography.sizes.md, lineHeight: 22 },
  stepsContainer: { gap: Spacing.sm },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md },
  stepDot: { width: 8, height: 8, borderRadius: 4, marginTop: 7, marginLeft: 4 },
  stepText: { flex: 1, fontSize: Typography.sizes.md, lineHeight: 22 },
  phraseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  phraseInfo: { flex: 1, gap: 2 },
  phraseZh: { fontSize: Typography.sizes.lg, fontWeight: Typography.weights.semibold },
  phrasePinyin: { fontSize: Typography.sizes.sm, fontStyle: 'italic' },
  phraseEn: { fontSize: Typography.sizes.sm },
});