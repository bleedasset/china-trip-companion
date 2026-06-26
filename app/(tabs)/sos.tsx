import { FactCard } from '@/components/FactCard';
import { Colors, Radius, Shadow, Spacing, Typography } from '@/constants';
import { emergencyNumbers, medicalPhrases, sosTips } from '@/data/sosGuide';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SosScreen() {
  const scheme = useColorScheme();
  const colors = scheme === 'dark' ? Colors.dark : Colors.light;
  const [copied, setCopied] = useState<string | null>(null);

  const call = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  const copyPhrase = async (zh: string) => {
    await Clipboard.setStringAsync(zh);
    setCopied(zh);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>SOS</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Emergency help in China
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Emergency numbers</Text>
        <View style={styles.numbersGrid}>
          {emergencyNumbers.map((item) => (
            <TouchableOpacity
              key={item.number}
              style={[styles.numberCard, { backgroundColor: colors.surface }, Shadow.sm]}
              onPress={() => call(item.number)}
              activeOpacity={0.7}
            >
              <View style={[styles.numberIcon, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon} size={22} color="#fff" />
              </View>
              <Text style={[styles.numberValue, { color: colors.text }]}>{item.number}</Text>
              <Text style={[styles.numberService, { color: colors.textSecondary }]}>
                {item.service}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: Spacing.xl }]}>
          Medical phrases
        </Text>
        <Text style={[styles.sectionHint, { color: colors.textMuted }]}>
          Tap to copy, then show to medical staff
        </Text>

        {medicalPhrases.map((phrase) => (
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

        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: Spacing.xl }]}>
          Good to know
        </Text>
        <View style={[styles.tipsBox, { backgroundColor: colors.surface }]}>
          {sosTips.map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <Ionicons name="information-circle-outline" size={18} color={colors.info} />
              <Text style={[styles.tipText, { color: colors.textSecondary }]}>{tip}</Text>
            </View>
          ))}
        </View>

        <FactCard category="sos" />

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
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
  numbersGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  numberCard: { width: '47%', flexGrow: 1, padding: Spacing.lg, borderRadius: Radius.lg, alignItems: 'center', gap: Spacing.sm },
  numberIcon: { width: 44, height: 44, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
  numberValue: { fontSize: Typography.sizes.xxl, fontWeight: Typography.weights.bold },
  numberService: { fontSize: Typography.sizes.sm },
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
  tipsBox: { padding: Spacing.lg, borderRadius: Radius.lg, gap: Spacing.md },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  tipText: { flex: 1, fontSize: Typography.sizes.sm, lineHeight: 20 },
});