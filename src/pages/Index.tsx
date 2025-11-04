import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/fcc3ce6e-7b1d-43e7-98f2-81cd0e45d3f0.png" 
                alt="Prizm Logo" 
                className="w-12 h-12 animate-glow-pulse"
              />
              <h1 className="text-2xl font-bold glow-purple">PRIZMANIA</h1>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {['Главная', 'Игра', 'Технология', 'Награды', 'Патенты', 'FAQ', 'Контакты'].map((item) => (
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
            <Button className="neon-border bg-primary hover:bg-primary/80">
              Подключить кошелёк
            </Button>
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
              <p className="text-xl text-muted-foreground">
                Инновационная крипто-игра, где невозможно проиграть. Объединение криптокошелька с математической механикой выплаты наград.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="neon-border bg-primary hover:bg-primary/80 text-lg px-8">
                  <Icon name="Wallet" className="mr-2" size={20} />
                  Начать играть
                </Button>
                <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 text-lg px-8">
                  <Icon name="PlayCircle" className="mr-2" size={20} />
                  Как это работает
                </Button>
              </div>
            </div>
            
            <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <img 
                src="https://cdn.poehali.dev/files/a6e0ac84-bb53-4cba-bfc8-f8c99254aa4c.jpg" 
                alt="Prizmania Hero" 
                className="rounded-2xl neon-border-cyan"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="игра" className="py-24 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 glow-purple">Игра без проигрыша</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Революционная механика гарантированных выплат</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'TrendingUp', title: 'Гарантированный рост', desc: 'Математическая модель исключает возможность потери средств', color: 'primary' },
              { icon: 'Shield', title: 'Полная безопасность', desc: 'Децентрализованная система без возможности манипуляций', color: 'secondary' },
              { icon: 'Coins', title: 'Честные выплаты', desc: 'Автоматические выплаты наград через смарт-контракты', color: 'accent' }
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
        </div>
      </section>

      <section id="технология" className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 glow-cyan">Технология Prizm</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Уникальная криптовалюта без аналогов на рынке</p>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Zap" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Экологичный майнинг</h3>
                  <p className="text-muted-foreground">Энергоэффективная технология без вреда для окружающей среды</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Network" size={24} className="text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Полная децентрализация</h3>
                  <p className="text-muted-foreground">Распределённая сеть без центра управления</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Blocks" size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Уникальная экосистема</h3>
                  <p className="text-muted-foreground">Собственная инфраструктура и инновационные решения</p>
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
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 glow-orange">Система вознаграждений</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Математическая модель распределения наград</p>
          
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-primary/30 neon-border">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2 animate-fade-in">
                  <div className="text-5xl font-bold glow-purple">100%</div>
                  <div className="text-muted-foreground">Гарантия выплат</div>
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
          </div>
        </div>
      </section>

      <section id="патенты" className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 glow-purple">Патенты и регистрация</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Единственная зарегистрированная криптовалюта в Роспатенте РФ</p>
          
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/30">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <img 
                  src="https://cdn.poehali.dev/files/2901209f-d627-4d9a-aab3-96852d6c101e.jpeg" 
                  alt="Роспатент" 
                  className="w-full md:w-1/2 rounded-xl"
                />
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="Award" className="text-primary flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-bold text-lg mb-1">Официальная регистрация</h3>
                      <p className="text-muted-foreground text-sm">Свидетельство Роспатента РФ № 2018662596</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="FileCheck" className="text-secondary flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-bold text-lg mb-1">Защита интеллектуальной собственности</h3>
                      <p className="text-muted-foreground text-sm">Патентная защита уникальных технологий</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="ShieldCheck" className="text-accent flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-bold text-lg mb-1">Легальный статус</h3>
                      <p className="text-muted-foreground text-sm">Соответствие законодательству РФ</p>
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
                  Как работает гарантия выигрыша?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Система основана на математической модели, которая исключает возможность проигрыша. Каждый участник получает вознаграждение благодаря децентрализованному распределению средств через смарт-контракты.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border border-border rounded-lg px-6 bg-card/30">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Что такое криптовалюта Prizm?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Prizm — это уникальная криптовалюта с собственной технологией и экосистемой, зарегистрированная в Роспатенте РФ. Она использует экологичный майнинг и полную децентрализацию.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border border-border rounded-lg px-6 bg-card/30">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Как подключить кошелёк?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Нажмите кнопку «Подключить кошелёк» в верхней части сайта. Следуйте инструкциям для интеграции вашего криптокошелька с платформой Призмания.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border border-border rounded-lg px-6 bg-card/30">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Какие преимущества перед другими крипто-играми?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Призмания — единственная игра с гарантией от проигрыша, официальной регистрацией в Роспатенте РФ, экологичным майнингом и полностью децентрализованной системой без возможности манипуляций.
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
                <a href="mailto:info@prizmania.com" className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/10 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Icon name="Mail" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-muted-foreground">info@prizmania.com</div>
                  </div>
                </a>
                
                <a href="https://t.me/prizmania" className="flex items-center gap-4 p-4 rounded-lg hover:bg-secondary/10 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                    <Icon name="Send" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold">Telegram</div>
                    <div className="text-muted-foreground">@prizmania</div>
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
    </div>
  );
};

export default Index;
