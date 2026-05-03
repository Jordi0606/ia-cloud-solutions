import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Loader2, Mic, MicOff, Bot, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '@/i18n/LanguageContext';

type Msg = { role: 'user' | 'assistant'; content: string };

interface SpeechRecognitionType extends EventTarget {
  continuous: boolean;
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionType;
    webkitSpeechRecognition: new () => SpeechRecognitionType;
  }
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
const langToSpeech: Record<string, string> = { es: 'es-ES', ca: 'ca-ES', en: 'en-US' };

const AiChatWidget = () => {
  const { language, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const startListening = useCallback(async () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Tu navegador no soporta reconocimiento de voz.');
      return;
    }
    try {
      // Request microphone permission directly in click handler
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      alert('Se necesita acceso al micrófono para usar esta función.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = langToSpeech[language] || 'es-ES';
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript;
        }
      }
      if (transcript) {
        setInput((prev) => (prev ? prev + ' ' + transcript : transcript));
      }
    };
    recognition.onerror = (e) => {
      console.error('Speech recognition error:', e);
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) stopListening();
    else startListening();
  }, [isListening, startListening, stopListening]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');

    const userMsg: Msg = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    let assistantSoFar = '';

    try {
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!resp.ok || !resp.body) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error de conexión');
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              const updated = assistantSoFar;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === 'assistant') {
                  return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: updated } : m));
                }
                return [...prev, { role: 'assistant', content: updated }];
              });
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }
    } catch (e) {
      setMessages((prev) => [...prev, { role: 'assistant', content: `Error: ${e instanceof Error ? e.message : 'Inténtalo de nuevo.'}` }]);
    }

    setIsLoading(false);
  };

  return (
    <>
      {/* Floating cloud-shaped button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={t('chat.label')}
        className="group fixed bottom-6 right-6 z-50 transition-transform hover:scale-110 focus:outline-none"
      >
        <div className="relative">
          {/* Neon green halo behind cloud */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-2xl animate-green-halo"
            style={{ background: "radial-gradient(circle, #39ff14 0%, rgba(57,255,20,0.6) 40%, transparent 70%)" }}
          />
          {/* Cloud SVG shape */}
          <svg
            viewBox="0 0 120 80"
            className="relative h-20 w-28 drop-shadow-[0_0_18px_hsl(var(--primary)/0.65)] animate-cloud-dim"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--primary) / 0.7)" />
              </linearGradient>
            </defs>
            <path
              d="M30 65 Q10 65 12 48 Q12 34 28 33 Q32 18 50 20 Q60 8 76 16 Q92 12 96 30 Q112 32 110 50 Q110 65 92 65 Z"
              fill="url(#cloudGrad)"
              stroke="hsl(var(--primary-foreground) / 0.3)"
              strokeWidth="1.5"
            />
          </svg>
          {/* Icon + label centered over cloud */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-primary-foreground">
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <>
                <Bot className="h-5 w-5" strokeWidth={2.4} />
                <span className="font-display text-[11px] font-bold uppercase tracking-wider leading-none mt-0.5">
                  {t('chat.label')}
                </span>
              </>
            )}
          </div>
        </div>
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[28rem] w-80 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:w-96">
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-border bg-primary/10 px-4 py-3">
            <MessageCircle className="h-5 w-5 text-primary" />
            <span className="font-display text-sm font-semibold text-foreground">Asistente IAcloWd</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.length === 0 && (
              <p className="text-center text-xs text-muted-foreground mt-8">
                ¡Hola! Pregúntame sobre nuestros servicios de IA. 🤖
              </p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground'
                }`}>
                  {m.role === 'assistant' ? (
                    <div className="max-w-none [&>p]:m-0 [&>p+p]:mt-2 [&_strong]:underline [&>ul]:mt-1 [&>ol]:mt-1">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  ) : m.content}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex justify-start">
                <div className="rounded-xl bg-secondary px-3 py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="flex items-center gap-2 border-t border-border px-3 py-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
              className="flex-1 bg-secondary text-sm"
              disabled={isLoading}
            />
            <Button
              type="button"
              size="sm"
              variant={isListening ? 'destructive' : 'secondary'}
              onClick={toggleListening}
              disabled={isLoading}
              className="shrink-0"
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Button type="submit" size="sm" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default AiChatWidget;
