import { Colors, Radius, Shadow, Spacing, Typography } from '@/constants';
import { CityInfo, TransportApp, transportApps } from '@/data/cities';
import { Ionicons } from '@expo/vector-icons';
import { Linking, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

export function CityGuide({ city }: { city: CityInfo }) {
  const scheme = useColorScheme();
  const colors = scheme === 'dark' ? Colors.dark : Colors.light;

  const openApp = async (app: TransportApp) => {
    try {
      const canOpen = await Linking.canOpenURL(app.scheme);
      if (canOpen) {
        await Linking.openURL(app.scheme);
      } else {
        await Linking.openURL(app.storeUrl);
      }
    } catch {
      await Linking.openURL(app.storeUrl);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.tagline, { color: colors.textSecondary }]}>{city.tagline}</Text>

      {/* Quick actions */}
      <Text style={[styles.blockTitle, { color: colors.text }]}>Quick actions</Text>
      <View style={styles.actionsRow}>
        {transportApps.map((app) => (
          <TouchableOpacity
            key={app.id}
            style={[styles.actionCard, { backgroundColor: colors.surface }, Shadow.sm]}
            onPress={() => openApp(app)}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIcon, { backgroundColor: app.color }]}>
              <Ionicons
                name={app.id === 'didi' ? 'car' : 'train'}
                size={18}
                color="#fff"
              />
            </View>
            <Text style={[styles.actionName, { color: colors.text }]}>{app.name}</Text>
            <Text style={[styles.actionPurpose, { color: colors.textMuted }]} numberOfLines={2}>
              {app.purpose}
            </Text>
            <View style={styles.actionOpen}>
              <Ionicons name="open-outline" size={12} color={app.color} />
              <Text style={[styles.actionOpenText, { color: app.color }]}>Open</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Airports */}
      <Text style={[styles.blockTitle, { color: colors.text }]}>From the airport</Text>
      {city.airports.map((route) => (
        <View key={route.airport} style={[styles.card, { backgroundColor: colors.surface }, Shadow.sm]}>
          <View style={styles.cardHeader}>
            <Ionicons name="airplane" size={18} color={colors.primary} />
            <Text style={[styles.airportName, { color: colors.text }]}>{route.airport}</Text>
          </View>
          <View style={styles.routeRow}>
            <View style={[styles.badge, { backgroundColor: colors.primary }]}>
              <Text style={styles.badgeText}>{route.bestOption}</Text>
            </View>
          </View>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={14} color={colors.textMuted} />
              <Text style={[styles.metaText, { color: colors.textSecondary }]}>{route.time}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="cash-outline" size={14} color={colors.textMuted} />
              <Text style={[styles.metaText, { color: colors.textSecondary }]}>{route.price}</Text>
            </View>
          </View>
          <Text style={[styles.details, { color: colors.textSecondary }]}>{route.details}</Text>
        </View>
      ))}

      {/* Metro */}
      <Text style={[styles.blockTitle, { color: colors.text }]}>Metro</Text>
      <View style={[styles.card, { backgroundColor: colors.surface }, Shadow.sm]}>
        <InfoRow icon="git-network-outline" label={city.metro.lines} colors={colors} />
        <InfoRow icon="cash-outline" label={`Fare: ${city.metro.fare}`} colors={colors} />
        <InfoRow icon="time-outline" label={city.metro.hours} colors={colors} />
        <View style={[styles.tipBox, { backgroundColor: colors.background }]}>
          <Ionicons name="bulb-outline" size={16} color={colors.accent} />
          <Text style={[styles.tipText, { color: colors.textSecondary }]}>{city.metro.tip}</Text>
        </View>
      </View>

      {/* Taxi */}
      <Text style={[styles.blockTitle, { color: colors.text }]}>Taxi & ride-hailing</Text>
      <View style={[styles.card, { backgroundColor: colors.surface }, Shadow.sm]}>
        <Text style={[styles.details, { color: colors.textSecondary }]}>{city.taxiInfo}</Text>
      </View>

      {/* Districts */}
      <Text style={[styles.blockTitle, { color: colors.text }]}>Key districts</Text>
      {city.districts.map((d) => (
        <View key={d.name} style={[styles.districtCard, { backgroundColor: colors.surface }, Shadow.sm]}>
          <Ionicons name="location" size={16} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.districtName, { color: colors.text }]}>{d.name}</Text>
            <Text style={[styles.districtNote, { color: colors.textSecondary }]}>{d.note}</Text>
          </View>
        </View>
      ))}

      {/* Local tip */}
      <View style={[styles.localTip, { backgroundColor: colors.primary }]}>
        <Ionicons name="star" size={18} color="#fff" />
        <Text style={styles.localTipText}>{city.localTip}</Text>
      </View>
    </View>
  );
}

function InfoRow({ icon, label, colors }: { icon: any; label: string; colors: typeof Colors.light }) {
  return (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={16} color={colors.textMuted} />
      <Text style={[styles.infoText, { color: colors.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: Spacing.sm },
  tagline: { fontSize: Typography.sizes.md, marginBottom: Spacing.md, fontStyle: 'italic' },
  blockTitle: { fontSize: Typography.sizes.lg, fontWeight: Typography.weights.bold, marginTop: Spacing.md, marginBottom: Spacing.sm },
  actionsRow: { flexDirection: 'row', gap: Spacing.sm },
  actionCard: { flex: 1, padding: Spacing.md, borderRadius: Radius.lg, gap: Spacing.xs },
  actionIcon: { width: 36, height: 36, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
  actionName: { fontSize: Typography.sizes.md, fontWeight: Typography.weights.semibold, marginTop: Spacing.xs },
  actionPurpose: { fontSize: Typography.sizes.xs, lineHeight: 15 },
  actionOpen: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: Spacing.xs },
  actionOpenText: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.semibold },
  card: { borderRadius: Radius.lg, padding: Spacing.lg, gap: Spacing.sm, marginBottom: Spacing.sm },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  airportName: { fontSize: Typography.sizes.md, fontWeight: Typography.weights.semibold },
  routeRow: { flexDirection: 'row' },
  badge: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, borderRadius: Radius.full },
  badgeText: { color: '#fff', fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold },
  metaRow: { flexDirection: 'row', gap: Spacing.lg },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  metaText: { fontSize: Typography.sizes.sm },
  details: { fontSize: Typography.sizes.sm, lineHeight: 20 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  infoText: { fontSize: Typography.sizes.md },
  tipBox: { flexDirection: 'row', gap: Spacing.sm, padding: Spacing.md, borderRadius: Radius.md, marginTop: Spacing.xs },
  tipText: { flex: 1, fontSize: Typography.sizes.sm, lineHeight: 19 },
  districtCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, padding: Spacing.lg, borderRadius: Radius.lg, marginBottom: Spacing.sm },
  districtName: { fontSize: Typography.sizes.md, fontWeight: Typography.weights.semibold },
  districtNote: { fontSize: Typography.sizes.sm, marginTop: 2 },
  localTip: { flexDirection: 'row', gap: Spacing.sm, padding: Spacing.lg, borderRadius: Radius.lg, marginTop: Spacing.md, alignItems: 'flex-start' },
  localTipText: { flex: 1, color: '#fff', fontSize: Typography.sizes.sm, fontWeight: Typography.weights.medium, lineHeight: 20 },
});