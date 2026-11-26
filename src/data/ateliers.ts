// Contenu du site SERVALIA — modifiez ici les textes, prestations et images.
export type AtelierId = 'mecanique' | 'metallique';

export interface Prestation {
  court: string; // nom court affiché verticalement sur le panneau fermé
  titre: string;
  resume: string; // ligne sous le titre, sur la photo
  phrase: string; // phrase d'accroche du détail
  texte: string;
  points: { icon: string; label: string }[];
  reperes: { label: string; valeur: string }[];
  image: string;
  position: string; // cadrage de la photo (object-position)
}

export interface Atelier {
  id: AtelierId;
  nom: string;
  court: string;
  couleur: string;
  surCouleur: string;
  image: string;
  image2: string;
  titreLignes: string[];
  accroche: string;
  choixTexte: string;
  seoTitle: string;
  seoDescription: string;
  prestationsTitre: string;
  prestationsIntro: string;
  prestations: Prestation[];
}

const M = '/img/atelier-mecanique.webp';
const T = '/img/atelier-metallique.webp';
const I = (n: string) => `/img/${n}.webp`;

export const ateliers: Record<AtelierId, Atelier> = {
  mecanique: {
    id: 'mecanique',
    nom: 'Atelier Mécanique',
    court: 'Mécanique',
    couleur: '#d7261e',
    surCouleur: '#ffffff',
    image: M,
    image2: T,
    titreLignes: ['Diagnostiquer.', 'Réparer.', 'Relancer.'],
    accroche:
      'Maintenance industrielle, systèmes automatisés, électromécanique et usinage de précision, depuis notre atelier de Casablanca ou sur votre site.',
    choixTexte: 'Maintenance, électromécanique, automatismes et usinage de précision.',
    seoTitle: 'Atelier Mécanique — Maintenance industrielle à Casablanca | SERVALIA',
    seoDescription:
      'Maintenance industrielle, électromécanique, automatismes, installations électriques et usinage de précision à Casablanca.',
    prestationsTitre: 'Six métiers, et une seule équipe qui vient sur site.',
    prestationsIntro: 'Du capteur à la pièce usinée. Ouvrez un métier pour voir ce que nous prenons en charge.',
    prestations: [
      { court: 'Maintenance', titre: 'Maintenance industrielle', resume: 'Préventif · Curatif · Suivi',
        phrase: 'Des équipements qui tiennent la cadence, visite après visite.',
        texte: 'Nous construisons avec vous un plan de maintenance adapté à vos lignes et nous intervenons en curatif quand une machine s\'arrête.',
        points: [{ icon: 'cal', label: 'Plans préventifs' }, { icon: 'tool', label: 'Dépannage curatif' }, { icon: 'doc', label: 'Rapport après chaque visite' }, { icon: 'box', label: 'Gestion des pièces de rechange' }],
        reperes: [{ label: 'Intervention', valeur: 'Sur votre site' }, { label: 'Formule', valeur: 'Ponctuelle ou contrat' }, { label: 'Interlocuteur', valeur: 'Un technicien référent' }],
        image: I('mec-equipe'), position: '50% 40%' },
      { court: 'Automatismes', titre: 'Systèmes automatisés', resume: 'Automates · Capteurs · Armoires',
        phrase: 'Des automatismes qui redémarrent, et qui restent compréhensibles.',
        texte: 'Diagnostic, programmation et mise à niveau de vos automates, capteurs et armoires de commande, avec une documentation à jour.',
        points: [{ icon: 'chip', label: 'Automates programmables' }, { icon: 'eye', label: 'Capteurs et détection' }, { icon: 'grid', label: 'Armoires de commande' }, { icon: 'doc', label: 'Schémas mis à jour' }],
        reperes: [{ label: 'Diagnostic', valeur: 'Sur site' }, { label: 'Travaux', valeur: 'Réparation ou rétrofit' }, { label: 'Livrable', valeur: 'Dossier technique' }],
        image: I('mec-armoire'), position: '50% 40%' },
      { court: 'Électromécanique', titre: 'Électromécanique', resume: 'Moteurs · Pompes · Réducteurs',
        phrase: 'Moteurs, pompes, convoyeurs : remis en état ou remplacés.',
        texte: 'Dépannage, révision et remplacement de vos organes électromécaniques, avec essais avant remise en service.',
        points: [{ icon: 'motor', label: 'Moteurs électriques' }, { icon: 'drop', label: 'Pompes et circuits' }, { icon: 'gear', label: 'Réducteurs et transmissions' }, { icon: 'check', label: 'Essais avant remise en service' }],
        reperes: [{ label: 'Intervention', valeur: 'Atelier ou site' }, { label: 'Travaux', valeur: 'Révision, remplacement' }, { label: 'Contrôle', valeur: 'Essais de fonctionnement' }],
        image: I('mec-pompe'), position: '50% 50%' },
      { court: 'Usinage', titre: 'Usinage de précision', resume: 'Tournage · Fraisage · Sur plan',
        phrase: 'La pièce qui manque, refaite à la cote.',
        texte: 'Tournage et fraisage de pièces sur plan ou d\'après une pièce d\'origine, à l\'unité ou en petite série.',
        points: [{ icon: 'lathe', label: 'Tournage' }, { icon: 'gear', label: 'Fraisage' }, { icon: 'doc', label: 'Sur plan ou sur modèle' }, { icon: 'box', label: 'Unité ou petite série' }],
        reperes: [{ label: 'Lieu', valeur: 'Notre atelier' }, { label: 'Départ', valeur: 'Plan ou pièce d\'origine' }, { label: 'Série', valeur: 'Unité à petite série' }],
        image: I('mec-vanne'), position: '50% 50%' },
      { court: 'Électricité', titre: 'Installations électriques', resume: 'Étude · Réalisation',
        phrase: 'De l\'étude au raccordement, une installation pensée pour durer.',
        texte: 'Études et réalisation d\'installations électriques et automatisées industrielles, neuves ou en extension.',
        points: [{ icon: 'doc', label: 'Études et dimensionnement' }, { icon: 'bolt', label: 'Tableaux et distribution' }, { icon: 'grid', label: 'Câblage industriel' }, { icon: 'check', label: 'Mise en service' }],
        reperes: [{ label: 'Projet', valeur: 'Neuf ou extension' }, { label: 'Étapes', valeur: 'Étude puis réalisation' }, { label: 'Fin', valeur: 'Mise en service' }],
        image: M, position: '72% 35%' },
      { court: 'GPL & fluides', titre: 'Installations GPL & fluides', resume: 'Pompage · Robinetterie · Contrôle',
        phrase: 'Des installations de stockage suivies de près.',
        texte: 'Entretien des skids de pompage, de la robinetterie et contrôle des installations de stockage et de distribution.',
        points: [{ icon: 'tank', label: 'Stockage' }, { icon: 'drop', label: 'Skids de pompage' }, { icon: 'tool', label: 'Robinetterie' }, { icon: 'eye', label: 'Contrôles réguliers' }],
        reperes: [{ label: 'Intervention', valeur: 'Sur site' }, { label: 'Équipements', valeur: 'Stockage et distribution' }, { label: 'Suivi', valeur: 'Rapport de contrôle' }],
        image: I('met-cuves'), position: '50% 50%' },
    ],
  },
  metallique: {
    id: 'metallique',
    nom: 'Atelier Métallique',
    court: 'Métallique',
    couleur: '#e8930c',
    surCouleur: '#141516',
    image: T,
    image2: M,
    titreLignes: ['Découper.', 'Souder.', 'Assembler.'],
    accroche:
      'Charpente, chaudronnerie, tuyauterie industrielle et soudure : nous concevons, fabriquons et posons vos ouvrages métalliques sur mesure.',
    choixTexte: 'Charpente, chaudronnerie, tuyauterie et soudure sur mesure.',
    seoTitle: 'Atelier Métallique — Charpente, chaudronnerie, tuyauterie | SERVALIA',
    seoDescription:
      'Charpente métallique, chaudronnerie, tuyauterie industrielle, soudure et passerelles sur mesure à Casablanca.',
    prestationsTitre: 'Six ouvrages, fabriqués chez nous et posés chez vous.',
    prestationsIntro: 'De la note de calcul à la pose. Ouvrez un métier pour voir ce que nous prenons en charge.',
    prestations: [
      { court: 'Charpente', titre: 'Charpente & structures', resume: 'Bâtiments · Mezzanines · Auvents',
        phrase: 'Des ossatures dessinées pour votre site, pas pour un catalogue.',
        texte: 'Bâtiments métalliques, mezzanines, auvents et ossatures porteuses, de l\'étude à la pose.',
        points: [{ icon: 'beam', label: 'Ossatures porteuses' }, { icon: 'build', label: 'Bâtiments métalliques' }, { icon: 'grid', label: 'Mezzanines' }, { icon: 'doc', label: 'Plans d\'exécution' }],
        reperes: [{ label: 'Fabrication', valeur: 'Notre atelier' }, { label: 'Pose', valeur: 'Sur votre site' }, { label: 'Départ', valeur: 'Étude et plans' }],
        image: T, position: '80% 40%' },
      { court: 'Chaudronnerie', titre: 'Chaudronnerie industrielle', resume: 'Cuves · Trémies · Tôlerie',
        phrase: 'Cuves, trémies et capotages à vos dimensions.',
        texte: 'Pièces de chaudronnerie et de tôlerie en acier ou en inox, fabriquées sur plan.',
        points: [{ icon: 'tank', label: 'Cuves et réservoirs' }, { icon: 'box', label: 'Trémies et capotages' }, { icon: 'grid', label: 'Tôlerie' }, { icon: 'check', label: 'Acier ou inox' }],
        reperes: [{ label: 'Matière', valeur: 'Acier, inox' }, { label: 'Fabrication', valeur: 'Sur plan' }, { label: 'Pose', valeur: 'Sur demande' }],
        image: I('met-cuves'), position: '40% 50%' },
      { court: 'Tuyauterie', titre: 'Tuyauterie industrielle', resume: 'Fluides · GPL · Supports',
        phrase: 'Des réseaux de fluides propres, supportés et éprouvés.',
        texte: 'Réseaux de fluides et lignes GPL : fabrication, supports, raccordements et épreuves.',
        points: [{ icon: 'pipe', label: 'Réseaux de fluides' }, { icon: 'drop', label: 'Lignes GPL' }, { icon: 'beam', label: 'Supports et racks' }, { icon: 'check', label: 'Épreuves' }],
        reperes: [{ label: 'Travaux', valeur: 'Neuf ou modification' }, { label: 'Lieu', valeur: 'Atelier et site' }, { label: 'Fin', valeur: 'Épreuve du réseau' }],
        image: I('met-tuyauterie'), position: '50% 50%' },
      { court: 'Soudure', titre: 'Soudure', resume: 'TIG · MIG/MAG · Arc',
        phrase: 'Le bon procédé pour chaque assemblage.',
        texte: 'Soudage TIG, MIG/MAG et à l\'arc, en atelier comme sur site, pour la fabrication et la réparation.',
        points: [{ icon: 'weld', label: 'TIG' }, { icon: 'weld', label: 'MIG/MAG' }, { icon: 'bolt', label: 'Arc' }, { icon: 'site', label: 'Atelier ou site' }],
        reperes: [{ label: 'Lieu', valeur: 'Atelier ou site' }, { label: 'Usage', valeur: 'Fabrication, réparation' }, { label: 'Matière', valeur: 'Acier, inox' }],
        image: I('met-manometre'), position: '50% 50%' },
      { court: 'Passerelles', titre: 'Passerelles & garde-corps', resume: 'Accès · Escaliers · Sécurité',
        phrase: 'Accéder aux équipements, en sécurité.',
        texte: 'Passerelles d\'accès, escaliers, échelles et garde-corps pour vos installations.',
        points: [{ icon: 'grid', label: 'Passerelles d\'accès' }, { icon: 'stairs', label: 'Escaliers et échelles' }, { icon: 'shield', label: 'Garde-corps' }, { icon: 'doc', label: 'Sur mesure' }],
        reperes: [{ label: 'Fabrication', valeur: 'Notre atelier' }, { label: 'Pose', valeur: 'Sur votre site' }, { label: 'Objectif', valeur: 'Accès sécurisé' }],
        image: I('met-controle'), position: '50% 50%' },
      { court: 'Réparation', titre: 'Réparation & renforcement', resume: 'Reprise · Renfort · Remplacement',
        phrase: 'Remettre d\'aplomb ce qui existe déjà.',
        texte: 'Reprise d\'ouvrages existants, renforts et remplacement d\'éléments corrodés ou endommagés.',
        points: [{ icon: 'eye', label: 'Diagnostic de l\'ouvrage' }, { icon: 'beam', label: 'Renforts' }, { icon: 'tool', label: 'Remplacement d\'éléments' }, { icon: 'shield', label: 'Traitement anticorrosion' }],
        reperes: [{ label: 'Départ', valeur: 'Visite sur site' }, { label: 'Travaux', valeur: 'Reprise, renfort' }, { label: 'Lieu', valeur: 'Sur votre site' }],
        image: I('mec-vanne'), position: '50% 50%' },
    ],
  },
};

export const etapes = [
  { phase: 'Demande', titre: 'Appel ou message', texte: 'Vous décrivez la panne ou le projet.' },
  { phase: 'Demande', titre: 'Diagnostic', texte: 'Visite sur site, relevés et analyse.' },
  { phase: 'Étude', titre: 'Devis', texte: 'Solution chiffrée et délais clairs.' },
  { phase: 'Étude', titre: 'Validation', texte: 'Plan d\'intervention validé avec vous.' },
  { phase: 'Travaux', titre: 'Fabrication', texte: 'En atelier quand il le faut.' },
  { phase: 'Travaux', titre: 'Intervention', texte: 'Nos techniciens sur votre site.' },
  { phase: 'Suivi', titre: 'Essais', texte: 'Contrôle avant remise en service.' },
  { phase: 'Suivi', titre: 'Rapport', texte: 'Compte rendu et suivi dans la durée.' },
];

// Exemple de journée type (illustratif) — à ajuster avec le client
export const journee = [
  { heure: '07:30', titre: 'Briefing sécurité', texte: 'L\'équipe passe en revue les interventions du jour et les consignes de chaque site.', image: I('mec-equipe'), position: '50% 30%' },
  { heure: '09:00', titre: 'Départ sur site', texte: 'Les techniciens partent avec l\'outillage et les pièces préparées la veille.', image: I('met-cuves'), position: '60% 50%' },
  { heure: '11:30', titre: 'Contrôle des installations', texte: 'Mesures, relevés et vérifications sur les équipements du client.', image: I('met-manometre'), position: '50% 50%' },
  { heure: '14:00', titre: 'Atelier', texte: 'Usinage, fabrication et préparation des pièces pour les prochaines interventions.', image: I('mec-pompe'), position: '50% 50%' },
  { heure: '17:00', titre: 'Rapports', texte: 'Chaque intervention se termine par un compte rendu envoyé au client.', image: I('mec-armoire'), position: '50% 50%' },
];

export const faq = [
  { q: 'Intervenez-vous en dehors de Casablanca ?', r: 'Notre atelier est à Casablanca. Pour une intervention ailleurs au Maroc, décrivez-nous votre besoin et nous vous indiquons les conditions de déplacement.' },
  { q: 'Pouvez-vous intervenir en urgence ?', r: 'Oui, signalez l\'urgence dans votre demande : nous organisons le diagnostic dès que possible selon la disponibilité des équipes.' },
  { q: 'Travaillez-vous sur plan ou d\'après une pièce existante ?', r: 'Les deux. Nous fabriquons d\'après vos plans, ou nous relevons les cotes d\'une pièce d\'origine.' },
  { q: 'Proposez-vous des contrats de maintenance ?', r: 'Oui, nous établissons des plans de maintenance préventive adaptés à vos équipements et à votre rythme de production.' },
  { q: 'Comment se passe le devis ?', r: 'Après le diagnostic, vous recevez une solution chiffrée avec les délais. Les travaux démarrent après votre validation.' },
];

export const secteurs = ['Énergie & GPL', 'Agroalimentaire', 'Industrie', 'Logistique', 'Bâtiment industriel', 'Ports & stockage'];

export const entreprise = {
  nom: 'SERVALIA',
  forme: 'SARL à associé unique',
  creation: '2018',
  capital: '500 000 MAD',
  adresse: 'LT Panorama Al Azhar, Casablanca',
  // À compléter avec le client :
  telephone: '',
  email: '',
};
