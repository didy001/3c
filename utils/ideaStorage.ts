
import { StoredIdea, ClientInput } from '../types';

// Simulation d'une base de données persistante (Memory + LocalStorage en théorie)
let MEMORY_VAULT: StoredIdea[] = [
  {
    id: 'IDEA-001',
    timestamp: new Date('2023-10-25'),
    sector: 'PHYSICAL',
    niche: 'Élevage Poulets Chair',
    problem: 'Dépendance Grossistes',
    mvp_type: 'Vente Directe Lot Test',
    origin_profile: 'ENTREPRENEUR',
    status: 'VALIDATED'
  },
  {
    id: 'IDEA-002',
    timestamp: new Date('2023-10-26'),
    sector: 'DIGITAL',
    niche: 'Coaching Excel PME',
    problem: 'Gestion Trésorerie Chaos',
    mvp_type: 'Audit Flash',
    origin_profile: 'EXPERT_TECHNIQUE',
    status: 'GOLD_MINE'
  },
  {
    id: 'IDEA-003',
    timestamp: new Date('2023-10-27'),
    sector: 'SERVICE_B2B',
    niche: 'Copywriting E-commerce',
    problem: 'Faible Conversion',
    mvp_type: 'Fiche Produit Optimisée',
    origin_profile: 'ÉTUDIANT',
    status: 'RAW'
  }
];

export const saveIdeaToVault = (input: ClientInput) => {
  const sector = detectSectorHelper(input.business_context);
  const newIdea: StoredIdea = {
    id: `IDEA-${Date.now().toString().slice(-4)}`,
    timestamp: new Date(),
    sector: sector,
    niche: input.business_context.split(' ').slice(0, 4).join(' '),
    problem: input.frictions[0] || 'Non défini',
    mvp_type: sector === 'DIGITAL' ? 'PDF/Template' : 'Prototype Physique',
    origin_profile: input.profileType,
    status: 'RAW'
  };
  
  MEMORY_VAULT.unshift(newIdea); // Add to top
  return newIdea;
};

export const getVaultIdeas = () => {
  return MEMORY_VAULT;
};

// Helper dupliqué du générateur pour l'autonomie du module
const detectSectorHelper = (context: string): string => {
  const text = context.toLowerCase();
  if (text.includes('ferme') || text.includes('magasin') || text.includes('restaurant') || text.includes('stock')) return 'PHYSICAL';
  if (text.includes('consulting') || text.includes('agence') || text.includes('b2b')) return 'SERVICE_B2B';
  return 'DIGITAL';
};
