import { Colors, Radius, Spacing, Typography } from '@/constants';
import { ChatMessage, chatWithAI } from '@/services/groq';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const suggestions = [
  'How much should I tip in China?',
  'What can I not bring into China?',
  'How do I bargain at a market?',
  'What are common dining etiquette rules?',
];

export default function AiScreen() {
  const scheme = useColorScheme();
  const colors = scheme === 'dark' ? Colors.dark : Colors.light;
  const scrollRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: trimmed };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);

    try {
      const reply = await chatWithAI(newMessages, 'en');
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: err instanceof Error ? `Error: ${err.message}` : 'Something went wrong.',
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>AI Assistant</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Ask anything about your China trip
        </Text>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <ScrollView
          ref={scrollRef}
          style={styles.flex}
          contentContainerStyle={styles.messages}
          showsVerticalScrollIndicator={false}
        >
          {isEmpty ? (
            <View style={styles.empty}>
              <View style={[styles.emptyIcon, { backgroundColor: colors.surface }]}>
                <Ionicons name="sparkles" size={32} color={colors.primary} />
              </View>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>
                Your China travel guide
              </Text>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                Ask about culture, food, etiquette, or anything else
              </Text>

              <View style={styles.suggestions}>
                {suggestions.map((s) => (
                  <TouchableOpacity
                    key={s}
                    style={[styles.suggestionChip, { backgroundColor: colors.surface, borderColor: colors.border }]}
                    onPress={() => send(s)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.suggestionText, { color: colors.text }]}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            messages.map((msg, i) => (
              <View
                key={i}
                style={[
                  styles.bubble,
                  msg.role === 'user'
                    ? [styles.userBubble, { backgroundColor: colors.primary }]
                    : [styles.aiBubble, { backgroundColor: colors.surface }],
                ]}
              >
                <Text
                  style={[
                    styles.bubbleText,
                    { color: msg.role === 'user' ? '#fff' : colors.text },
                  ]}
                >
                  {msg.content}
                </Text>
              </View>
            ))
          )}

          {loading && (
            <View style={[styles.bubble, styles.aiBubble, { backgroundColor: colors.surface }]}>
              <ActivityIndicator color={colors.primary} />
            </View>
          )}
        </ScrollView>

        <View style={[styles.inputBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Ask anything..."
            placeholderTextColor={colors.textMuted}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => send(input)}
            returnKeyType="send"
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, { backgroundColor: input.trim() ? colors.primary : colors.border }]}
            onPress={() => send(input)}
            disabled={!input.trim() || loading}
          >
            <Ionicons name="arrow-up" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  header: { paddingHorizontal: Spacing.screen, paddingTop: Spacing.lg, paddingBottom: Spacing.md },
  title: { fontSize: Typography.sizes.xxxl, fontWeight: Typography.weights.bold, letterSpacing: -0.5 },
  subtitle: { fontSize: Typography.sizes.md, marginTop: Spacing.xs },
  messages: { padding: Spacing.screen, gap: Spacing.md, flexGrow: 1 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.md, paddingTop: Spacing.xxxl },
  emptyIcon: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: Typography.sizes.xl, fontWeight: Typography.weights.bold },
  emptyText: { fontSize: Typography.sizes.md, textAlign: 'center', paddingHorizontal: Spacing.xl },
  suggestions: { gap: Spacing.sm, marginTop: Spacing.lg, width: '100%' },
  suggestionChip: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.lg, borderRadius: Radius.lg, borderWidth: 1 },
  suggestionText: { fontSize: Typography.sizes.md },
  bubble: { maxWidth: '85%', padding: Spacing.md, borderRadius: Radius.lg },
  userBubble: { alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  aiBubble: { alignSelf: 'flex-start', borderBottomLeftRadius: 4 },
  bubbleText: { fontSize: Typography.sizes.md, lineHeight: 22 },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
    margin: Spacing.screen,
    marginTop: 0,
    padding: Spacing.sm,
    paddingLeft: Spacing.lg,
    borderRadius: Radius.xl,
    borderWidth: 1,
  },
  input: { flex: 1, fontSize: Typography.sizes.md, maxHeight: 100, paddingVertical: Spacing.sm },
  sendButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
});