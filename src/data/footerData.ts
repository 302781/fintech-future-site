// src/data/footerData.ts

/**
 * @interface FooterSectionLink
 * @property {string} label 
 * @property {string} to 
 */
export interface FooterSectionLink {
  label: string;
  to: string;
}

/**
 * @interface FooterSection
 * @property {string} title - O título da seção do rodapé.
 * @property {FooterSectionLink[]} links - Um array de objetos de link para a seção.
 */
export interface FooterSection {
  title: string;
  links: FooterSectionLink[];
}

export const footerSectionsData: FooterSection[] = [
  {
    title: "Cursos",
    links: [
      { label: "Investimentos Básicos", to: "/cursos/investimentos-basicos" },
      { label: "Renda Fixa", to: "/cursos/renda-fixa" },
      { label: "Renda Variável", to: "/cursos/renda-variavel" },
      { label: "Criptomoedas", to: "/cursos/criptomoedas" },
      { label: "Fundos Imobiliários", to: "/cursos/fundos-imobiliarios" },
    ],
  },
  {
    title: "Ferramentas",
    links: [
      { label: "Calculadora de Juros Compostos", to: "/ferramentas/calculadora-juros" },
      { label: "Simulador de Aposentadoria", to: "/ferramentas/simulador-aposentadoria" },
      { label: "Planejador de Metas", to: "/ferramentas/planejador-metas" },
      { label: "Análise de Carteira", to: "/ferramentas/analise-carteira" },
      { label: "Comparador de Fundos", to: "/ferramentas/comparador-fundos" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre Nós", to: "/sobre" },
      { label: "Blog", to: "/blog" },
      { label: "Contato", to: "/contato" },
      { label: "Política de Privacidade", to: "/politica-de-privacidade" },
      { label: "Termos de Uso", to: "/termos-de-uso" },
      { label: "Configurações de Conta", to: "/settings" }, 
      { label: "Configuração de Segurança", to: "/seguranca" },
    ],
  },
];