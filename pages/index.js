import Image from 'next/image';
import Link from 'next/link';
import { FaLock, FaBolt, FaHeadset, FaChartLine, FaWallet, FaUsers } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import CryptoRates from '../components/CryptoRates';
import styles from '../styles/LandingPage.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';



const translations = {
  
  en: {
    realStatsTitle: "Real-Time Platform Statistics",
    statUsers: "Registered Users",
    statInvestments: "Active Investments",
    statPayouts: "Total Payouts",
    statCountries: "Countries Served",

    thankYou: "Thank you for subscribing!",
newsletterTitle: "Subscribe to Our Newsletter",
newsletterSubtitle: "Get the latest news and offers from SIDRA BANK.",
subscribe: "Subscribe",
emailPlaceholder: "Enter your email",

    subscribeTitle: "Subscribe to Our Newsletter",
subscribeDesc: "Stay informed with updates and offers from SIDRA BANK.",
emailPlaceholder: "Enter your email",
subscribe: "Subscribe",

    trustTitle: "Why You Can Trust Us",
secureBadge: "SSL Secured",
verifiedBadge: "Verified Platform",
licensedBadge: "Licensed & Regulated",

    faqTitle: "Frequently Asked Questions",
q1: "How do I start investing?",
a1: "Register, choose a plan, make a deposit, and start earning daily returns.",
q2: "When can I withdraw?",
a2: "You can request withdrawals anytime after meeting the plan requirements.",
q3: "Is SIDRA BANK secure?",
a3: "Yes, we use bank-level encryption, 2FA, and store assets in cold wallets.",

    welcome: "Welcome to SIDRA BANK",
    subtitle: "Trusted Investment Platform with Gold Standard Plans. Secure your future with us.",
    getStarted: "Get Started",
    login: "Login",
    about: "About SIDRA BANK",
    contactUs: "Contact Us",
    contactMessage: "Have questions? Reach out to us at",
    contactEmail: "support@sidrabank.com",
    teamTitle: "Meet Our Team",
    featuresTitle: "Our Features",
    testimonialsTitle: "What Our Investors Say",
    tradingTitle: "Live Trading Insights",
    investmentCalc: "Investment Calculator",
    howItWorks: "How It Works",
    howSteps: [
      "Create an Account",
      "Fund Your Wallet",
      "Choose an Investment Plan",
      "Withdraw Anytime"
    ],
    howDescriptions: [
      "Register with your details to get started.",
      "Deposit through USDT, Litecoin, Bitcoin or Bank.",
      "Select a plan that fits your goals and start earning daily.",
      "Enjoy fast, secure withdrawals as soon as you qualify."
    ],
    sidraNumbers: "SIDRA BANK In Numbers",
    whyChoose: "Why Choose SIDRA BANK?",
    referralTitle: "Earn Through Referrals",
    referralText: "Invite your friends and earn $10 bonus each time someone joins and makes a deposit through your link.",
    partnersTitle: "Our Trusted Partners",
    videoTitle: "Watch How SIDRA BANK Works",
    faqTitle: "Frequently Asked Questions",
    faq: [
      ["How do I start investing?", "Register, choose a plan, make a deposit, and start earning daily returns."],
      ["When can I withdraw?", "You can request withdrawals anytime after meeting the plan requirements."],
      ["Is SIDRA BANK secure?", "Yes, we use bank-level encryption, 2FA, and store assets in cold wallets."]
    ]
    
  },
  fr: {
    realStatsTitle: "Statistiques en temps réel",
    statUsers: "Utilisateurs enregistrés",
    statInvestments: "Investissements actifs",
    statPayouts: "Paiements totaux",
    statCountries: "Pays desservis",

    trustTitle: "Pourquoi vous pouvez nous faire confiance",
secureBadge: "Sécurisé par SSL",
verifiedBadge: "Plateforme vérifiée",
licensedBadge: "Autorisé et réglementé",


    faqTitle: "Questions Fréquemment Posées",
q1: "Comment commencer à investir ?",
a1: "Inscrivez-vous, choisissez un plan, déposez de l'argent et commencez à gagner des rendements quotidiens.",
q2: "Quand puis-je retirer ?",
a2: "Vous pouvez demander un retrait à tout moment après avoir rempli les conditions du plan.",
q3: "SIDRA BANK est-il sécurisé ?",
a3: "Oui, nous utilisons un cryptage de niveau bancaire, une authentification à deux facteurs et un stockage à froid.",

    welcome: "Bienvenue chez SIDRA BANK",
    subtitle: "Plateforme d'investissement fiable avec des plans de qualité supérieure.",
    getStarted: "Commencer",
    login: "Connexion",
    about: "À propos de SIDRA BANK",
    contactUs: "Contactez-nous",
    contactMessage: "Des questions ? Contactez-nous à",
    contactEmail: "support@sidrabank.com",
    teamTitle: "Rencontrez notre équipe",
    featuresTitle: "Nos fonctionnalités",
    testimonialsTitle: "Ce que disent nos investisseurs",
    tradingTitle: "Aperçu du trading en direct",
    investmentCalc: "Calculateur d’investissement",
    howItWorks: "Comment ça marche",
    howSteps: [
      "Créer un compte",
      "Alimentez votre portefeuille",
      "Choisissez un plan d’investissement",
      "Retirez à tout moment"
    ],
    howDescriptions: [
      "Inscrivez-vous avec vos informations pour commencer.",
      "Déposez via USDT, Litecoin, Bitcoin ou virement bancaire.",
      "Choisissez un plan adapté à vos objectifs et commencez à gagner.",
      "Profitez de retraits rapides et sécurisés dès que vous êtes éligible."
    ],
    sidraNumbers: "SIDRA BANK en chiffres",
    whyChoose: "Pourquoi choisir SIDRA BANK ?",
    referralTitle: "Gagnez avec les parrainages",
    referralText: "Invitez vos amis et gagnez 10 $ de bonus lorsqu’ils rejoignent et déposent.",
    partnersTitle: "Nos partenaires de confiance",
    videoTitle: "Découvrez comment fonctionne SIDRA BANK",
    faqTitle: "Questions Fréquemment Posées",
    faq: [
      ["Comment commencer à investir ?", "Inscrivez-vous, choisissez un plan, déposez, et commencez à gagner."],
      ["Quand puis-je retirer ?", "Vous pouvez retirer dès que vous avez rempli les conditions du plan."],
      ["SIDRA BANK est-il sécurisé ?", "Oui, nous utilisons le chiffrement de niveau bancaire, l'authentification 2FA et des portefeuilles froids."]
    ]
  },
  es: {
    realStatsTitle: "Estadísticas en tiempo real",
    statUsers: "Usuarios registrados",
    statInvestments: "Inversiones activas",
    statPayouts: "Pagos totales",
    statCountries: "Países atendidos",

    trustTitle: "Por qué puedes confiar en nosotros",
secureBadge: "Seguro SSL",
verifiedBadge: "Plataforma verificada",
licensedBadge: "Autorizado y regulado",


    faqTitle: "Preguntas Frecuentes",
q1: "¿Cómo empiezo a invertir?",
a1: "Regístrate, elige un plan, haz un depósito y comienza a ganar rendimientos diarios.",
q2: "¿Cuándo puedo retirar?",
a2: "Puedes solicitar retiros en cualquier momento después de cumplir con los requisitos del plan.",
q3: "¿Es seguro SIDRA BANK?",
a3: "Sí, usamos cifrado de nivel bancario, autenticación de dos factores y almacenamiento en frío.",

    welcome: "Bienvenido a SIDRA BANK",
    subtitle: "Plataforma de inversión confiable con planes de calidad premium.",
    getStarted: "Comenzar",
    login: "Iniciar sesión",
    about: "Acerca de SIDRA BANK",
    contactUs: "Contáctenos",
    contactMessage: "¿Preguntas? Escríbanos a",
    contactEmail: "support@sidrabank.com",
    teamTitle: "Conoce a nuestro equipo",
    featuresTitle: "Nuestras características",
    testimonialsTitle: "Lo que dicen nuestros inversores",
    tradingTitle: "Información de trading en vivo",
    investmentCalc: "Calculadora de Inversión",
    howItWorks: "Cómo Funciona",
    howSteps: [
      "Crea una cuenta",
      "Financia tu billetera",
      "Elige un plan de inversión",
      "Retira en cualquier momento"
    ],
    howDescriptions: [
      "Regístrate para comenzar.",
      "Deposita a través de USDT, Litecoin, Bitcoin o transferencia bancaria.",
      "Elige un plan y comienza a ganar a diario.",
      "Retira de forma rápida y segura una vez califiques."
    ],
    sidraNumbers: "SIDRA BANK en cifras",
    whyChoose: "¿Por qué elegir SIDRA BANK?",
    referralTitle: "Gana con Referencias",
    referralText: "Invita amigos y gana $10 de bono cuando depositen.",
    partnersTitle: "Nuestros Socios de Confianza",
    videoTitle: "Mira cómo funciona SIDRA BANK",
    faqTitle: "Preguntas Frecuentes",
    faq: [
      ["¿Cómo empiezo a invertir?", "Regístrate, elige un plan, haz un depósito y comienza a ganar."],
      ["¿Cuándo puedo retirar?", "Puedes retirar en cualquier momento tras cumplir los requisitos."],
      ["¿Es seguro SIDRA BANK?", "Sí, usamos cifrado de nivel bancario, 2FA y almacenamiento en frío."]
    ]
  },
  ar: {
    realStatsTitle: "إحصائيات المنصة في الوقت الفعلي",
    statUsers: "المستخدمون المسجلون",
    statInvestments: "الاستثمارات النشطة",
    statPayouts: "إجمالي المدفوعات",
    statCountries: "الدول المدعومة",

    trustTitle: "لماذا يمكنك الوثوق بنا",
secureBadge: "مؤمن بواسطة SSL",
verifiedBadge: "منصة موثقة",
licensedBadge: "مرخصة ومنظمة",

faqTitle: "الأسئلة الشائعة",
q1: "كيف أبدأ في الاستثمار؟",
a1: "سجل، اختر خطة، قم بالإيداع وابدأ في جني الأرباح يوميًا.",
q2: "متى يمكنني السحب؟",
a2: "يمكنك طلب السحب في أي وقت بعد استيفاء شروط الخطة.",
q3: "هل SIDRA BANK آمن؟",
a3: "نعم، نستخدم تشفير من مستوى البنوك، ومصادقة ثنائية، وتخزين الأصول في محافظ باردة.",


    welcome: "مرحبًا بك في بنك سدرا",
    subtitle: "منصة استثمارية موثوقة بخطط ذهبية. أأمن مستقبلك معنا.",
    getStarted: "ابدأ الآن",
    login: "تسجيل الدخول",
    about: "حول بنك سدرا",
    contactUs: "اتصل بنا",
    contactMessage: "هل لديك أسئلة؟ تواصل معنا على",
    contactEmail: "support@sidrabank.com",
    teamTitle: "فريقنا",
    featuresTitle: "مميزاتنا",
    testimonialsTitle: "آراء المستثمرين",
    tradingTitle: "بيانات التداول المباشرة",
    investmentCalc: "حاسبة الاستثمار",
    howItWorks: "كيف يعمل",
    howSteps: [
      "أنشئ حسابًا",
      "قم بتمويل محفظتك",
      "اختر خطة استثمار",
      "اسحب في أي وقت"
    ],
    howDescriptions: [
      "سجل بياناتك للبدء.",
      "قم بالإيداع عبر USDT أو بيتكوين أو لايتكوين أو البنك.",
      "اختر خطة تناسب أهدافك وابدأ الربح اليومي.",
      "استمتع بسحب آمن وسريع عند استحقاقك."
    ],
    sidraNumbers: "أرقام بنك سدرا",
    whyChoose: "لماذا تختار بنك سدرا؟",
    referralTitle: "اربح من خلال الإحالات",
    referralText: "ادعُ أصدقاءك واربح 10 دولارات عند إيداعهم.",
    partnersTitle: "شركاؤنا الموثوقون",
    videoTitle: "شاهد كيف يعمل بنك سدرا",
    faqTitle: "الأسئلة الشائعة",
    faq: [
      ["كيف أبدأ الاستثمار؟", "سجل، اختر خطة، أودع، وابدأ في كسب الأرباح."],
      ["متى يمكنني السحب؟", "يمكنك السحب في أي وقت بعد استيفاء شروط الخطة."],
      ["هل بنك سدرا آمن؟", "نعم، نستخدم تشفير بنكي، ومصادقة ثنائية، ومحافظ باردة."]
    ]
  }
};

export default function Home() {
  const [language, setLanguage] = useState('en');
  const t = translations[language];
  const [showPopup, setShowPopup] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);

const faqItems = [
  { question: t.q1, answer: t.a1 },
  { question: t.q2, answer: t.a2 },
  { question: t.q3, answer: t.a3 },
];

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 5000);
    return () => clearTimeout(timer);
  }, []);
useEffect(() => {
  AOS.init({ duration: 1000 });
}, []);
  const isRTL = language === 'ar';

  return (
    <div className={styles.container} dir={isRTL ? 'rtl' : 'ltr'}>
      {showPopup && (
        <div className={styles.popup}>
          <p>🚀 New Plan Alert! Earn up to 15% ROI weekly. <Link href="/register">Join Now</Link></p>
          <button className={styles.popupClose} onClick={() => setShowPopup(false)}>×</button>
        </div>
      )}

      {/* Language Selector */}
      <div className={styles.languageSelector}>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">EN</option>
          <option value="fr">FR</option>
          <option value="es">ES</option>
          <option value="ar">AR</option>
        </select>
      </div>

    

      {/* Hero Section */}
      <section className={styles.heroSection} data-aos="fade-up">
        <div className={styles.heroContent}>
          <Image
            src="/sidra-bank.jpg"
            alt="Sidra Bank"
            width={800}
            height={400}
            className={styles.heroImage}
          />
          <h1 className={styles.heroTitle}>{t.welcome}</h1>
          <p className={styles.heroSubtitle}>{t.subtitle}</p>
          <div className={styles.heroButtons}>
            <Link href="/register"><button className={styles.primaryButton}>{t.getStarted}</button></Link>
            <Link href="/login"><button className={styles.secondaryButton}>{t.login}</button></Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.aboutSection} data-aos="fade-up">
        <h2 className={styles.sectionTitle}>{t.about}</h2>
        <div className={styles.aboutContent}>
          <Image src="/about-us.jpg" alt="About" width={500} height={300} className={styles.aboutImage} />
          <p className={styles.aboutText}>
            SIDRA BANK is a trusted and secure investment platform dedicated to helping individuals grow their wealth safely and efficiently. Our investment plans are designed with you in mind, offering high returns, quick withdrawals, and a seamless user experience.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className={styles.featuresSection} data-aos="fade-up">
        <h2 className={styles.sectionTitle}>{t.featuresTitle}</h2>
        <div className={styles.featuresGrid}>
          {features.map((feature, i) => (
            <div key={i} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trading Insights + Crypto Prices */}
      <section className={styles.tradingSection} data-aos="fade-up">
        <h2 className={styles.sectionTitle}>{t.tradingTitle}</h2>
        <Image src="/trading-graph.jpg" alt="Trading" width={800} height={400} className={styles.tradingImage} />
        <p className={styles.tradingText}>
          Monitor your investments in real-time with our live trading charts and detailed analytics. Stay informed, stay ahead.
        </p>
        <CryptoRates />
      </section>

      {/* Investment Calculator */}
      <section className={styles.calculatorSection} data-aos="fade-up">
        <h2 className={styles.sectionTitle}>Investment Calculator</h2>
        <div className={styles.calculatorBox}>
          <input
            type="number"
            placeholder="Enter amount (USD)"
            className={styles.calcInput}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              const dailyReturn = value ? (value * 0.1).toFixed(2) : '0.00';
              document.getElementById('calcResult').innerText = `$${dailyReturn} Daily`;
            }}
          />
          <p id="calcResult" className={styles.calcResult}>$0.00 Daily</p>
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.howItWorksSection} data-aos="fade-up">
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <div className={styles.stepsGrid}>
          {["Create an Account", "Fund Your Wallet", "Choose an Investment Plan", "Withdraw Anytime"].map((step, i) => (
            <div key={i} className={styles.stepCard}>
              <h4>{i + 1}. {step}</h4>
              <p>{stepDescriptions[i]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonialsSection} data-aos="fade-up">
        <h2 className={styles.sectionTitle}>{t.testimonialsTitle}</h2>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((t, i) => (
            <div key={i} className={styles.testimonialCard}>
              <p className={styles.testimonialText}>"{t.feedback}"</p>
              <h4 className={styles.testimonialAuthor}>- {t.author}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Counter */}
      <section className={styles.statsSection} data-aos="fade-up">
        <h2 className={styles.sectionTitle}>SIDRA BANK In Numbers</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}><h3>10,000+</h3><p>Active Users</p></div>
          <div className={styles.statCard}><h3>$5M+</h3><p>Invested</p></div>
          <div className={styles.statCard}><h3>$2.5M+</h3><p>Returns Paid</p></div>
        </div>
      </section>

      {/* Real-Time Platform Stats */}
<section className={styles.realStatsSection}>
  <h2 className={styles.sectionTitle}>{t.realStatsTitle}</h2>
  <div className={styles.realStatsGrid}>
    <div className={styles.realStatCard}><h3>15,000+</h3><p>{t.statUsers}</p></div>
    <div className={styles.realStatCard}><h3>$7M+</h3><p>{t.statInvestments}</p></div>
    <div className={styles.realStatCard}><h3>$3.2M+</h3><p>{t.statPayouts}</p></div>
    <div className={styles.realStatCard}><h3>80+</h3><p>{t.statCountries}</p></div>
  </div>
</section>


      {/* Team */}
      <section className={styles.teamSection} data-aos="fade-up">
        <h2 className={styles.sectionTitle}>{t.teamTitle}</h2>
        <div className={styles.teamGrid}>
          {teamMembers.map((m, i) => (
            <div key={i} className={styles.teamCard}>
              <Image src={m.image} alt={m.name} width={120} height={120} className={styles.teamImage} />
              <h3>{m.name}</h3>
              <p>{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.whyChooseSection} data-aos="fade-up">
        <h2 className={styles.sectionTitle}>Why Choose SIDRA BANK?</h2>
        <ul className={styles.whyList}>
          <li>✔️ Regulated and transparent investment practices</li>
          <li>✔️ Daily interest on plans with flexible reinvestment</li>
          <li>✔️ Referral bonuses and affiliate opportunities</li>
          <li>✔️ Experienced team with decades in finance</li>
          <li>✔️ 100% uptime, real-time analytics, and fraud protection</li>
        </ul>
      </section>

      {/* Referral Program */}
      <section className={styles.referralSection} data-aos="fade-up">
        <h2 className={styles.sectionTitle}>Earn Through Referrals</h2>
        <p className={styles.referralText}>
          Invite your friends and earn <strong>$10 bonus</strong> each time someone joins and makes a deposit through your link.
        </p>
        <Link href="/login"><button className={styles.primaryButton}>Get My Referral Link</button></Link>
      </section>

      {/* Partners */}
      <section className={styles.partnersSection} data-aos="fade-up">
        <h2 className={styles.sectionTitle}>Our Trusted Partners</h2>
        <div className={styles.partnerLogos}>
          <Image src="/logos/bitcoin.png" alt="Bitcoin" width={100} height={50} />
          <Image src="/logos/litecoin.png" alt="Litecoin" width={100} height={50} />
          <Image src="/logos/ethereum.png" alt="Ethereum" width={100} height={50} />
          <Image src="/logos/cloudflare.png" alt="Cloudflare" width={100} height={50} />
        </div>
      </section>


      {/* Video Testimonials / Demo Section
<section className={styles.videoSection} data-aos="fade-up">
  <h2 className={styles.sectionTitle}>Watch How SIDRA BANK Works</h2>
  <div className={styles.videoWrapper}>
    <iframe
      width="100%"
      height="400"
      src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your actual video link
      title="SIDRA BANK Demo"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
</section> */}


      {/* FAQ with Toggle */}
            <section className={styles.faqSection} data-aos="fade-up">
  <h2 className={styles.sectionTitle}>FAQ</h2>
  <div className={styles.faqGrid}>
    {faqItems.map((item, index) => (
      <div key={index} className={styles.faqItem}>
        <div
          className={styles.faqQuestion}
          onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
        >
          {item.question}
        </div>
        {openFAQ === index && (
          <div className={styles.faqAnswer}>
            {item.answer}
          </div>
        )}
      </div>
    ))}
  </div>
</section>



      {/* Contact */}
      <section className={styles.contactSection} data-aos="fade-up">
        <h2 className={styles.sectionTitle}>{t.contactUs}</h2>
        <p className={styles.contactText}>
          {t.contactMessage} <span className={styles.contactEmail}>{t.contactEmail}</span>
        </p>
      </section>

      {/* Trust Badges Section
<section className={styles.trustSection} data-aos="fade-up">
  <h2 className={styles.sectionTitle}>{t.trustTitle}</h2>
  <div className={styles.trustBadges}>
    <div className={styles.badge}>
      <Image src="/badges/secured.png" alt="Secure" width={60} height={60} />
      <p>{t.secureBadge}</p>
    </div>
    <div className={styles.badge}>
      <Image src="/badges/verified.png" alt="Verified" width={60} height={60} />
      <p>{t.verifiedBadge}</p>
    </div>
    <div className={styles.badge}>
      <Image src="/badges/licensed.png" alt="Licensed" width={60} height={60} />
      <p>{t.licensedBadge}</p>
    </div>
  </div>
</section> */}

{/* Newsletter Subscription */}

<section className={styles.newsletterSection} ata-aos="fade-up">
  <h2 className={styles.sectionTitle}>{t.newsletterTitle}</h2>
  <p className={styles.newsletterText}>{t.newsletterSubtitle}</p>
  <form
    className={styles.newsletterForm}
    onSubmit={(e) => {
      e.preventDefault();
      const email = e.target.email.value;
      if (email) {
        setShowThankYou(true);
        setTimeout(() => setShowThankYou(false), 4000); // hide after 4s
        e.target.reset();
      }
    }}
  >
    <input
      type="email"
      name="email"
      required
      placeholder={t.emailPlaceholder}
      className={styles.newsletterInput}
    />
    <button type="submit" className={styles.primaryButton}>
      {t.subscribe}
    </button>
  </form>

  {showThankYou && (
    <p className={styles.thankYouMessage}>{t.thankYou}</p>
  )}
</section>




      {/* Footer */}
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} SIDRA BANK. All rights reserved.
      </footer>

      {/* Floating Chat Icon */}
      <a href="mailto:sidrachaininvestment@gmail.com" className={styles.chatSupport} title="Contact Support">💬</a>
    </div>
  );
}

// Reusable Data
const features = [
  { title: 'Secure Investments', description: 'Your funds are protected with our top-tier security measures.', icon: <FaLock /> },
  { title: 'Fast Withdrawals', description: 'Enjoy quick and easy withdrawals without unnecessary delays.', icon: <FaBolt /> },
  { title: '24/7 Support', description: 'Our support team is always available to assist you anytime.', icon: <FaHeadset /> },
  { title: 'Live Trading', description: 'Access live trading data and market trends in real-time.', icon: <FaChartLine /> },
  { title: 'Wallet Management', description: 'Easily manage your wallet and track your transactions.', icon: <FaWallet /> },
  { title: 'Global Community', description: 'Join a growing community of investors from around the world.', icon: <FaUsers /> },
];

const testimonials = [
  { feedback: 'SIDRA BANK is the best platform I have ever used. Very secure and easy to navigate.', author: 'Williams Son.' },
  { feedback: 'The withdrawals are super fast and the support team is always available!', author: 'Sarah Zulu.' },
  { feedback: 'Highly recommend SIDRA BANK to anyone looking to grow their investment.', author: 'Anja Nyati.' },
];

const stepDescriptions = [
  "Register with your details to get started.",
  "Deposit through USDT, Litecoin, Bitcoin or Bank.",
  "Select a plan that fits your goals and start earning daily.",
  "Enjoy fast, secure withdrawals as soon as you qualify."
];

const teamMembers = [
  { name: 'Mohammed Al Jefairi.', role: 'Founder & CEO', image: '/team1.jpg' },
  { name: 'MJ.', role: 'CTO', image: '/team2.jpg' },
  { name: 'Hassan J.', role: 'Head of Marketing', image: '/team3.jpg' },
];

