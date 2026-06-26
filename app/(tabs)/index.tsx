import { Colors, Radius, Shadow, Spacing, Typography } from '@/constants';
import { useLanguage } from '@/i18n/LanguageContext';
import { scanImage, ScanResult } from '@/services/groq';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ScannerScreen() {
  const scheme = useColorScheme();
  const colors = scheme === 'dark' ? Colors.dark : Colors.light;
  const { lang, setLang, t } = useLanguage();

  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleScan = async () => {
    if (!cameraRef.current) return;
    try {
      setLoading(true);
      setResult(null);

      const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
      if (!photo) throw new Error('Failed to capture photo');

      const manipulated = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 1024 } }],
        { compress: 0.7, base64: true, format: ImageManipulator.SaveFormat.JPEG }
      );

      if (!manipulated.base64) throw new Error('Failed to process image');

      const scanResult = await scanImage(manipulated.base64, lang);
      setResult(scanResult);
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!permission) {
    return (
      <SafeAreaView style={[styles.container, styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={[styles.container, styles.center, { backgroundColor: colors.background }]}>
        <Ionicons name="camera-outline" size={64} color={colors.textMuted} />
        <Text style={[styles.permTitle, { color: colors.text }]}>{t('cameraNeeded')}</Text>
        <Text style={[styles.permText, { color: colors.textSecondary }]}>
          {t('cameraNeededText')}
        </Text>
        <TouchableOpacity
          style={[styles.permButton, { backgroundColor: colors.primary }, Shadow.md]}
          onPress={requestPermission}
          activeOpacity={0.85}
        >
          <Text style={styles.permButtonText}>{t('allowCamera')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>{t('scannerTitle')}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {t('scannerSubtitle')}
          </Text>
        </View>
        <View style={[styles.langToggle, { backgroundColor: colors.surface }]}>
          <TouchableOpacity
            style={[styles.langOption, lang === 'ru' && { backgroundColor: colors.primary }]}
            onPress={() => setLang('ru')}
          >
            <Text style={[styles.langText, { color: lang === 'ru' ? '#fff' : colors.textSecondary }]}>RU</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.langOption, lang === 'en' && { backgroundColor: colors.primary }]}
            onPress={() => setLang('en')}
          >
            <Text style={[styles.langText, { color: lang === 'en' ? '#fff' : colors.textSecondary }]}>EN</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cameraContainer}>
        <CameraView ref={cameraRef} style={styles.camera} facing="back">
          <View style={styles.overlay}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
        </CameraView>
      </View>

      {result && (
        <ScrollView style={styles.resultCard} contentContainerStyle={{ padding: Spacing.lg }}>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <Text style={[styles.original, { color: colors.text }]}>{result.original}</Text>
            <Text style={[styles.pinyin, { color: colors.textMuted }]}>{result.pinyin}</Text>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <Text style={[styles.translation, { color: colors.text }]}>{result.translation}</Text>
            <View style={[styles.contextBox, { backgroundColor: colors.background }]}>
              <Ionicons name="bulb-outline" size={16} color={colors.accent} />
              <Text style={[styles.context, { color: colors.textSecondary }]}>{result.context}</Text>
            </View>
          </View>
        </ScrollView>
      )}

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.scanButton, { backgroundColor: colors.primary }, Shadow.lg]}
          activeOpacity={0.85}
          onPress={handleScan}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="camera" size={28} color="#fff" />
              <Text style={styles.scanButtonText}>{t('scanButton')}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center', gap: Spacing.md, padding: Spacing.xl },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screen,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  title: { fontSize: Typography.sizes.xxxl, fontWeight: Typography.weights.bold, letterSpacing: -0.5 },
  subtitle: { fontSize: Typography.sizes.md, marginTop: Spacing.xs },
  langToggle: { flexDirection: 'row', borderRadius: Radius.full, padding: 3 },
  langOption: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: Radius.full },
  langText: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold },
  cameraContainer: { flex: 1, marginHorizontal: Spacing.screen, borderRadius: Radius.xl, overflow: 'hidden' },
  camera: { flex: 1 },
  overlay: { flex: 1, margin: 40 },
  corner: { position: 'absolute', width: 32, height: 32, borderColor: '#fff', borderWidth: 3 },
  topLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 8 },
  topRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 8 },
  bottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 8 },
  bottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 8 },
  resultCard: { maxHeight: 280 },
  card: { borderRadius: Radius.lg, padding: Spacing.lg, gap: Spacing.sm },
  original: { fontSize: Typography.sizes.xxl, fontWeight: Typography.weights.semibold },
  pinyin: { fontSize: Typography.sizes.md, fontStyle: 'italic' },
  divider: { height: 1, marginVertical: Spacing.sm },
  translation: { fontSize: Typography.sizes.lg, fontWeight: Typography.weights.medium },
  contextBox: { flexDirection: 'row', gap: Spacing.sm, padding: Spacing.md, borderRadius: Radius.md, marginTop: Spacing.sm },
  context: { flex: 1, fontSize: Typography.sizes.sm, lineHeight: 20 },
  actions: { paddingHorizontal: Spacing.screen, paddingVertical: Spacing.lg },
  scanButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, paddingVertical: Spacing.lg, borderRadius: Radius.full, minHeight: 60 },
  scanButtonText: { color: '#fff', fontSize: Typography.sizes.lg, fontWeight: Typography.weights.semibold },
  permTitle: { fontSize: Typography.sizes.xl, fontWeight: Typography.weights.bold },
  permText: { fontSize: Typography.sizes.md, textAlign: 'center' },
  permButton: { paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, borderRadius: Radius.full, marginTop: Spacing.md },
  permButtonText: { color: '#fff', fontSize: Typography.sizes.md, fontWeight: Typography.weights.semibold },
});