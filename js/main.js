// Feza Savaş Website - Main JavaScript

const LANGUAGE_STORAGE_KEY = 'fezaLanguage';
const LANGUAGE_EVENT = 'feza:languagechange';
const SUPPORTED_LANGUAGES = ['tr', 'en', 'fr'];
const DEFAULT_LANGUAGE = 'tr';

const TRANSLATIONS = {
    tr: {
        'logo.tagline': 'Danışmanlık & Dış Ticaret',
        'nav.corporate': 'Kurumsal',
        'nav.work': 'İşler / Çalışmalarımız',
        'nav.projects': 'Projelerimiz',
        'nav.home': 'Ana Sayfa',
        'nav.about': 'Hakkımızda',
        'nav.academy': 'Akademi',
        'nav.consulting': 'Danışmanlıklarımız',
        'nav.trade': 'Dünya ile Ticaret',
        'nav.delta': 'Delta Proje',
        'nav.klinker': 'Klinker İhracatı',
        'nav.pet': 'Pet Şişe İhracatı',
        'footer.copyright.short': '© 2025 Feza Savaş',
        'footer.copyright.full': '© 2025 Feza Savaş - Tüm hakları saklıdır.',
        'footer.contact': 'İletişim',
        'footer.admin': 'Admin Girişi',
        'contact.label': 'İletişim',
        'contact.title': 'Bizimle İletişime Geçin',
        'contact.intro': 'Projeleriniz ve iş birliği fırsatları için bizimle iletişime geçebilirsiniz.',
        'contact.email.label': 'E-posta',
        'contact.phone.label': 'Telefon',
        'contact.form.name': 'Ad Soyad',
        'contact.form.namePlaceholder': 'Adınız ve soyadınız',
        'contact.form.email': 'E-posta',
        'contact.form.emailPlaceholder': 'ornek@email.com',
        'contact.form.message': 'Mesajınız',
        'contact.form.messagePlaceholder': 'Mesajınızı buraya yazın...',
        'contact.form.submit': 'Gönder',
        'contact.form.sending': 'Gönderiliyor...',
        'contact.form.success': 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.',
        'contact.form.error': 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.'
    },
    en: {
        'logo.tagline': 'Consulting & Foreign Trade',
        'nav.corporate': 'Corporate',
        'nav.work': 'Services / Our Work',
        'nav.projects': 'Our Projects',
        'nav.home': 'Home',
        'nav.about': 'About Us',
        'nav.academy': 'Academy',
        'nav.consulting': 'Consulting',
        'nav.trade': 'Global Trade',
        'nav.delta': 'Delta Project',
        'nav.klinker': 'Clinker Export',
        'nav.pet': 'PET Bottle Export',
        'footer.copyright.short': '© 2025 Feza Savaş',
        'footer.copyright.full': '© 2025 Feza Savaş - All rights reserved.',
        'footer.contact': 'Contact',
        'footer.admin': 'Admin Login',
        'aria.languageSwitcher': 'Language options',
        'alt.logo': 'Feza Savaş logo',
        'alt.flag.tr': 'Turkish flag',
        'alt.flag.en': 'United Kingdom flag',
        'alt.flag.fr': 'French flag',
        'alt.profile': 'Feza Savaş portrait',
        'alt.academy.cover': 'Article cover image',
        'index.hero.title': 'For you, <span>with you</span>',
        'index.hero.subtitle': 'Your gateway from Türkiye to the world. We grow your business with professional consulting and reliable foreign trade solutions.',
        'index.about.title': 'Who is Feza Savaş?',
        'index.about.desc1': 'My 25+ years of experience were shaped by senior leadership roles in multinational automotive companies and consulting for Türkiye’s leading institutions.',
        'index.about.desc2': 'I bring expert insight in strengthening leadership structures, simplifying decision processes, and executive coaching during transformation periods.',
        'index.about.link': 'Learn More',
        'index.services.label': 'Our Services',
        'index.services.title': 'Services / Our Work',
        'index.services.consulting.title': 'Consulting',
        'index.services.consulting.desc': 'We provide expert consulting on redesigning leadership structures, streamlining corporate decision-making, and executive coaching during change.',
        'index.services.consulting.link': 'View Details',
        'index.services.trade.title': 'Global Trade',
        'index.services.trade.desc': 'We support foreign investors in Türkiye and Turkish investors abroad, offering market research and partnership opportunities for industrial companies.',
        'index.services.trade.link': 'View Details',
        'index.projects.label': 'Active Projects',
        'index.projects.title': 'Our Projects',
        'index.projects.delta.badge': 'Consulting',
        'index.projects.delta.title': 'Delta Project',
        'index.projects.delta.desc': 'Strategic business development and operational excellence project',
        'index.projects.klinker.badge': 'Export',
        'index.projects.klinker.title': 'Clinker Export',
        'index.projects.klinker.desc': 'Bringing quality clinker products to international markets',
        'index.projects.pet.badge': 'Export',
        'index.projects.pet.title': 'PET Bottle Export',
        'index.projects.pet.desc': 'Global distribution of PET bottle and packaging products',
        'about.hero.title': 'Who is <span>Feza Savaş?</span>',
        'about.hero.subtitle': 'A trade bridge from Türkiye to the world. Trust, experience, and sustainable success.',
        'consulting.hero.title': 'Consulting <span>Services</span>',
        'consulting.hero.subtitle': 'We deliver professional consulting services with our expert team.',
        'trade.hero.title': 'Global <span>Trade</span>',
        'trade.hero.subtitle': 'Enter global markets with comprehensive trade services and foreign trade solutions.',
        'trade.section.title': 'Our Trade Services',
        'trade.section.intro': 'We offer a wide range of import, export, and domestic trade services. We deliver the highest-quality products under the best conditions. As your trusted partner in international markets, we work for your commercial success.',
        'trade.section.areas.title': 'Our Trade Areas',
        'trade.section.areas.item1': 'Import and export operations',
        'trade.section.areas.item2': 'Wholesale trade and distribution',
        'trade.section.areas.item3': 'Foreign trade consulting',
        'trade.section.areas.item4': 'Logistics solutions and transportation',
        'trade.section.areas.item5': 'Customs procedures and regulatory consulting',
        'trade.section.areas.item6': 'Market research and analysis',
        'trade.section.advantages.title': 'Our Advantages',
        'trade.section.advantages.item1': 'Extensive supplier network and reliable partners',
        'trade.section.advantages.item2': 'Competitive prices and flexible payment terms',
        'trade.section.advantages.item3': 'Fast and secure delivery',
        'trade.section.advantages.item4': 'Quality assurance and product tracking',
        'trade.section.advantages.item5': 'Experienced team and professional service',
        'trade.section.experience.title': 'Our Export Experience',
        'trade.section.experience.desc': 'With years of experience, we deliver successful projects in international markets. Our clinker and PET bottle exports provide reliable, high-quality service to customers.',
        'delta.hero.title': 'Delta <span>Project</span>',
        'delta.hero.subtitle': 'We carry your business into the future with strategic development and operational excellence.',
        'delta.section.title': 'About Delta Project',
        'delta.section.intro': 'Delta Project contains the innovative solutions we deliver with a modern project management approach. We design and implement bespoke projects for our clients, offering the most effective solutions through comprehensive analysis.',
        'delta.section.scope.title': 'Project Scope',
        'delta.section.scope.item1': 'Project planning and management',
        'delta.section.scope.item2': 'Feasibility studies and cost analysis',
        'delta.section.scope.item3': 'Technical consulting and implementation support',
        'delta.section.scope.item4': 'Implementation and monitoring systems',
        'delta.section.scope.item5': 'Performance analysis and reporting',
        'delta.section.scope.item6': 'Business development strategies',
        'delta.section.method.title': 'Our Methodology',
        'delta.section.method.item1': 'Detailed needs analysis and planning',
        'delta.section.method.item2': 'Agile project management approach',
        'delta.section.method.item3': 'Continuous improvement and optimization',
        'delta.section.method.item4': 'Risk management and mitigation strategies',
        'delta.section.method.item5': 'Stakeholder management and communication',
        'delta.section.success.title': 'Success Stories',
        'delta.section.success.desc': 'Through projects delivered under Delta Project, we create measurable value for our clients. We have proven success in increasing operational efficiency, optimizing costs, and reaching strategic goals.',
        'klinker.hero.title': 'Clinker <span>Export</span>',
        'klinker.hero.subtitle': 'We deliver high-quality clinker products to world markets.',
        'klinker.section.title': 'Our Clinker Services',
        'klinker.section.intro': 'We specialize in clinker production and trade, the essential raw material of the construction industry. We produce high-quality clinker to international standards and deliver it to global markets. Our quality control processes and reliable logistics network ensure uninterrupted service.',
        'klinker.section.range.title': 'Product Range',
        'klinker.section.range.item1': 'Portland Clinker (Type I, II, III, IV, V)',
        'klinker.section.range.item2': 'White clinker',
        'klinker.section.range.item3': 'Colored clinker varieties',
        'klinker.section.range.item4': 'Custom formulations (per customer need)',
        'klinker.section.range.item5': 'Wholesale and retail sales options',
        'klinker.section.quality.title': 'Quality Standards',
        'klinker.section.quality.item1': 'Full compliance with TS EN 197-1 standards',
        'klinker.section.quality.item2': 'ISO 9001 quality management certification',
        'klinker.section.quality.item3': 'Regular laboratory tests and quality control',
        'klinker.section.quality.item4': 'International certifications and compliance documents',
        'klinker.section.quality.item5': 'Continuous improvement and development efforts',
        'klinker.section.services.title': 'Our Services',
        'klinker.section.services.item1': 'Technical consulting and product selection support',
        'klinker.section.services.item2': 'Sample analysis and test reports',
        'klinker.section.services.item3': 'Fast and secure delivery',
        'klinker.section.services.item4': 'Competitive pricing and bulk order advantages',
        'klinker.section.services.item5': '24/7 customer support',
        'klinker.section.experience.title': 'Our Export Experience',
        'klinker.section.experience.desc': 'With years of clinker exports, we have completed successful deliveries to many countries. Thanks to our experienced team and strong logistics network, we guarantee on-time and complete delivery.',
        'pet.hero.title': 'PET Bottle <span>Export</span>',
        'pet.hero.subtitle': 'We serve global markets with eco-friendly, high-quality PET bottle solutions.',
        'pet.section.title': 'Our PET Bottle Services',
        'pet.section.intro': 'Using modern production technologies, we manufacture and export high-quality PET bottles for the food and beverage sector. With our eco-friendly approach and quality standards, we lead the industry.',
        'pet.section.range.title': 'Our Product Range',
        'pet.section.range.item1': 'Water bottles (0.5L - 5L and custom sizes)',
        'pet.section.range.item2': 'Soft drink bottles (for carbonated beverages)',
        'pet.section.range.item3': 'Milk and dairy bottles',
        'pet.section.range.item4': 'Oil bottles (leak-proof)',
        'pet.section.range.item5': 'Custom design bottles (brand-aligned)',
        'pet.section.range.item6': 'Preform production',
        'pet.section.features.title': 'Technical Features',
        'pet.section.features.item1': 'Food-grade PET raw material',
        'pet.section.features.item2': 'High durability and impact resistance',
        'pet.section.features.item3': 'Lightweight structure, lower transportation costs',
        'pet.section.features.item4': '100% recyclable material',
        'pet.section.features.item5': 'UV-protected options and color variety',
        'pet.section.features.item6': 'Compliance with FDA and EU standards',
        'pet.section.services.title': 'Our Services',
        'pet.section.services.item1': 'Custom mold design and production',
        'pet.section.services.item2': 'Logo and label printing services',
        'pet.section.services.item3': 'Wholesale sales and continuous supply',
        'pet.section.services.item4': 'Fast production and on-time delivery',
        'pet.section.services.item5': 'Technical support and quality control',
        'pet.section.services.item6': 'Custom packaging solutions',
        'pet.section.sustainability.title': 'Environmental Responsibility',
        'pet.section.sustainability.desc': 'We apply eco-friendly production processes with a sustainable mindset. We contribute to nature through energy efficiency, waste management, and recycling programs. As part of our efforts to reduce the carbon footprint, we prefer renewable energy sources.',
        'pet.section.export.title': 'Global Export',
        'pet.section.export.desc': 'With our quality products and reliable service, we carry out successful exports to many countries worldwide. Our experienced export team professionally manages logistics and customs processes.',
        'academy.hero.title': 'Academy <span>Articles</span>',
        'academy.hero.subtitle': "Feza Bey's expert notes, strategy insights, and field experience are here.",
        'academy.section.label': 'Articles',
        'academy.section.title': 'Latest Posts',
        'academy.empty': 'No academy articles have been published yet.',
        'contact.label': 'Contact',
        'contact.title': 'Get in Touch',
        'contact.intro': 'You can contact us for your projects and collaboration opportunities.',
        'contact.email.label': 'Email',
        'contact.phone.label': 'Phone',
        'contact.form.name': 'Full Name',
        'contact.form.namePlaceholder': 'Your name and surname',
        'contact.form.email': 'Email',
        'contact.form.emailPlaceholder': 'example@email.com',
        'contact.form.message': 'Your Message',
        'contact.form.messagePlaceholder': 'Write your message here...',
        'contact.form.submit': 'Send',
        'contact.form.sending': 'Sending...',
        'contact.form.success': 'Your message has been sent successfully! We will get back to you soon.',
        'contact.form.error': 'An error occurred while sending your message. Please try again.'
    },
    fr: {
        'logo.tagline': 'Conseil & Commerce extérieur',
        'nav.corporate': 'Institutionnel',
        'nav.work': 'Services / Nos réalisations',
        'nav.projects': 'Nos projets',
        'nav.home': 'Accueil',
        'nav.about': 'À propos',
        'nav.academy': 'Académie',
        'nav.consulting': 'Conseil',
        'nav.trade': 'Commerce international',
        'nav.delta': 'Projet Delta',
        'nav.klinker': 'Exportation de clinker',
        'nav.pet': 'Exportation de bouteilles PET',
        'footer.copyright.short': '© 2025 Feza Savaş',
        'footer.copyright.full': '© 2025 Feza Savaş - Tous droits réservés.',
        'footer.contact': 'Contact',
        'footer.admin': 'Connexion admin',
        'aria.languageSwitcher': 'Options de langue',
        'alt.logo': 'Logo Feza Savaş',
        'alt.flag.tr': 'Drapeau turc',
        'alt.flag.en': 'Drapeau du Royaume-Uni',
        'alt.flag.fr': 'Drapeau français',
        'alt.profile': 'Portrait de Feza Savaş',
        'alt.academy.cover': 'Image de couverture de l’article',
        'index.hero.title': 'Pour vous, <span>avec vous</span>',
        'index.hero.subtitle': 'Votre passerelle de la Turquie vers le monde. Nous développons votre entreprise grâce au conseil professionnel et à des solutions de commerce extérieur fiables.',
        'index.about.title': 'Qui est Feza Savaş ?',
        'index.about.desc1': 'Mes plus de 25 années d’expérience ont été façonnées par des postes de direction dans l’automobile au sein de groupes multinationaux et par le conseil auprès des institutions de premier plan en Turquie.',
        'index.about.desc2': 'J’apporte une expertise pour renforcer les structures de leadership, simplifier les processus décisionnels et accompagner les dirigeants pendant les périodes de transformation.',
        'index.about.link': 'En savoir plus',
        'index.services.label': 'Nos services',
        'index.services.title': 'Services / Nos réalisations',
        'index.services.consulting.title': 'Conseil',
        'index.services.consulting.desc': 'Nous offrons un conseil expert pour repenser les structures de leadership, simplifier la prise de décision et accompagner les dirigeants durant les phases de changement.',
        'index.services.consulting.link': 'Voir les détails',
        'index.services.trade.title': 'Commerce international',
        'index.services.trade.desc': 'Nous accompagnons les investisseurs étrangers en Turquie et les investisseurs turcs à l’international, en proposant des études de marché et des opportunités de partenariat pour les entreprises industrielles.',
        'index.services.trade.link': 'Voir les détails',
        'index.projects.label': 'Projets en cours',
        'index.projects.title': 'Nos projets',
        'index.projects.delta.badge': 'Conseil',
        'index.projects.delta.title': 'Projet Delta',
        'index.projects.delta.desc': 'Projet de développement stratégique et d’excellence opérationnelle',
        'index.projects.klinker.badge': 'Export',
        'index.projects.klinker.title': 'Exportation de clinker',
        'index.projects.klinker.desc': 'Distribution de clinker de qualité sur les marchés internationaux',
        'index.projects.pet.badge': 'Export',
        'index.projects.pet.title': 'Exportation de bouteilles PET',
        'index.projects.pet.desc': 'Distribution mondiale de bouteilles PET et d’emballages',
        'about.hero.title': 'Qui est <span>Feza Savaş ?</span>',
        'about.hero.subtitle': 'Un pont commercial de la Turquie vers le monde. Confiance, expérience et réussite durable.',
        'consulting.hero.title': 'Services de <span>conseil</span>',
        'consulting.hero.subtitle': 'Nous fournissons des services de conseil professionnels avec notre équipe d’experts.',
        'trade.hero.title': 'Commerce <span>international</span>',
        'trade.hero.subtitle': 'Accédez aux marchés mondiaux grâce à des services commerciaux complets et des solutions de commerce extérieur.',
        'trade.section.title': 'Nos services commerciaux',
        'trade.section.intro': 'Nous proposons un large éventail de services en import, export et commerce intérieur. Nous livrons les produits de la meilleure qualité dans les meilleures conditions. Partenaire fiable sur les marchés internationaux, nous œuvrons pour votre réussite commerciale.',
        'trade.section.areas.title': 'Nos domaines commerciaux',
        'trade.section.areas.item1': 'Opérations d’importation et d’exportation',
        'trade.section.areas.item2': 'Commerce de gros et distribution',
        'trade.section.areas.item3': 'Conseil en commerce extérieur',
        'trade.section.areas.item4': 'Solutions logistiques et transport',
        'trade.section.areas.item5': 'Procédures douanières et conseil réglementaire',
        'trade.section.areas.item6': 'Études de marché et analyse',
        'trade.section.advantages.title': 'Nos atouts',
        'trade.section.advantages.item1': 'Large réseau de fournisseurs et partenaires fiables',
        'trade.section.advantages.item2': 'Prix compétitifs et conditions de paiement flexibles',
        'trade.section.advantages.item3': 'Livraison rapide et sécurisée',
        'trade.section.advantages.item4': 'Assurance qualité et suivi des produits',
        'trade.section.advantages.item5': 'Équipe expérimentée et service professionnel',
        'trade.section.experience.title': 'Notre expérience à l’export',
        'trade.section.experience.desc': 'Forts de nombreuses années d’expérience, nous menons des projets réussis sur les marchés internationaux. Notre expertise en exportation de clinker et de bouteilles PET offre à nos clients un service fiable et de qualité.',
        'delta.hero.title': 'Projet <span>Delta</span>',
        'delta.hero.subtitle': 'Nous portons votre entreprise vers l’avenir grâce au développement stratégique et à l’excellence opérationnelle.',
        'delta.section.title': 'À propos du projet Delta',
        'delta.section.intro': 'Le projet Delta rassemble les solutions innovantes que nous mettons en œuvre grâce à une approche moderne de gestion de projet. Nous concevons et déployons des projets sur mesure pour nos clients, en offrant les solutions les plus efficaces grâce à une analyse approfondie.',
        'delta.section.scope.title': 'Périmètre du projet',
        'delta.section.scope.item1': 'Planification et gestion de projet',
        'delta.section.scope.item2': 'Études de faisabilité et analyse des coûts',
        'delta.section.scope.item3': 'Conseil technique et support de mise en œuvre',
        'delta.section.scope.item4': 'Systèmes de mise en œuvre et de suivi',
        'delta.section.scope.item5': 'Analyse de performance et reporting',
        'delta.section.scope.item6': 'Stratégies de développement commercial',
        'delta.section.method.title': 'Notre méthodologie',
        'delta.section.method.item1': 'Analyse détaillée des besoins et planification',
        'delta.section.method.item2': 'Approche agile de gestion de projet',
        'delta.section.method.item3': 'Amélioration continue et optimisation',
        'delta.section.method.item4': 'Gestion des risques et stratégies d’atténuation',
        'delta.section.method.item5': 'Gestion des parties prenantes et communication',
        'delta.section.success.title': 'Histoires de réussite',
        'delta.section.success.desc': 'Grâce aux projets menés dans le cadre du projet Delta, nous créons une valeur mesurable pour nos clients. Nous avons des réussites éprouvées en matière d’efficacité opérationnelle, d’optimisation des coûts et d’atteinte des objectifs stratégiques.',
        'klinker.hero.title': 'Exportation de <span>clinker</span>',
        'klinker.hero.subtitle': 'Nous proposons des produits de clinker de haute qualité aux marchés mondiaux.',
        'klinker.section.title': 'Nos services clinker',
        'klinker.section.intro': 'Nous sommes spécialisés dans la production et le commerce du clinker, matière première essentielle du secteur de la construction. Nous produisons du clinker de haute qualité selon les normes internationales et le livrons aux marchés mondiaux. Nos processus de contrôle qualité et notre réseau logistique fiable garantissent un service continu.',
        'klinker.section.range.title': 'Gamme de produits',
        'klinker.section.range.item1': 'Clinker Portland (Types I, II, III, IV, V)',
        'klinker.section.range.item2': 'Clinker blanc',
        'klinker.section.range.item3': 'Variétés de clinker coloré',
        'klinker.section.range.item4': 'Formulations spécifiques (selon les besoins du client)',
        'klinker.section.range.item5': 'Options de vente en gros et au détail',
        'klinker.section.quality.title': 'Normes de qualité',
        'klinker.section.quality.item1': 'Conformité totale aux normes TS EN 197-1',
        'klinker.section.quality.item2': 'Certification ISO 9001 de management de la qualité',
        'klinker.section.quality.item3': 'Tests en laboratoire réguliers et contrôle qualité',
        'klinker.section.quality.item4': 'Certifications internationales et documents de conformité',
        'klinker.section.quality.item5': 'Amélioration continue et développement',
        'klinker.section.services.title': 'Nos services',
        'klinker.section.services.item1': 'Conseil technique et aide au choix des produits',
        'klinker.section.services.item2': 'Analyse d’échantillons et rapports de tests',
        'klinker.section.services.item3': 'Livraison rapide et sécurisée',
        'klinker.section.services.item4': 'Tarification compétitive et avantages pour commandes en volume',
        'klinker.section.services.item5': 'Support client 24/7',
        'klinker.section.experience.title': 'Notre expérience à l’export',
        'klinker.section.experience.desc': 'Grâce à notre longue expérience en exportation de clinker, nous avons réalisé des livraisons réussies dans de nombreux pays. Grâce à notre équipe expérimentée et à notre réseau logistique solide, nous garantissons des livraisons ponctuelles et complètes.',
        'pet.hero.title': 'Exportation de <span>bouteilles PET</span>',
        'pet.hero.subtitle': 'Nous servons les marchés mondiaux avec des solutions de bouteilles PET écologiques et de haute qualité.',
        'pet.section.title': 'Nos services de bouteilles PET',
        'pet.section.intro': 'Grâce à des technologies de production modernes, nous fabriquons et exportons des bouteilles PET de haute qualité pour l’industrie agroalimentaire. Avec notre approche écoresponsable et nos standards de qualité, nous sommes un acteur de référence.',
        'pet.section.range.title': 'Notre gamme de produits',
        'pet.section.range.item1': 'Bouteilles d’eau (0,5 L - 5 L et volumes spécifiques)',
        'pet.section.range.item2': 'Bouteilles de boissons gazeuses',
        'pet.section.range.item3': 'Bouteilles pour lait et produits laitiers',
        'pet.section.range.item4': 'Bouteilles d’huile (anti-fuite)',
        'pet.section.range.item5': 'Bouteilles sur mesure (selon l’identité de marque)',
        'pet.section.range.item6': 'Production de préformes',
        'pet.section.features.title': 'Caractéristiques techniques',
        'pet.section.features.item1': 'PET de qualité alimentaire',
        'pet.section.features.item2': 'Haute résistance et robustesse',
        'pet.section.features.item3': 'Structure légère, coûts de transport réduits',
        'pet.section.features.item4': 'Matériau 100 % recyclable',
        'pet.section.features.item5': 'Options avec protection UV et variété de couleurs',
        'pet.section.features.item6': 'Conformité aux normes FDA et UE',
        'pet.section.services.title': 'Nos services',
        'pet.section.services.item1': 'Conception et production de moules sur mesure',
        'pet.section.services.item2': 'Services d’impression de logos et d’étiquettes',
        'pet.section.services.item3': 'Vente en gros et approvisionnement continu',
        'pet.section.services.item4': 'Production rapide et livraison ponctuelle',
        'pet.section.services.item5': 'Support technique et contrôle qualité',
        'pet.section.services.item6': 'Solutions d’emballage sur mesure',
        'pet.section.sustainability.title': 'Engagement environnemental',
        'pet.section.sustainability.desc': 'Nous appliquons des processus de production écoresponsables dans une démarche durable. Nous contribuons à la protection de l’environnement grâce à l’efficacité énergétique, la gestion des déchets et des programmes de recyclage. Dans le cadre de la réduction de l’empreinte carbone, nous privilégions les énergies renouvelables.',
        'pet.section.export.title': 'Exportation mondiale',
        'pet.section.export.desc': 'Avec nos produits de qualité et notre service fiable, nous réalisons des exportations réussies vers de nombreux pays. Notre équipe export gère avec professionnalisme la logistique et les procédures douanières.',
        'academy.hero.title': 'Académie <span>Articles</span>',
        'academy.hero.subtitle': 'Les notes d\'expertise, partages de stratégie et expériences terrain de Feza Bey sont ici.',
        'academy.section.label': 'Articles',
        'academy.section.title': 'Derniers articles',
        'academy.empty': 'Aucun article de l\'académie n\'a encore été publié.',
        'contact.label': 'Contact',
        'contact.title': 'Contactez-nous',
        'contact.intro': 'Vous pouvez nous contacter pour vos projets et opportunités de collaboration.',
        'contact.email.label': 'E-mail',
        'contact.phone.label': 'Téléphone',
        'contact.form.name': 'Nom complet',
        'contact.form.namePlaceholder': 'Votre nom et prénom',
        'contact.form.email': 'E-mail',
        'contact.form.emailPlaceholder': 'exemple@email.com',
        'contact.form.message': 'Votre message',
        'contact.form.messagePlaceholder': 'Écrivez votre message ici...',
        'contact.form.submit': 'Envoyer',
        'contact.form.sending': 'Envoi en cours...',
        'contact.form.success': 'Votre message a été envoyé avec succès ! Nous vous répondrons bientôt.',
        'contact.form.error': 'Une erreur s\'est produite lors de l\'envoi de votre message. Veuillez réessayer.'
    }
};

const getStoredLanguage = () => {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return SUPPORTED_LANGUAGES.includes(stored) ? stored : '';
};

const getCurrentLanguage = () => getStoredLanguage() || document.documentElement.lang || DEFAULT_LANGUAGE;

const getBrowserLanguage = () => {
    const language = navigator.language || navigator.userLanguage || '';
    if (language.toLowerCase().startsWith('fr')) return 'fr';
    if (language.toLowerCase().startsWith('tr')) return 'tr';
    if (language.toLowerCase().startsWith('en')) return 'en';
    return '';
};

const getCountryLanguage = (countryCode) => {
    if (!countryCode) return '';
    if (countryCode === 'TR') return 'tr';
    if (countryCode === 'FR') return 'fr';
    return 'en';
};

const fetchCountryLanguage = async () => {
    try {
        const response = await fetch('https://ipapi.co/country/');
        if (!response.ok) return '';
        const countryCode = (await response.text()).trim().toUpperCase();
        return getCountryLanguage(countryCode);
    } catch (error) {
        return '';
    }
};

const updateTextTranslations = (lang) => {
    const elements = document.querySelectorAll(
        '[data-i18n], [data-i18n-html], [data-i18n-alt], [data-i18n-aria-label], [data-i18n-placeholder]'
    );
    elements.forEach((element) => {
        const key = element.dataset.i18n || element.dataset.i18nHtml;
        if (key) {
            if (!element.dataset.i18nDefault) {
                element.dataset.i18nDefault = element.dataset.i18nHtml ? element.innerHTML : element.textContent;
            }

            const translation = TRANSLATIONS[lang]?.[key];
            if (element.dataset.i18nHtml !== undefined) {
                element.innerHTML = translation || element.dataset.i18nDefault;
            } else {
                element.textContent = translation || element.dataset.i18nDefault;
            }
        }

        if (element.dataset.i18nAlt) {
            if (!element.dataset.i18nAltDefault) {
                element.dataset.i18nAltDefault = element.getAttribute('alt') || '';
            }
            const altTranslation = TRANSLATIONS[lang]?.[element.dataset.i18nAlt];
            element.setAttribute('alt', altTranslation || element.dataset.i18nAltDefault);
        }

        if (element.dataset.i18nAriaLabel) {
            if (!element.dataset.i18nAriaLabelDefault) {
                element.dataset.i18nAriaLabelDefault = element.getAttribute('aria-label') || '';
            }
            const ariaTranslation = TRANSLATIONS[lang]?.[element.dataset.i18nAriaLabel];
            element.setAttribute('aria-label', ariaTranslation || element.dataset.i18nAriaLabelDefault);
        }

        if (element.dataset.i18nPlaceholder) {
            if (!element.dataset.i18nPlaceholderDefault) {
                element.dataset.i18nPlaceholderDefault = element.getAttribute('placeholder') || '';
            }
            const placeholderTranslation = TRANSLATIONS[lang]?.[element.dataset.i18nPlaceholder];
            element.setAttribute('placeholder', placeholderTranslation || element.dataset.i18nPlaceholderDefault);
        }
    });
};

const updateLanguageBlocks = (lang) => {
    const blocks = document.querySelectorAll('.bio-block[data-lang]');
    if (!blocks.length) return;

    blocks.forEach((block) => {
        const isActive = block.dataset.lang === lang;
        block.classList.toggle('is-active', isActive);
        block.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });
};

const updateLanguageButtons = (lang) => {
    const switchers = document.querySelectorAll('[data-language-switcher]');
    switchers.forEach((switcher) => {
        const buttons = Array.from(switcher.querySelectorAll('.language-btn[data-lang]'));
        buttons.forEach((button) => {
            const isActive = button.dataset.lang === lang;
            button.classList.toggle('is-hidden', isActive);
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
    });
};

const setLanguage = (lang, { persist = true } = {}) => {
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
        return;
    }

    if (persist) {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }

    document.documentElement.setAttribute('lang', lang);
    window.fezaLanguage = lang;

    updateLanguageButtons(lang);
    updateTextTranslations(lang);
    updateLanguageBlocks(lang);

    document.dispatchEvent(new CustomEvent(LANGUAGE_EVENT, { detail: { language: lang } }));
};

const initLanguageSwitcher = () => {
    const switchers = document.querySelectorAll('[data-language-switcher]');
    if (!switchers.length) return;

    const buttons = document.querySelectorAll('[data-language-switcher] .language-btn[data-lang]');
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            setLanguage(button.dataset.lang || DEFAULT_LANGUAGE);
        });
    });

    const storedLanguage = getStoredLanguage();
    if (storedLanguage) {
        setLanguage(storedLanguage, { persist: false });
        return;
    }

    const browserLanguage = getBrowserLanguage();
    setLanguage(browserLanguage || DEFAULT_LANGUAGE, { persist: false });

    fetchCountryLanguage().then((countryLanguage) => {
        if (!getStoredLanguage() && !browserLanguage && countryLanguage) {
            setLanguage(countryLanguage);
        }
    });
};

const getLocale = (language) => {
    if (language === 'fr') return 'fr-FR';
    if (language === 'en') return 'en-US';
    return 'tr-TR';
};

window.fezaI18n = {
    LANGUAGE_STORAGE_KEY,
    LANGUAGE_EVENT,
    getCurrentLanguage,
    getLocale
};

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Feza Savaş website loaded successfully!');

    // Smooth scroll için nav linklerine event listener ekle
    initSmoothScroll();

    // Mobile menu toggle (gelecekte eklenebilir)
    initMobileMenu();

    // Site dil seçimi
    initLanguageSwitcher();

    // Contact form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('.contact-submit');
            const formStatus = document.getElementById('formStatus');
            const originalBtnText = submitBtn.innerHTML;

            // Disable button and show loading
            submitBtn.disabled = true;
            const lang = getCurrentLanguage();
            const sendingText = TRANSLATIONS[lang]?.['contact.form.sending'] || 'Gönderiliyor...';
            submitBtn.innerHTML = `<span>${sendingText}</span>`;

            // Get form data
            const formData = new FormData(this);

            try {
                // Submit to FormSubmit
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success
                    formStatus.className = 'form-status success';
                    formStatus.textContent = TRANSLATIONS[lang]?.['contact.form.success'] || 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.';

                    // Reset form
                    this.reset();

                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formStatus.className = 'form-status';
                        formStatus.textContent = '';
                    }, 5000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Error
                formStatus.className = 'form-status error';
                formStatus.textContent = TRANSLATIONS[lang]?.['contact.form.error'] || 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.';

                // Hide error message after 5 seconds
                setTimeout(() => {
                    formStatus.className = 'form-status';
                    formStatus.textContent = '';
                }, 5000);
            } finally {
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
});

// Smooth scroll fonksiyonu
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile menu için hazırlık (gelecekte genişletilebilir)
function initMobileMenu() {
    // Mobile menu butonu eklendiğinde burası aktif olacak
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
}

// Form validasyonu (iletişim formu eklendiğinde kullanılabilir)
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Utility: Scroll to top butonu
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.display = 'none';

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Sayfa yüklendiğinde scroll to top butonunu oluştur
window.addEventListener('load', createScrollToTop);
