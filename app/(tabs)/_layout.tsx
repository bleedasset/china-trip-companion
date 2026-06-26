import { Colors, Typography } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, useColorScheme } from 'react-native';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface TabConfig {
  name: string;
  title: string;
  icon: IconName;
  iconFocused: IconName;
}

const tabs: TabConfig[] = [
  { name: 'index', title: 'Scanner', icon: 'scan-outline', iconFocused: 'scan' },
  { name: 'payment', title: 'Payment', icon: 'card-outline', iconFocused: 'card' },
  { name: 'transport', title: 'Transport', icon: 'subway-outline', iconFocused: 'subway' },
  { name: 'sos', title: 'SOS', icon: 'medkit-outline', iconFocused: 'medkit' },
  { name: 'ai', title: 'AI', icon: 'sparkles-outline', iconFocused: 'sparkles' },
];

export default function TabsLayout() {
  const scheme = useColorScheme();
  const colors = scheme === 'dark' ? Colors.dark : Colors.light;
  const isDark = scheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0,
          height: Platform.OS === 'ios' ? 85 : 65,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={80}
            tint={isDark ? 'dark' : 'light'}
            style={StyleSheet.absoluteFill}
          />
        ),
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarLabelStyle: {
          fontSize: Typography.sizes.xs,
          fontWeight: Typography.weights.medium,
          marginBottom: Platform.OS === 'ios' ? 0 : 8,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? tab.iconFocused : tab.icon}
                size={24}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}