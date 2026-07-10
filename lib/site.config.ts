// Dados institucionais fixos do site. Editar aqui e publicar de novo sempre que precisar
// trocar telefone, endereço, redes sociais, textos da Home ou tags de SEO/Analytics.

export const siteConfig = {
  companyName: "Leal Distribuidora",
  legalName: "Leal Distribuidora",
  description:
    "Distribuidora em Pelotas/RS com amplo portfólio de marcas para varejo e food service. Consulte o catálogo e faça seu pedido pelo WhatsApp.",
  phone: "(53) 98439-8052",
  phoneAlt: "(53) 98468-2021",
  whatsapp: "5553984398052",
  email: "contato@lealdistribuidora.com.br",
  address: {
    street: "Rua Lázaro Zamenhof",
    neighborhood: "Navegantes II",
    city: "Pelotas",
    state: "RS",
    zip: "96075-120",
    full: "Rua Lázaro Zamenhof, Navegantes II — Pelotas/RS, CEP 96075-120",
  },
  businessHours: "Segunda a sexta, 8h às 18h",
  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
  },
  googleMapsEmbedUrl:
    "https://www.google.com/maps?q=Rua+L%C3%A1zaro+Zamenhof,+Navegantes+II,+Pelotas+-+RS&output=embed",
  seo: {
    defaultTitle: "Leal Distribuidora — Distribuição em Pelotas/RS",
    defaultDescription:
      "Consulte o catálogo de produtos da Leal Distribuidora e faça seu pedido pelo WhatsApp. Distribuidora em Pelotas/RS.",
    keywords: ["distribuidora", "Pelotas", "atacado", "varejo", "food service"],
  },
  home: {
    heroTitle: "Distribuição que você pode confiar",
    heroSubtitle:
      "Amplo portfólio de marcas para varejo e food service em Pelotas e região.",
    whoWeAre:
      "A Leal Distribuidora atende varejo e food service com agilidade e um portfólio de marcas de confiança, construído ao longo de anos de relacionamento com nossos clientes e fornecedores.",
    mission: "Fornecer produtos de qualidade com agilidade e relacionamento próximo com cada cliente.",
    vision: "Ser referência em distribuição na região, reconhecida pela confiança e pelo atendimento.",
    values: ["Confiança", "Agilidade", "Compromisso com o cliente", "Organização"],
    differentiators: [
      { title: "Entrega rápida", description: "Logística ágil para atender seu negócio no prazo certo." },
      { title: "Amplo estoque", description: "Portfólio diversificado, sempre disponível para pronta entrega." },
      { title: "Atendimento direto", description: "Fale direto com um consultor comercial pelo WhatsApp." },
    ],
    howToBuy: [
      "Navegue pelo catálogo e encontre os produtos que precisa.",
      "Adicione ao pedido e informe a quantidade de cada item.",
      "Envie o pedido — ele chega pronto no WhatsApp do nosso time comercial.",
    ],
  },
} as const;
