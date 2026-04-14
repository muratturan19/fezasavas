# -*- coding: utf-8 -*-
with open('E:\\Mira\\fezasavas\\js\\main.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. EN: nav.kabak
old = "        'nav.pet': 'PET Bottle Export',\n        'footer.copyright.short': '\u00a9 2025 Feza Sava\u015f',"
new = "        'nav.pet': 'PET Bottle Export',\n        'nav.kabak': 'Pumpkin Seeds',\n        'footer.copyright.short': '\u00a9 2025 Feza Sava\u015f',"
content = content.replace(old, new, 1)

# 2. FR: index.projects.kabak  (insert before about.hero.title FR)
old2 = "        'about.hero.title': 'Qui est <span>Feza Sava\u015f\u00a0?</span>',"
new2 = (
    "        'index.projects.kabak.badge': 'Export',\n"
    "        'index.projects.kabak.title': 'Commerce de Graines de Courge',\n"
    "        'index.projects.kabak.desc': 'Graines de courge d\\'origine ukrainienne de haute qualit\u00e9 pour l\\'alimentation et l\\'industrie',\n"
    "        'about.hero.title': 'Qui est <span>Feza Sava\u015f\u00a0?</span>',"
)
content = content.replace(old2, new2, 1)

# 3. FR: kabak.* translations (insert before academy.hero.title FR)
kabak_fr = (
    "        'kabak.hero.title': 'Commerce de <span>Graines de Courge</span>',\n"
    "        'kabak.hero.subtitle': 'Graines de courge d\\'origine ukrainienne de haute qualit\u00e9 \u2014 Le Bon Produit, Le Bon Prix, Approvisionnement Fiable.',\n"
    "        'kabak.img.alt': 'Graines de courge d\\'origine ukrainienne',\n"
    "        'kabak.section.offer.title': 'Notre Offre Claire',\n"
    "        'kabak.section.offer.desc': 'Sur le march\u00e9, il n\\'y a que deux options : des produits bon march\u00e9 mais risqu\u00e9s, ou une offre ch\u00e8re et instable. Nous proposons une troisi\u00e8me option : Haute qualit\u00e9 + prix comp\u00e9titif + livraison fiable.',\n"
    "        'kabak.section.product.title': 'Force du Produit',\n"
    "        'kabak.section.product.item1': 'Origine ukrainienne avec un taux de remplissage \u00e9lev\u00e9',\n"
    "        'kabak.section.product.item2': 'Taille homog\u00e8ne, faible perte',\n"
    "        'kabak.section.product.item3': 'Production biologique disponible',\n"
    "        'kabak.section.product.item4': 'Adapt\u00e9 \u00e0 l\\'alimentaire et \u00e0 l\\'industriel',\n"
    "        'kabak.section.product.desc': 'Ce produit am\u00e9liore la performance en rayon et le rendement de transformation.',\n"
    "        'kabak.section.clients.title': 'Nos Clients',\n"
    "        'kabak.section.clients.item1': 'Transformateurs de fruits secs (volume \u00e9lev\u00e9)',\n"
    "        'kabak.section.clients.item2': 'Marques alimentaires (valeur ajout\u00e9e)',\n"
    "        'kabak.section.clients.item3': 'Producteurs d\\'huile (haut rendement)',\n"
    "        'kabak.section.clients.item4': 'Traders (rotation rapide)',\n"
    "        'kabak.section.clients.desc': 'Le produit ne reste pas en stock, il se vend rapidement dans les bons circuits.',\n"
    "        'kabak.section.supply.title': 'R\u00e9alit\u00e9 d\\'Approvisionnement',\n"
    "        'kabak.section.supply.item1': 'Exp\u00e9dition selon vos besoins (test \u2192 contrat)',\n"
    "        'kabak.section.supply.item2': 'Approvisionnement continu',\n"
    "        'kabak.section.supply.item3': 'Chargement rapide',\n"
    "        'kabak.section.supply.item4': 'Emballage et livraison flexibles',\n"
    "        'kabak.section.supply.desc': 'Nous ne promettons pas pour attendre \u2013 nous livrons.',\n"
    "        'kabak.section.turkey.title': 'Le Meilleur Choix pour la Turquie',\n"
    "        'kabak.section.turkey.item1': 'Avantage g\u00e9ographique \u2192 livraison rapide',\n"
    "        'kabak.section.turkey.item2': 'Co\u00fbts logistiques r\u00e9duits',\n"
    "        'kabak.section.turkey.item3': 'Qualit\u00e9 europ\u00e9enne \u00e0 prix comp\u00e9titif',\n"
    "        'kabak.section.turkey.item4': 'Une des sources les plus optimis\u00e9es pour le march\u00e9 turc.',\n"
    "        'kabak.section.why.title': 'Pourquoi Nous ?',\n"
    "        'kabak.section.why.item1': '\u00c9quilibre r\u00e9el prix/qualit\u00e9',\n"
    "        'kabak.section.why.item2': 'Approvisionnement durable',\n"
    "        'kabak.section.why.item3': 'Communication rapide, offres claires',\n"
    "        'kabak.section.why.item4': 'Un partenaire qui fait gagner du temps et de l\\'argent.',\n"
    "        'kabak.section.conclusion.title': 'Conclusion',\n"
    "        'kabak.section.conclusion.intro': 'Si votre objectif est de :',\n"
    "        'kabak.section.conclusion.item1': 'Acheter de la qualit\u00e9 \u00e0 bon prix',\n"
    "        'kabak.section.conclusion.item2': '\u00c9viter les risques d\\'approvisionnement',\n"
    "        'kabak.section.conclusion.item3': 'Construire un partenariat durable',\n"
    "        'kabak.section.conclusion.desc': '\u2192 Vous \u00eates au bon endroit.',\n"
    "        'kabak.section.contact.title': 'Contact',\n"
    "        'kabak.section.contact.desc': 'Contactez-nous pour un devis rapide et des \u00e9chantillons.',\n"
)
old3 = "        'academy.hero.title': 'Acad\u00e9mie <span>Articles</span>',"
new3 = kabak_fr + old3
content = content.replace(old3, new3, 1)

# 4. AR: nav.kabak
old4 = "        'nav.pet': '\u062a\u0635\u062f\u064a\u0631 \u0632\u062c\u0627\u062c\u0627\u062a PET',\n        'footer.copyright.short': '\u00a9 2025 \u0641\u064a\u0632\u0627 \u0633\u0627\u0641\u0627\u0634',"
new4 = "        'nav.pet': '\u062a\u0635\u062f\u064a\u0631 \u0632\u062c\u0627\u062c\u0627\u062a PET',\n        'nav.kabak': '\u062a\u062c\u0627\u0631\u0629 \u0628\u0630\u0648\u0631 \u0627\u0644\u064a\u0642\u0637\u064a\u0646',\n        'footer.copyright.short': '\u00a9 2025 \u0641\u064a\u0632\u0627 \u0633\u0627\u0641\u0627\u0634',"
content = content.replace(old4, new4, 1)

# 5. AR: index.projects.kabak
old5 = "        'about.hero.title': '\u0645\u0646 \u0647\u0648 <span>\u0641\u064a\u0632\u0627 \u0633\u0627\u0641\u0627\u0634\u061f</span>',"
new5 = (
    "        'index.projects.kabak.badge': '\u062a\u0635\u062f\u064a\u0631',\n"
    "        'index.projects.kabak.title': '\u062a\u062c\u0627\u0631\u0629 \u0628\u0630\u0648\u0631 \u0627\u0644\u064a\u0642\u0637\u064a\u0646',\n"
    "        'index.projects.kabak.desc': '\u0628\u0630\u0648\u0631 \u064a\u0642\u0637\u064a\u0646 \u0623\u0648\u0643\u0631\u0627\u0646\u064a\u0629 \u0627\u0644\u0645\u0646\u0634\u0623 \u0639\u0627\u0644\u064a\u0629 \u0627\u0644\u062c\u0648\u062f\u0629 \u0644\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u063a\u0630\u0627\u0626\u064a \u0648\u0627\u0644\u0635\u0646\u0627\u0639\u064a',\n"
    "        'about.hero.title': '\u0645\u0646 \u0647\u0648 <span>\u0641\u064a\u0632\u0627 \u0633\u0627\u0641\u0627\u0634\u061f</span>',"
)
content = content.replace(old5, new5, 1)

# 6. AR: kabak.* translations
kabak_ar = (
    "        'kabak.hero.title': '\u062a\u062c\u0627\u0631\u0629 <span>\u0628\u0630\u0648\u0631 \u0627\u0644\u064a\u0642\u0637\u064a\u0646</span>',\n"
    "        'kabak.hero.subtitle': '\u0628\u0630\u0648\u0631 \u064a\u0642\u0637\u064a\u0646 \u0623\u0648\u0643\u0631\u0627\u0646\u064a\u0629 \u0627\u0644\u0645\u0646\u0634\u0623 \u0639\u0627\u0644\u064a\u0629 \u0627\u0644\u062c\u0648\u062f\u0629 \u2014 \u0627\u0644\u0645\u0646\u062a\u062c \u0627\u0644\u0635\u062d\u064a\u062d\u060c \u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0635\u062d\u064a\u062d\u060c \u062a\u0648\u0631\u064a\u062f \u0645\u0648\u062b\u0648\u0642.',\n"
    "        'kabak.img.alt': '\u0628\u0630\u0648\u0631 \u064a\u0642\u0637\u064a\u0646 \u0623\u0648\u0643\u0631\u0627\u0646\u064a\u0629 \u0627\u0644\u0645\u0646\u0634\u0623',\n"
    "        'kabak.section.offer.title': '\u0639\u0631\u0636\u0646\u0627 \u0627\u0644\u0648\u0627\u0636\u062d',\n"
    "        'kabak.section.offer.desc': '\u0641\u064a \u0627\u0644\u0633\u0648\u0642 \u062e\u064a\u0627\u0631\u0627\u0646 \u0641\u0642\u0637: \u0645\u0646\u062a\u062c\u0627\u062a \u0631\u062e\u064a\u0635\u0629 \u0644\u0643\u0646 \u0645\u062d\u0641\u0648\u0641\u0629 \u0628\u0627\u0644\u0645\u062e\u0627\u0637\u0631\u060c \u0623\u0648 \u062a\u0648\u0631\u064a\u062f \u0645\u0643\u0644\u0641 \u0648\u063a\u064a\u0631 \u0645\u0633\u062a\u0642\u0631. \u0646\u062d\u0646 \u0646\u0642\u062f\u0645 \u062e\u064a\u0627\u0631\u0627\u064b \u062b\u0627\u0644\u062b\u0627\u064b: \u062c\u0648\u062f\u0629 \u0639\u0627\u0644\u064a\u0629 + \u0633\u0639\u0631 \u062a\u0646\u0627\u0641\u0633\u064a + \u0634\u062d\u0646 \u0645\u0648\u062b\u0648\u0642.',\n"
    "        'kabak.section.product.title': '\u0645\u0632\u0627\u064a\u0627 \u0627\u0644\u0645\u0646\u062a\u062c',\n"
    "        'kabak.section.product.item1': '\u0645\u0646\u0634\u0623 \u0623\u0648\u0643\u0631\u0627\u0646\u064a \u0645\u0639 \u0646\u0633\u0628\u0629 \u0627\u0645\u062a\u0644\u0627\u0621 \u0639\u0627\u0644\u064a\u0629 \u0644\u0644\u062d\u0628\u0629',\n"
    "        'kabak.section.product.item2': '\u062a\u062c\u0627\u0646\u0633 \u0641\u064a \u0627\u0644\u062d\u062c\u0645 \u0648\u0636\u064a\u0627\u0639 \u0645\u0646\u062e\u0641\u0636',\n"
    "        'kabak.section.product.item3': '\u0625\u0646\u062a\u0627\u062c \u0639\u0636\u0648\u064a \u0645\u062a\u0627\u062d',\n"
    "        'kabak.section.product.item4': '\u0645\u0646\u0627\u0633\u0628 \u0644\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u063a\u0630\u0627\u0626\u064a \u0648\u0627\u0644\u0635\u0646\u0627\u0639\u064a',\n"
    "        'kabak.section.product.desc': '\u064a\u062d\u0633\u0651\u0646 \u0647\u0630\u0627 \u0627\u0644\u0645\u0646\u062a\u062c \u0623\u062f\u0627\u0621 \u0627\u0644\u0631\u0641 \u0648\u0643\u0641\u0627\u0621\u0629 \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629 \u0645\u0639\u0627\u064b.',\n"
    "        'kabak.section.clients.title': '\u0645\u0646 \u0646\u0628\u064a\u0639 \u0644\u0647\u0645\u061f',\n"
    "        'kabak.section.clients.item1': '\u0645\u0639\u0627\u0644\u062c\u0648 \u0627\u0644\u0645\u0643\u0633\u0631\u0627\u062a (\u062d\u062c\u0645 \u0645\u0631\u062a\u0641\u0639)',\n"
    "        'kabak.section.clients.item2': '\u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062a \u0627\u0644\u062a\u062c\u0627\u0631\u064a\u0629 \u0644\u0644\u0623\u063a\u0630\u064a\u0629 \u0627\u0644\u0645\u0639\u0628\u0623\u0629 (\u0642\u064a\u0645\u0629 \u0645\u0636\u0627\u0641\u0629)',\n"
    "        'kabak.section.clients.item3': '\u0645\u0646\u062a\u062c\u0648 \u0627\u0644\u0632\u064a\u0648\u062a (\u0645\u0631\u062f\u0648\u062f \u0645\u0631\u062a\u0641\u0639)',\n"
    "        'kabak.section.clients.item4': '\u0634\u0631\u0643\u0627\u062a \u0627\u0644\u062a\u062c\u0627\u0631\u0629 \u0627\u0644\u062e\u0627\u0631\u062c\u064a\u0629 (\u062f\u0648\u0631\u0629 \u0633\u0631\u064a\u0639\u0629)',\n"
    "        'kabak.section.clients.desc': '\u0627\u0644\u0645\u0646\u062a\u062c \u0644\u0627 \u064a\u0628\u0642\u0649 \u0641\u064a \u0627\u0644\u0645\u062e\u0632\u0648\u0646\u060c \u0625\u0646\u0647 \u064a\u062a\u062d\u0631\u0643 \u0628\u0633\u0631\u0639\u0629 \u0641\u064a \u0627\u0644\u0642\u0646\u0648\u0627\u062a \u0627\u0644\u0635\u062d\u064a\u062d\u0629.',\n"
    "        'kabak.section.supply.title': '\u062d\u0642\u064a\u0642\u0629 \u0627\u0644\u062a\u0648\u0631\u064a\u062f',\n"
    "        'kabak.section.supply.item1': '\u0634\u062d\u0646 \u0628\u0627\u0644\u0643\u0645\u064a\u0627\u062a \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 (\u062c\u0631\u0628\u0629 \u2192 \u0639\u0642\u062f)',\n"
    "        'kabak.section.supply.item2': '\u062a\u0648\u0631\u064a\u062f \u0645\u0633\u062a\u0645\u0631 \u0648\u0644\u064a\u0633 \u0635\u0641\u0642\u0629 \u0648\u0627\u062d\u062f\u0629',\n"
    "        'kabak.section.supply.item3': '\u062a\u062d\u0645\u064a\u0644 \u0633\u0631\u064a\u0639',\n"
    "        'kabak.section.supply.item4': '\u062a\u063a\u0644\u064a\u0641 \u0648\u0634\u0631\u0648\u0637 \u062a\u0633\u0644\u064a\u0645 \u0645\u0631\u0646\u0629',\n"
    "        'kabak.section.supply.desc': '\u0644\u0627 \u0646\u0639\u062f \u0648\u0639\u0648\u062f\u0627\u064b \u0648\u0646\u062a\u0623\u062e\u0631 \u2013 \u0646\u062d\u0645\u0651\u0644 \u0648\u0646\u0633\u0644\u0651\u0645.',\n"
    "        'kabak.section.turkey.title': '\u0627\u0644\u062e\u064a\u0627\u0631 \u0627\u0644\u0623\u0630\u0643\u0649 \u0644\u062a\u0631\u0643\u064a\u0627',\n"
    "        'kabak.section.turkey.item1': '\u0645\u064a\u0632\u0629 \u062c\u063a\u0631\u0627\u0641\u064a\u0629 \u2192 \u062a\u0633\u0644\u064a\u0645 \u0633\u0631\u064a\u0639',\n"
    "        'kabak.section.turkey.item2': '\u062a\u0643\u0627\u0644\u064a\u0641 \u0644\u0648\u062c\u0633\u062a\u064a\u0629 \u0645\u0646\u062e\u0641\u0636\u0629',\n"
    "        'kabak.section.turkey.item3': '\u062c\u0648\u062f\u0629 \u0623\u0648\u0631\u0648\u0628\u064a\u0629 \u0628\u0633\u0639\u0631 \u062a\u0646\u0627\u0641\u0633\u064a',\n"
    "        'kabak.section.turkey.item4': '\u0645\u0646 \u0623\u0643\u062b\u0631 \u062e\u064a\u0627\u0631\u0627\u062a \u0627\u0644\u062a\u0648\u0631\u064a\u062f \u062a\u062d\u0633\u064a\u0646\u0627\u064b \u0644\u0644\u0633\u0648\u0642 \u0627\u0644\u062a\u0631\u0643\u064a.',\n"
    "        'kabak.section.why.title': '\u0644\u0645\u0627\u0630\u0627 \u0646\u062d\u0646\u061f',\n"
    "        'kabak.section.why.item1': '\u062a\u0648\u0627\u0632\u0646 \u062d\u0642\u064a\u0642\u064a \u0628\u064a\u0646 \u0627\u0644\u0633\u0639\u0631 \u0648\u0627\u0644\u062c\u0648\u062f\u0629',\n"
    "        'kabak.section.why.item2': '\u062a\u0648\u0631\u064a\u062f \u0645\u0633\u062a\u062f\u0627\u0645',\n"
    "        'kabak.section.why.item3': '\u062a\u0648\u0627\u0635\u0644 \u0633\u0631\u064a\u0639 \u0648\u0639\u0631\u0648\u0636 \u0648\u0627\u0636\u062d\u0629',\n"
    "        'kabak.section.why.item4': '\u0634\u0631\u064a\u0643 \u064a\u064f\u0646\u062c\u0632 \u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0644\u0627 \u064a\u064f\u0636\u064a\u0651\u0639 \u0627\u0644\u0648\u0642\u062a.',\n"
    "        'kabak.section.conclusion.title': '\u0627\u0644\u062e\u0644\u0627\u0635\u0629',\n"
    "        'kabak.section.conclusion.intro': '\u0625\u0630\u0627 \u0643\u0627\u0646\u062a \u0647\u0630\u0647 \u0623\u0647\u062f\u0627\u0641\u0643:',\n"
    "        'kabak.section.conclusion.item1': '\u0634\u0631\u0627\u0621 \u062c\u0648\u062f\u0629 \u0628\u0623\u0633\u0639\u0627\u0631 \u062a\u0646\u0627\u0641\u0633\u064a\u0629',\n"
    "        'kabak.section.conclusion.item2': '\u062a\u062c\u0646\u0628 \u0645\u062e\u0627\u0637\u0631 \u0627\u0644\u062a\u0648\u0631\u064a\u062f',\n"
    "        'kabak.section.conclusion.item3': '\u0628\u0646\u0627\u0621 \u0634\u0631\u0627\u0643\u0627\u062a \u0637\u0648\u064a\u0644\u0629 \u0627\u0644\u0623\u0645\u062f',\n"
    "        'kabak.section.conclusion.desc': '\u2192 \u0623\u0646\u062a \u0641\u064a \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0635\u062d\u064a\u062d.',\n"
    "        'kabak.section.contact.title': '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627',\n"
    "        'kabak.section.contact.desc': '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u0644\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u0639\u0631\u0636 \u0633\u0631\u064a\u0639 \u0648\u0639\u064a\u0646\u0627\u062a.',\n"
)
old6 = "        'academy.hero.title': '\u0627\u0644\u0623\u0643\u0627\u062f\u064a\u0645\u064a\u0629 <span>\u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062a</span>',"
new6 = kabak_ar + old6
content = content.replace(old6, new6, 1)

# 7. ES: nav.kabak
old7 = "        'nav.pet': 'Exportaci\u00f3n de Botellas PET',\n        'footer.copyright.short': '\u00a9 2025 Feza Sava\u015f',"
new7 = "        'nav.pet': 'Exportaci\u00f3n de Botellas PET',\n        'nav.kabak': 'Semillas de Calabaza',\n        'footer.copyright.short': '\u00a9 2025 Feza Sava\u015f',"
content = content.replace(old7, new7, 1)

# 8. ES: index.projects.kabak
old8 = "        'about.hero.title': '\u00bfQui\u00e9n es <span>Feza Sava\u015f?</span>',"
new8 = (
    "        'index.projects.kabak.badge': 'Exportaci\u00f3n',\n"
    "        'index.projects.kabak.title': 'Comercio de Semillas de Calabaza',\n"
    "        'index.projects.kabak.desc': 'Semillas de calabaza de origen ucraniano de alta calidad para uso alimentario e industrial',\n"
    "        'about.hero.title': '\u00bfQui\u00e9n es <span>Feza Sava\u015f?</span>',"
)
content = content.replace(old8, new8, 1)

# 9. ES: kabak.* translations
kabak_es = (
    "        'kabak.hero.title': 'Comercio de <span>Semillas de Calabaza</span>',\n"
    "        'kabak.hero.subtitle': 'Semillas de calabaza de origen ucraniano de alta calidad \u2014 El Producto Correcto, El Precio Correcto, Suministro Fiable.',\n"
    "        'kabak.img.alt': 'Semillas de calabaza de origen ucraniano',\n"
    "        'kabak.section.offer.title': 'Nuestra Oferta Clara',\n"
    "        'kabak.section.offer.desc': 'En el mercado solo hay dos opciones: productos baratos pero arriesgados, o suministro caro e inestable. Ofrecemos una tercera opci\u00f3n: Alta calidad + precio competitivo + env\u00edo confiable.',\n"
    "        'kabak.section.product.title': 'Fortaleza del Producto',\n"
    "        'kabak.section.product.item1': 'Origen ucraniano con alta tasa de relleno de grano',\n"
    "        'kabak.section.product.item2': 'Tama\u00f1o homog\u00e9neo, bajo desperdicio',\n"
    "        'kabak.section.product.item3': 'Producci\u00f3n org\u00e1nica disponible',\n"
    "        'kabak.section.product.item4': 'Adecuado para uso alimentario e industrial',\n"
    "        'kabak.section.product.desc': 'Este producto mejora tanto el rendimiento en estanter\u00eda como la eficiencia de procesamiento.',\n"
    "        'kabak.section.clients.title': '\u00bfA Qui\u00e9n Vendemos?',\n"
    "        'kabak.section.clients.item1': 'Procesadores de frutos secos (alto volumen)',\n"
    "        'kabak.section.clients.item2': 'Marcas de alimentos envasados (valor a\u00f1adido)',\n"
    "        'kabak.section.clients.item3': 'Productores de aceite (alto rendimiento)',\n"
    "        'kabak.section.clients.item4': 'Empresas de comercio exterior (rotaci\u00f3n r\u00e1pida)',\n"
    "        'kabak.section.clients.desc': 'Nuestro producto no queda en stock; se mueve r\u00e1pido en los canales correctos.',\n"
    "        'kabak.section.supply.title': 'Realidad del Suministro',\n"
    "        'kabak.section.supply.item1': 'Env\u00edo en cantidades requeridas (prueba \u2192 contrato)',\n"
    "        'kabak.section.supply.item2': 'Suministro continuo, no operaciones \u00fanicas',\n"
    "        'kabak.section.supply.item3': 'Carga r\u00e1pida',\n"
    "        'kabak.section.supply.item4': 'Embalaje y condiciones de entrega flexibles',\n"
    "        'kabak.section.supply.desc': 'No prometemos y esperamos \u2013 cargamos y entregamos.',\n"
    "        'kabak.section.turkey.title': 'La Opci\u00f3n m\u00e1s Inteligente para T\u00fcrkiye',\n"
    "        'kabak.section.turkey.item1': 'Ventaja geogr\u00e1fica \u2192 entrega r\u00e1pida',\n"
    "        'kabak.section.turkey.item2': 'Menor costo log\u00edstico',\n"
    "        'kabak.section.turkey.item3': 'Calidad europea con precios competitivos',\n"
    "        'kabak.section.turkey.item4': 'Una de las opciones de abastecimiento m\u00e1s optimizadas para el mercado turco.',\n"
    "        'kabak.section.why.title': '\u00bfPor Qu\u00e9 Nosotros?',\n"
    "        'kabak.section.why.item1': 'Equilibrio real precio/calidad',\n"
    "        'kabak.section.why.item2': 'Suministro sostenible',\n"
    "        'kabak.section.why.item3': 'Comunicaci\u00f3n r\u00e1pida, ofertas claras',\n"
    "        'kabak.section.why.item4': 'No un perdedor de tiempo \u2013 un habilitador de negocios.',\n"
    "        'kabak.section.conclusion.title': 'Conclusi\u00f3n',\n"
    "        'kabak.section.conclusion.intro': 'Si sus objetivos son:',\n"
    "        'kabak.section.conclusion.item1': 'Comprar calidad a precios competitivos',\n"
    "        'kabak.section.conclusion.item2': 'Evitar riesgo de suministro',\n"
    "        'kabak.section.conclusion.item3': 'Construir asociaciones a largo plazo',\n"
    "        'kabak.section.conclusion.desc': '\u2192 Est\u00e1 en el lugar correcto.',\n"
    "        'kabak.section.contact.title': 'Contacto',\n"
    "        'kabak.section.contact.desc': 'Cont\u00e1ctenos para cotizaci\u00f3n r\u00e1pida y muestras.',\n"
)
old9 = "        'academy.hero.title': 'Academia <span>Art\u00edculos</span>',"
new9 = kabak_es + old9
content = content.replace(old9, new9, 1)

with open('E:\\Mira\\fezasavas\\js\\main.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done.')
with open('E:\\Mira\\fezasavas\\js\\main.js', 'r', encoding='utf-8') as f:
    c2 = f.read()
for key in ["'nav.kabak'", "'kabak.hero.title'", "'index.projects.kabak.badge'"]:
    count = c2.count(key)
    print(f'{key}: {count} occurrences')
