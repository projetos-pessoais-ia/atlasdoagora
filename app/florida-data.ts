export const florida = {
  slug: 'brasileiros-na-florida-registro-partidario-2014-2024',
  publishedAt: '2026-11-05',
  title: 'Brasileiros na Flórida: como mudou o registro partidário?',
  description: 'Entre os eleitores nascidos no Brasil identificados na Flórida, a vantagem democrata no cadastro eleitoral caiu de 23 pontos percentuais em 2014 para 1 ponto em 2024.',
  category: 'Sociedade',
  tag: 'FLÓRIDA · REGISTRO ELEITORAL',
  cover: '/editorial/brasileiros-florida-registro-partidario.webp',
  width: 1800,
  height: 1320,
  alt: 'Capa Brasileiros na Flórida, com a bandeira do Brasil e três pastas: Democratas, Republicanos e Sem partido.',
  source: 'ElectionSmith',
  sources: {
    registration: 'https://electionsmith.substack.com/p/party-registration-patterns-in-florida',
    gap: 'https://electionsmith.substack.com/p/floridas-immigrant-electorate-has',
    elections: 'https://dos.fl.gov/elections/for-voters/voter-registration/closed-primary-elections/',
  },
  // Medida publicada em 7 de outubro: percentual republicano menos percentual democrata.
  // O gráfico inverte o sinal para expressar a vantagem democrata, em pontos percentuais.
  records: [{ year: 2014, repMinusDem: -23 }, { year: 2024, repMinusDem: -1 }],
} as const;
