import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [walletDialogOpen, setWalletDialogOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [calcAmount, setCalcAmount] = useState(20);
  const [calcDays, setCalcDays] = useState(30);
  const [prizmMenuOpen, setPrizmMenuOpen] = useState(false);
  const [exchangeMenuOpen, setExchangeMenuOpen] = useState(false);
  const prizmMenuRef = useRef<HTMLDivElement>(null);
  const exchangeMenuRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const rewardMap: Record<number, Record<number, number>> = {
    20: { 30: 20, 60: 40, 90: 70, 120: 135, 150: 560, 180: 640 },
    250: { 30: 288, 60: 354, 90: 480, 120: 625, 150: 715, 180: 810, 210: 2100, 240: 3750, 270: 6750 },
    2000: { 30: 2000 }
  };

  const profitPercentMap: Record<number, Record<number, number>> = {
    20: {
      30: 30,
      60: 35,
      90: 40,
      120: 50,
      150: 60,
      180: 60
    },
    250: {
      30: 15,
      60: 18,
      90: 20,
      120: 25,
      150: 30,
      180: 35,
      210: 40,
      240: 50,
      270: 50
    },
    2000: {
      30: 0
    }
  };

  const calculateReward = (amount: number, days: number) => {
    const reward = rewardMap[amount]?.[days] || 0;
    const profitPercent = profitPercentMap[amount]?.[days] || 0;
    return {
      total: amount + reward,
      profit: reward,
      guaranteed: amount,
      reward: reward,
      profitPercent: profitPercent
    };
  };

  const reward = calculateReward(calcAmount, calcDays);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const connectWallet = async (walletType: string) => {
    try {
      const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
      setWalletAddress(mockAddress);
      setWalletConnected(true);
      setWalletDialogOpen(false);
      
      toast({
        title: 'Кошелёк подключен!',
        description: `${walletType} успешно подключен. Адрес: ${mockAddress.slice(0, 6)}...${mockAddress.slice(-4)}`,
      });
    } catch (error) {
      toast({
        title: 'Ошибка подключения',
        description: 'Не удалось подключить кошелёк. Попробуйте снова.',
        variant: 'destructive',
      });
    }
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress('');
    toast({
      title: 'Кошелёк отключен',
      description: 'Вы успешно отключили криптокошелёк',
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (prizmMenuRef.current && !prizmMenuRef.current.contains(event.target as Node)) {
        setPrizmMenuOpen(false);
      }
      if (exchangeMenuRef.current && !exchangeMenuRef.current.contains(event.target as Node)) {
        setExchangeMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const prizmLinks = [
    { name: 'Online wallet - Онлайн кошелек Prizm', url: 'https://wallet.prizm.vip/' },
    { name: 'Официальный сайт криптовалюты', url: 'https://pzm.space/' },
    { name: 'GitHub Prizm для холодных кошельков и нод', url: 'https://github.com/prizmspace/PrizmCore' },
    { name: 'Блокчейн', url: 'https://blockchain.prizm.vip/' },
    { name: 'Whitepaper - Белая книга', url: 'https://tech.prizm.vip/files/prizm_wp_ru.pdf' },
  ];

  const exchangeLinks = [
    { name: 'RuDex', url: 'https://rudex.org/' },
    { name: 'ProBit', url: 'https://www.probit.com/ru-ru/' },
    { name: 'PrizmEx', url: 'https://prizmex.ru/' },
    { name: 'P2P бот', url: 'https://t.me/PrizmGroup_bot' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/740117d8-7e9c-4d11-88c4-0dbe433fc586.jpeg" 
                alt="Prizm Logo" 
                className="w-12 h-12 animate-glow-pulse object-fill"
              />
              <h1 className="text-2xl font-bold glow-purple">PRIZMANIA</h1>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div 
                ref={prizmMenuRef}
                className="relative"
                onMouseEnter={() => setPrizmMenuOpen(true)}
                onMouseLeave={() => setPrizmMenuOpen(false)}
              >
                <button
                  className="text-sm font-medium hover:text-primary transition-colors relative group"
                >
                  Prizm
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </button>
                {prizmMenuOpen && (
                  <div className="absolute top-full left-0 mt-1 w-80 bg-card/95 backdrop-blur-md border border-primary/30 rounded-lg shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {prizmLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-3 text-sm hover:bg-primary/10 transition-colors border-b border-border/30 last:border-0"
                      >
                        <div className="flex items-center gap-2">
                          <Icon name="ExternalLink" size={16} className="text-primary flex-shrink-0" />
                          <span>{link.name}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <div 
                ref={exchangeMenuRef}
                className="relative"
                onMouseEnter={() => setExchangeMenuOpen(true)}
                onMouseLeave={() => setExchangeMenuOpen(false)}
              >
                <button
                  className="text-sm font-medium hover:text-primary transition-colors relative group"
                >
                  Биржа
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </button>
                {exchangeMenuOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-card/95 backdrop-blur-md border border-secondary/30 rounded-lg shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute text-2xl animate-float opacity-60"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                          }}
                        >
                          💵
                        </div>
                      ))}
                    </div>
                    <div className="relative z-10">
                      {exchangeLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`block px-4 py-3 text-sm hover:bg-secondary/10 transition-all border-b border-border/30 last:border-0 group ${
                            link.name === 'P2P бот' ? 'hover:scale-105' : ''
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {link.name === 'P2P бот' ? (
                              <span className="text-base group-hover:animate-pulse">🤖</span>
                            ) : (
                              <Icon name="TrendingUp" size={16} className="text-secondary flex-shrink-0" />
                            )}
                            <span className={link.name === 'P2P бот' ? 'group-hover:glow-cyan' : ''}>
                              {link.name}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {['Игра', 'Технология', 'Награды', 'Патенты', 'FAQ', 'Контакты'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-sm font-medium hover:text-primary transition-colors relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </button>
              ))}
            </div>
            {walletConnected ? (
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 border border-primary/30">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm font-mono">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
                </div>
                <Button size="sm" variant="outline" onClick={disconnectWallet} className="border-primary/30">
                  <Icon name="LogOut" size={16} className="mr-2" />
                  Отключить
                </Button>
              </div>
            ) : (
              <Button 
                className="neon-border bg-primary hover:bg-primary/80" 
                asChild
              >
                <a href="https://t.me/PrizmaniaBot?start=rf1j94naat" target="_blank" rel="noopener noreferrer">
                  <Icon name="Wallet" size={18} className="mr-2" />
                  Подключить кошелёк
                </a>
              </Button>
            )}
          </div>
        </div>
      </nav>

      <section id="главная" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="glow-purple">PRIZMANIA</span>
                <br />
                <span className="text-3xl md:text-4xl glow-cyan">everybody wins</span>
              </h1>
              <p className="text-xl text-muted-foreground">Инновационная крипто-игра, где невозможно проиграть. Объединение криптокошелька с математической механикой выплаты наград на базе блокчейна криптовалюты Prizm.</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30">
                  <Icon name="BadgeCheck" size={16} className="text-primary" />
                  <span>Роспатент РФ</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30">
                  <Icon name="Leaf" size={16} className="text-secondary" />
                  <span>Эко-майнинг</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30">
                  <Icon name="Network" size={16} className="text-accent" />
                  <span>100% децентрализация</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/50 glow-purple">
                  <Icon name="TrendingUp" size={16} className="text-primary" />
                  <span className="font-bold">x3-x6 к депозиту</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <img 
                src="https://cdn.poehali.dev/files/b99e101a-7985-4b8e-906a-0d2e9cd057d4.jpg" 
                alt="Prizmania Hero" 
                className="rounded-2xl neon-border-cyan"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="игра" className="py-24 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 glow-purple">Игра, где невозможно проиграть</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Криптокошелёк + математическая механика выплат = реальные награды</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'TrendingUp', title: 'Невозможно проиграть', desc: 'Игровая механика распределяет награды по принципу децентрализации, баланс фонда более 65 млн монет', color: 'primary' },
              { icon: 'Wallet', title: 'Прямая интеграция', desc: 'Криптокошелёк напрямую связан с системой выплат наград, удобный телеграм бот', color: 'secondary' },
              { icon: 'Calculator', title: 'Математическая точность', desc: 'Новая экономическая модель, игра вытягивает монеты с рынка, создавая постоянный спрос и "искусственный" дефицит. Вход от $20.', color: 'accent' }
            ].map((item, i) => (
              <Card key={i} className="p-8 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all hover:scale-105 animate-fade-in" style={{ animationDelay: `${i * 0.2}s` }}>
                <div className={`w-16 h-16 rounded-full bg-${item.color}/20 flex items-center justify-center mb-6`}>
                  <Icon name={item.icon as any} size={32} className={`text-${item.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>

          <div className="mt-20">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 glow-cyan">Три ступени игры</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { level: '1 ступень', deposit: '$20', reward: '$1,920', icon: 'Star', color: 'primary' },
                { level: '2 ступень', deposit: '$250', reward: '$12,360', icon: 'Sparkles', color: 'secondary' },
                { level: '3 ступень', deposit: '$2,000', reward: '$45,000', icon: 'Trophy', color: 'accent' }
              ].map((step, i) => (
                <Card key={i} className="p-8 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-2 border-primary/30 hover:border-primary/70 transition-all hover:scale-105 animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className={`w-20 h-20 rounded-full bg-${step.color}/20 flex items-center justify-center mb-6 mx-auto border-2 border-${step.color}/50`}>
                    <Icon name={step.icon as any} size={40} className={`text-${step.color}`} />
                  </div>
                  <h4 className="text-2xl font-bold text-center mb-6 glow-purple">{step.level}</h4>
                  <div className="space-y-4 text-center">
                    <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
                      <p className="text-sm text-muted-foreground mb-1">Депозит</p>
                      <p className="text-3xl font-bold text-primary">{step.deposit}</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <Icon name="ArrowDown" size={24} className="text-accent animate-bounce" />
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-accent/40 neon-border-cyan">
                      <p className="text-sm text-muted-foreground mb-1">Награда</p>
                      <p className="text-4xl font-bold glow-cyan">{step.reward}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-16 flex justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Button 
                size="lg"
                className="relative group px-10 py-7 text-xl font-bold bg-primary/90 hover:bg-primary border-2 border-primary/50 hover:border-primary shadow-2xl hover:shadow-primary/60 transition-all duration-300 hover:scale-105 rounded-xl"
                asChild
              >
                <a href="https://t.me/PrizmaniaBot?start=rf1j94naat" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                  <img 
                    src="https://cdn.poehali.dev/files/1be8e4b6-2792-4e26-a67d-de9baff70d47.png" 
                    alt="Prizm Logo" 
                    className="w-10 h-10 object-contain"
                  />
                  <span className="uppercase tracking-wide">Инвестировать</span>
                  <Icon name="ArrowRight" size={24} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="технология" className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 glow-cyan">Криптовалюта Prizm</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Единственная в мире криптовалюта, зарегистрированная в Роспатенте РФ</p>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="BadgeCheck" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Роспатент РФ</h3>
                  <p className="text-muted-foreground">Единственная криптовалюта с официальной регистрацией в государственном реестре</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Network" size={24} className="text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Полная децентрализация</h3>
                  <p className="text-muted-foreground">Распределённая сеть без центрального управления и контроля</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Leaf" size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Экологичный майнинг</h3>
                  <p className="text-muted-foreground">Энергоэффективная технология без вреда окружающей среде</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Sparkles" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Уникальная экосистема</h3>
                  <p className="text-muted-foreground">Технология и инфраструктура не имеющая аналогов на крипторынке</p>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <img 
                src="https://cdn.poehali.dev/files/bf58e423-651b-4ffe-9244-ae15b4f9321e.jpg" 
                alt="Prizm Technology" 
                className="rounded-2xl neon-border"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="награды" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 glow-orange">Математическая механика наград</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Точные расчёты делают проигрыш невозможным</p>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="p-8 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-primary/30 neon-border">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2 animate-fade-in">
                  <div className="text-5xl font-bold glow-purple">100%</div>
                  <div className="text-muted-foreground">Криптовалюта, собственный блокчейн</div>
                </div>
                <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="text-5xl font-bold glow-cyan">24/7</div>
                  <div className="text-muted-foreground">Доступность системы</div>
                </div>
                <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <div className="text-5xl font-bold glow-orange">∞</div>
                  <div className="text-muted-foreground">Потенциал роста</div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card/50 backdrop-blur-sm border-secondary/30">
              <div className="mb-8 text-center">
                <h3 className="text-2xl font-bold mb-2 glow-cyan">Калькулятор наград</h3>
                <p className="text-muted-foreground">Рассчитайте свою прибыль в режиме реального времени</p>
              </div>
              
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-muted-foreground">Выберите сумму вклада</label>
                        <div className="grid grid-cols-3 gap-3">
                          {[20, 250, 2000].map((amount) => (
                            <Button
                              key={amount}
                              variant={calcAmount === amount ? "default" : "outline"}
                              onClick={() => setCalcAmount(amount)}
                              className={calcAmount === amount ? "neon-border bg-primary" : "border-primary/30"}
                            >
                              ${amount}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Минимум: $20</span>
                        <span>Максимум: $2000</span>
                      </div>
                      {calcAmount === 2000 && (
                        <div className="p-4 rounded-lg bg-accent/20 border-2 border-accent/50 animate-fade-in">
                          <div className="flex items-start gap-3">
                            <Icon name="Lock" size={20} className="text-accent flex-shrink-0 mt-0.5" />
                            <div className="text-sm">
                              <p className="font-bold text-accent mb-1">Доступно только при прохождении</p>
                              <p className="text-muted-foreground">Пройдите золотые ступени первой и второй игры, чтобы открыть доступ к третьей игре на $2000</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-muted-foreground">Выберите период</label>
                        <div className="grid grid-cols-2 gap-2">
                          {calcAmount === 20 && [
                            { days: 30, reward: 20 },
                            { days: 60, reward: 40 },
                            { days: 90, reward: 70 },
                            { days: 120, reward: 135 },
                            { days: 150, reward: 560 },
                            { days: 180, reward: 640, gold: true }
                          ].map((period) => (
                            <Button
                              key={period.days}
                              variant={calcDays === period.days ? "default" : "outline"}
                              onClick={() => setCalcDays(period.days)}
                              className={`${calcDays === period.days ? "neon-border bg-secondary" : "border-secondary/30"} ${period.gold ? "border-accent/70 bg-accent/10" : ""} relative`}
                              size="sm"
                            >
                              {period.gold && <Icon name="Crown" size={12} className="text-accent absolute top-1 right-1" />}
                              <span className="font-bold">{period.days} дней</span>
                            </Button>
                          ))}
                          {calcAmount === 250 && [
                            { days: 30, reward: 288 },
                            { days: 60, reward: 354 },
                            { days: 90, reward: 480 },
                            { days: 120, reward: 625 },
                            { days: 150, reward: 715 },
                            { days: 180, reward: 810 },
                            { days: 210, reward: 2100 },
                            { days: 240, reward: 3750 },
                            { days: 270, reward: 6750, gold: true }
                          ].map((period) => (
                            <Button
                              key={period.days}
                              variant={calcDays === period.days ? "default" : "outline"}
                              onClick={() => setCalcDays(period.days)}
                              className={`${calcDays === period.days ? "neon-border bg-secondary" : "border-secondary/30"} ${period.gold ? "border-accent/70 bg-accent/10" : ""} relative`}
                              size="sm"
                            >
                              {period.gold && <Icon name="Crown" size={12} className="text-accent absolute top-1 right-1" />}
                              <span className="font-bold">{period.days} дней</span>
                            </Button>
                          ))}
                          {calcAmount === 2000 && (
                            <div className="col-span-3 text-center p-4 rounded-lg bg-accent/20 border-2 border-accent/50">
                              <Icon name="Crown" size={32} className="text-accent mx-auto mb-2" />
                              <p className="text-sm font-bold glow-cyan">Золотая ступень</p>
                              <p className="text-xs text-muted-foreground mt-1">Эксклюзивные условия</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-accent/10 border border-accent/20">
                      <span className="text-muted-foreground">Базовая ставка</span>
                      <span className="text-xl font-bold text-accent">от 300% годовых</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center">
                    <div className="p-6 rounded-xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 border-2 border-primary/40 text-center space-y-4 animate-fade-in">
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Ваша награда через {calcDays} {calcDays === 1 ? 'день' : calcDays < 5 ? 'дня' : 'дней'}</div>
                        <div className="text-4xl md:text-5xl font-bold glow-purple mb-2">${reward.reward}</div>
                      </div>
                      
                      <div className="text-green-500 font-semibold flex items-center justify-center gap-2 text-lg">
                        <Icon name="TrendingUp" size={20} />
                        +{reward.profitPercent}% прибыль
                      </div>
                      
                      <div className="pt-4 border-t border-primary/20">
                        <div className="text-xs text-muted-foreground mb-1">Гарантированный минимум</div>
                        <div className="text-2xl font-bold text-primary">${calcAmount === 250 ? '288' : calcAmount}</div>
                        <div className="text-xs text-green-500 mt-1 flex items-center justify-center gap-1">
                          <Icon name="ShieldCheck" size={12} />
                          100% защита вклада
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-card/80 border border-border">
                  <div className="flex items-start gap-3">
                    <Icon name="Calculator" className="text-primary flex-shrink-0 mt-1" size={20} />
                    <div className="text-sm text-muted-foreground">Формула расчёта: Покупка ступеней производится в криптовалюте и требует дополнительного пополнения на начальных ступенях. Со временем перекрывается прибылью с последующих ступеней.</div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/30 via-primary/20 to-secondary/30 border-2 border-primary/40 p-8 text-center animate-fade-in">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 animate-pulse"></div>
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Icon name="Trophy" size={40} className="text-accent animate-bounce" />
                      <Icon name="Sparkles" size={32} className="text-primary" />
                      <Icon name="Crown" size={40} className="text-accent animate-bounce" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold glow-cyan mb-2">
                      {calcAmount === 20 ? 'Максимальная награда первой игры' : calcAmount === 250 ? 'Максимальная награда второй игры' : 'Третья игра'}
                    </h3>
                    <div className="text-5xl md:text-6xl font-bold glow-purple">
                      {calcAmount === 20 ? '1920$' : calcAmount === 250 ? '12,360$' : '45,000$'}
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      {calcAmount === 20 ? 'Пройди все ступени и получи максимальную награду' : calcAmount === 250 ? 'Получи доступ к третьей игре после прохождения золотой ступени' : 'Доступна после прохождения золотых ступеней первой и второй игры'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="патенты" className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 glow-purple">Патенты и регистрация</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Единственная зарегистрированная криптовалюта в Роспатенте РФ</p>
          
          <div className="max-w-5xl mx-auto">
            <Card className="p-0 bg-gradient-to-br from-primary/20 via-card/50 to-secondary/20 backdrop-blur-sm border-2 border-primary/40 overflow-hidden">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  <img 
                    src="https://cdn.poehali.dev/files/baa6c14f-7c9e-4667-a4c1-790d63b85435.png" 
                    alt="Призмания - Запатентованная крипто-игра" 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="w-full md:w-1/2 p-8 md:p-10 space-y-6">
                  <div className="flex items-start gap-4 bg-card/50 p-4 rounded-lg backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-colors">
                    <div className="p-2 rounded-full bg-primary/20">
                      <Icon name="Award" className="text-primary flex-shrink-0" size={28} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-primary">Официальная регистрация</h3>
                      <p className="text-muted-foreground">Свидетельство Роспатента РФ № 2018662596</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-card/50 p-4 rounded-lg backdrop-blur-sm border border-secondary/20 hover:border-secondary/50 transition-colors">
                    <div className="p-2 rounded-full bg-secondary/20">
                      <Icon name="FileCheck" className="text-secondary flex-shrink-0" size={28} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-secondary">Защита интеллектуальной собственности</h3>
                      <p className="text-muted-foreground">Патентная защита уникальных технологий</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-card/50 p-4 rounded-lg backdrop-blur-sm border border-accent/20 hover:border-accent/50 transition-colors">
                    <div className="p-2 rounded-full bg-accent/20">
                      <Icon name="ShieldCheck" className="text-accent flex-shrink-0" size={28} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-accent">Легальный статус</h3>
                      <p className="text-muted-foreground">Соответствие законодательству РФ</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="faq" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 glow-cyan">Вопросы и ответы</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Всё, что нужно знать о Призмании</p>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-border rounded-lg px-6 bg-card/30">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Почему невозможно проиграть?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Призмания использует математическую механику распределения наград, которая гарантирует выплаты каждому участнику. Криптокошелёк напрямую интегрирован с системой выплат, что исключает потери.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border border-border rounded-lg px-6 bg-card/30">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Чем Prizm отличается от других криптовалют?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Prizm — единственная криптовалюта, зарегистрированная в Роспатенте РФ. Полная децентрализация, экологичный майнинг и уникальная экосистема, не имеющая аналогов на крипторынке.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border border-border rounded-lg px-6 bg-card/30">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Как подключить криптокошелёк?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Нажмите кнопку «Подключить кошелёк» в верхней части сайта. Выберите MetaMask, Trust Wallet, WalletConnect или официальный Prizm Wallet для интеграции с игрой.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border border-border rounded-lg px-6 bg-card/30">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Что такое экологичный майнинг?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Экологичный майнинг Prizm — это энергоэффективная технология добычи криптовалюты по Proof of Stake системе, которая не требует мощного оборудования и не наносит вред окружающей среде.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5" className="border border-border rounded-lg px-6 bg-card/30">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Как работает математическая механика наград?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Система использует точные алгоритмы для распределения вознаграждений между участниками. Каждый вклад автоматически участвует в расчёте, гарантируя положительный результат.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section id="контакты" className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 glow-orange">Контакты</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Свяжитесь с нами</p>
          
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/30">
              <div className="grid gap-6">
                <a href="mailto:prizmsetup@gmail.com" className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/10 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Icon name="Mail" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-muted-foreground">prizmsetup@gmail.com</div>
                  </div>
                </a>
                
                <a href="https://t.me/crypt0_sales" className="flex items-center gap-4 p-4 rounded-lg hover:bg-secondary/10 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                    <Icon name="Send" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold">Telegram</div>
                    <div className="text-muted-foreground">@crypt0_sales</div>
                  </div>
                </a>
                
                <a href="#" className="flex items-center gap-4 p-4 rounded-lg hover:bg-accent/10 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                    <Icon name="Globe" size={24} className="text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold">Сайт</div>
                    <div className="text-muted-foreground">prizmania.com</div>
                  </div>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-primary/20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Prizmania. Все права защищены. Единственная криптовалюта, зарегистрированная в Роспатенте РФ.</p>
        </div>
      </footer>

      <Dialog open={walletDialogOpen} onOpenChange={setWalletDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold glow-purple">Подключить кошелёк</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Выберите кошелёк для подключения к Призмании
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button
              onClick={() => connectWallet('MetaMask')}
              className="w-full justify-start gap-4 h-16 bg-card hover:bg-primary/10 border border-border hover:border-primary/50 transition-all"
              variant="outline"
            >
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Icon name="Wallet" size={24} className="text-orange-500" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-base">MetaMask</div>
                <div className="text-xs text-muted-foreground">Популярный кошелёк для Web3</div>
              </div>
            </Button>

            <Button
              onClick={() => connectWallet('Trust Wallet')}
              className="w-full justify-start gap-4 h-16 bg-card hover:bg-secondary/10 border border-border hover:border-secondary/50 transition-all"
              variant="outline"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-blue-500" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-base">Trust Wallet</div>
                <div className="text-xs text-muted-foreground">Безопасный мобильный кошелёк</div>
              </div>
            </Button>

            <Button
              onClick={() => connectWallet('WalletConnect')}
              className="w-full justify-start gap-4 h-16 bg-card hover:bg-accent/10 border border-border hover:border-accent/50 transition-all"
              variant="outline"
            >
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Icon name="Link" size={24} className="text-cyan-500" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-base">WalletConnect</div>
                <div className="text-xs text-muted-foreground">Подключение через QR-код</div>
              </div>
            </Button>

            <Button
              onClick={() => connectWallet('Prizm Wallet')}
              className="w-full justify-start gap-4 h-16 bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 border border-primary/50 neon-border transition-all"
              variant="outline"
            >
              <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center">
                <img 
                  src="https://cdn.poehali.dev/files/fcc3ce6e-7b1d-43e7-98f2-81cd0e45d3f0.png" 
                  alt="Prizm" 
                  className="w-8 h-8"
                />
              </div>
              <div className="text-left">
                <div className="font-semibold text-base glow-purple">Prizm Wallet</div>
                <div className="text-xs text-muted-foreground">Официальный кошелёк Prizm</div>
              </div>
            </Button>
          </div>
          <div className="text-xs text-center text-muted-foreground mt-2">
            Подключая кошелёк, вы соглашаетесь с условиями использования
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;