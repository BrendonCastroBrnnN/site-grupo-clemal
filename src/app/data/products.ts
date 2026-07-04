export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  sku: string;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isPromo?: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  productCount: number;
  description: string;
}

export const categories: Category[] = [
  {
    id: 1,
    name: "EPI - Equipamentos de Proteção Individual",
    slug: "epi",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop&auto=format",
    productCount: 48,
    description: "Capas e bolsas para EPIs com resistência e durabilidade",
  },
  {
    id: 2,
    name: "Bolsas, Mochilas e Pochetes",
    slug: "bolsas-mochilas",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&auto=format",
    productCount: 62,
    description: "Bolsas profissionais para trabalhadores de campo",
  },
  {
    id: 3,
    name: "Malotes",
    slug: "malotes",
    image: "https://images.unsplash.com/photo-1590664216379-9af6f139e66e?w=400&h=300&fit=crop&auto=format",
    productCount: 24,
    description: "Malotes seguros para transporte de documentos e valores",
  },
  {
    id: 4,
    name: "Capas para Coletor de Dados",
    slug: "capas-coletor",
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=400&h=300&fit=crop&auto=format",
    productCount: 35,
    description: "Proteção completa para coletores de dados industriais",
  },
  {
    id: 5,
    name: "Capas para Impressoras Portáteis",
    slug: "capas-impressoras",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=300&fit=crop&auto=format",
    productCount: 18,
    description: "Capas protetoras para impressoras portáteis Zebra, Bixolon e outras",
  },
  {
    id: 6,
    name: "Capas para Tablet e Máquina de Cartão",
    slug: "capas-tablet",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop&auto=format",
    productCount: 29,
    description: "Proteção para tablets e maquininhas em campo",
  },
  {
    id: 7,
    name: "Bainhas para Ferramentas",
    slug: "bainhas-ferramentas",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&h=300&fit=crop&auto=format",
    productCount: 41,
    description: "Bainhas em couro e nylon para ferramentas profissionais",
  },
  {
    id: 8,
    name: "Bonés e Chapéus",
    slug: "bones-chapeus",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=300&fit=crop&auto=format",
    productCount: 15,
    description: "Bonés e chapéus personalizados para sua equipe",
  },
  {
    id: 9,
    name: "Projetos Personalizados",
    slug: "projetos-personalizados",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&auto=format",
    productCount: 0,
    description: "Desenvolvemos produtos sob medida para sua empresa",
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Capa Protetora para Coletor de Dados Zebra TC52/TC57",
    slug: "capa-coletor-zebra-tc52",
    category: "Capas para Coletor de Dados",
    categorySlug: "capas-coletor",
    price: 89.90,
    originalPrice: 119.90,
    discount: 25,
    images: [
      "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1601524909162-ae8725290836?w=600&h=600&fit=crop&auto=format",
    ],
    rating: 4.9,
    reviewCount: 124,
    description: "Capa protetora de alta durabilidade em nylon balístico 1000D para coletores de dados Zebra TC52/TC57. Proteção completa contra impactos, umidade e poeira.",
    features: ["Nylon balístico 1000D", "Proteção IP54", "Alça de ombro inclusa", "Acesso fácil à câmera", "Garantia de 12 meses"],
    sku: "CC-ZB-TC52-001",
    inStock: true,
    isPromo: true,
    isBestSeller: true,
    isFeatured: true,
  },
  {
    id: 2,
    name: "Bolsa Profissional para Técnico de Campo - Grande",
    slug: "bolsa-tecnico-campo-grande",
    category: "Bolsas, Mochilas e Pochetes",
    categorySlug: "bolsas-mochilas",
    price: 189.90,
    originalPrice: 229.90,
    discount: 17,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop&auto=format",
    ],
    rating: 4.8,
    reviewCount: 89,
    description: "Bolsa profissional para técnico de campo com múltiplos compartimentos. Confeccionada em nylon reforçado com costura dupla e zíper YKK.",
    features: ["Nylon 600D reforçado", "Zíper YKK", "15 compartimentos", "Suporte para tablet 10\"", "Alça ergonômica ajustável"],
    sku: "BL-TC-GR-002",
    inStock: true,
    isBestSeller: true,
    isFeatured: true,
  },
  {
    id: 3,
    name: "Malote de Segurança com Lacre Plástico - Médio",
    slug: "malote-seguranca-lacre-medio",
    category: "Malotes",
    categorySlug: "malotes",
    price: 45.90,
    images: [
      "https://images.unsplash.com/photo-1590664216379-9af6f139e66e?w=600&h=600&fit=crop&auto=format",
    ],
    rating: 4.7,
    reviewCount: 203,
    description: "Malote de segurança com lacre plástico numerado. Ideal para transporte de documentos, dinheiro e valores. Material em lona impermeável.",
    features: ["Lona impermeável 500D", "Lacre plástico numerado", "Forro interno resistente", "Alça reforçada", "Disponível em várias cores"],
    sku: "ML-SEG-MD-003",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: 4,
    name: "Capa para Impressora Portátil Zebra ZQ620",
    slug: "capa-impressora-zebra-zq620",
    category: "Capas para Impressoras Portáteis",
    categorySlug: "capas-impressoras",
    price: 129.90,
    images: [
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&h=600&fit=crop&auto=format",
    ],
    rating: 4.8,
    reviewCount: 67,
    description: "Capa protetora fabricada especialmente para a impressora portátil Zebra ZQ620. Proteção total com acesso a todos os controles e portas.",
    features: ["Encaixe perfeito modelo ZQ620", "Nylon 1000D", "Alça de ombro ajustável", "Bolso externo", "Proteção contra chuva"],
    sku: "CI-ZB-ZQ620-004",
    inStock: true,
    isFeatured: true,
    isNew: true,
  },
  {
    id: 5,
    name: "Mochila Técnica para Notebook e Ferramentas",
    slug: "mochila-tecnica-notebook",
    category: "Bolsas, Mochilas e Pochetes",
    categorySlug: "bolsas-mochilas",
    price: 259.90,
    originalPrice: 319.90,
    discount: 19,
    images: [
      "https://images.unsplash.com/photo-1581621393564-f092abd0e975?w=600&h=600&fit=crop&auto=format",
    ],
    rating: 5.0,
    reviewCount: 45,
    description: "Mochila técnica profissional com compartimento acolchoado para notebook até 15.6\" e organização para ferramentas.",
    features: ["Compartimento notebook 15.6\"", "Costas ergonômicas", "Material resistente à água", "30L de capacidade", "Alças ajustáveis"],
    sku: "MC-TEC-NB-005",
    inStock: true,
    isPromo: true,
    isFeatured: true,
  },
  {
    id: 6,
    name: "Pochete Profissional para Ferramentas e EPIs",
    slug: "pochete-ferramentas-epi",
    category: "Bolsas, Mochilas e Pochetes",
    categorySlug: "bolsas-mochilas",
    price: 79.90,
    images: [
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&h=600&fit=crop&auto=format",
    ],
    rating: 4.6,
    reviewCount: 158,
    description: "Pochete profissional para uso com cinto, ideal para técnicos e operadores de campo. Múltiplos compartimentos para ferramentas e EPIs.",
    features: ["Fixação no cinto", "6 compartimentos", "Velcro e zíper", "Nylon reforçado", "Lavável"],
    sku: "PC-FER-EPI-006",
    inStock: true,
    isNew: true,
  },
  {
    id: 7,
    name: "Bainha para Facão em Couro Legítimo",
    slug: "bainha-facao-couro",
    category: "Bainhas para Ferramentas",
    categorySlug: "bainhas-ferramentas",
    price: 69.90,
    images: [
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&h=600&fit=crop&auto=format",
    ],
    rating: 4.9,
    reviewCount: 312,
    description: "Bainha para facão confeccionada em couro legítimo curtido. Alta durabilidade e resistência. Fixação segura no cinto.",
    features: ["Couro legítimo curtido", "Costura com linha dupla encerada", "Presilha para cinto", "Disponível em P/M/G", "Acabamento manual"],
    sku: "BH-FAC-CO-007",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: 8,
    name: "Capa para Tablet 10\" com Alça de Ombro",
    slug: "capa-tablet-10-alca-ombro",
    category: "Capas para Tablet e Máquina de Cartão",
    categorySlug: "capas-tablet",
    price: 109.90,
    originalPrice: 139.90,
    discount: 21,
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop&auto=format",
    ],
    rating: 4.7,
    reviewCount: 91,
    description: "Capa protetora para tablet de 10\" com alça de ombro ajustável. Proteção total contra quedas e intempéries.",
    features: ["Compatível com tablets 9-10.5\"", "Alça de ombro ajustável", "Proteção contra chuva", "Suporte de mesa", "Acesso à câmera"],
    sku: "CT-TAB-10-008",
    inStock: true,
    isPromo: true,
  },
  {
    id: 9,
    name: "Boné Corporativo Personalizado - Dry Fit",
    slug: "bone-corporativo-dry-fit",
    category: "Bonés e Chapéus",
    categorySlug: "bones-chapeus",
    price: 34.90,
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=600&fit=crop&auto=format",
    ],
    rating: 4.5,
    reviewCount: 178,
    description: "Boné corporativo em tecido dry fit com bordado personalizado. Ideal para uniformização de equipes.",
    features: ["Tecido Dry Fit", "Fecho ajustável", "Aba pré-curvada", "Bordado personalizado", "Pedido mínimo 12 unidades"],
    sku: "BN-COR-DF-009",
    inStock: true,
  },
  {
    id: 10,
    name: "Kit EPI Completo - Linha Premium",
    slug: "kit-epi-completo-premium",
    category: "EPI - Equipamentos de Proteção Individual",
    categorySlug: "epi",
    price: 349.90,
    originalPrice: 429.90,
    discount: 19,
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=600&fit=crop&auto=format",
    ],
    rating: 4.9,
    reviewCount: 56,
    description: "Kit completo de acessórios para EPIs com bolsa, capa protetora e pochete. Linha premium com materiais de alta durabilidade.",
    features: ["Bolsa 30L", "Capa protetora impermeável", "Pochete para ferramentas", "Material 1000D", "Garantia 18 meses"],
    sku: "KT-EPI-PM-010",
    inStock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: 11,
    name: "Malote Portavalores com Lacre de Segurança - Grande",
    slug: "malote-portavalores-grande",
    category: "Malotes",
    categorySlug: "malotes",
    price: 65.90,
    images: [
      "https://images.unsplash.com/photo-1609696629614-6e14bf8a5494?w=600&h=600&fit=crop&auto=format",
    ],
    rating: 4.8,
    reviewCount: 143,
    description: "Malote portavalores grande com lacre de segurança. Usado por bancos, empresas e transportadoras.",
    features: ["Capacidade 10L", "Lacre numerado", "Lona 600D", "Zíper reforçado", "Alça de transporte"],
    sku: "ML-PV-GR-011",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: 12,
    name: "Capa para Coletores Honeywell CT60/CT40",
    slug: "capa-coletor-honeywell-ct60",
    category: "Capas para Coletor de Dados",
    categorySlug: "capas-coletor",
    price: 94.90,
    originalPrice: 119.90,
    discount: 21,
    images: [
      "https://images.unsplash.com/photo-1601524909162-ae8725290836?w=600&h=600&fit=crop&auto=format",
    ],
    rating: 4.8,
    reviewCount: 78,
    description: "Capa protetora para coletores de dados Honeywell CT60 e CT40. Proteção robusta para ambientes industriais.",
    features: ["Compatível CT60/CT40", "Nylon 1000D", "Janela de visor", "Suporte para cinto", "Resistente a óleo"],
    sku: "CC-HW-CT60-012",
    inStock: true,
    isPromo: true,
    isNew: true,
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Carlos Eduardo Silva",
    company: "Eletrobras Distribuição",
    role: "Gerente de Operações",
    text: "Trabalhamos com o Grupo Clemal há mais de 8 anos. A qualidade dos produtos é excepcional e o atendimento sempre muito ágil. Nossas equipes de campo adoram as bolsas e capas.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format",
  },
  {
    id: 2,
    name: "Ana Paula Ferreira",
    company: "Vivo Telecom",
    role: "Supervisora de TI",
    text: "As capas para coletores de dados são as melhores que já utilizamos. Durabilidade impressionante mesmo com uso intenso diário. Recomendo sem hesitar.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b2f5?w=80&h=80&fit=crop&auto=format",
  },
  {
    id: 3,
    name: "Roberto Nascimento",
    company: "Correios - Regional MG",
    role: "Coordenador de Distribuição",
    text: "Os malotes do Grupo Clemal são parte fundamental da nossa operação. Qualidade consistente, prazo de entrega pontual e excelente relação custo-benefício.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
  },
  {
    id: 4,
    name: "Mariana Oliveira",
    company: "Copasa",
    role: "Gestora de Compras",
    text: "Parceria de longa data. O Grupo Clemal sempre entende nossas necessidades específicas e desenvolve soluções personalizadas dentro do prazo e orçamento.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format",
  },
];

export const clientLogos = [
  { id: 1, name: "Vivo", logo: "VIVO" },
  { id: 2, name: "Correios", logo: "CORREIOS" },
  { id: 3, name: "Copasa", logo: "COPASA" },
  { id: 4, name: "Cemig", logo: "CEMIG" },
  { id: 5, name: "Eletrobras", logo: "ELETROBRAS" },
  { id: 6, name: "Petrobras", logo: "PETROBRAS" },
  { id: 7, name: "Vale", logo: "VALE" },
  { id: 8, name: "Embraer", logo: "EMBRAER" },
];
