import { Scenario, CaseStudy } from './types';

export const SCENARIOS: Scenario[] = [
  { id: 'straits-tension', title: { pt: 'Tensões no Estreito de Suez', en: 'Suez Straits Tension' }, category: 'military', difficulty: 'hard', description: { pt: 'Incursão naval russa em águas controladas.', en: 'Russian naval incursion in controlled waters.' }, initialStepId: 'start', maxSteps: 30 },
  { id: 'taiwan-blockade', title: { pt: 'Bloqueio de Taiwan', en: 'Taiwan Blockade' }, category: 'military', difficulty: 'hard', description: { pt: 'Uma simulação de cerco marítimo total.', en: 'A simulation of total maritime siege.' }, initialStepId: 'start', maxSteps: 30 },
  { id: 'arctic-resource-war', title: { pt: 'Guerra de Recursos no Ártico', en: 'Arctic Resource War' }, category: 'economic', difficulty: 'medium', description: { pt: 'Disputa por minerais sob o gelo derretido.', en: 'Dispute over minerals under melting ice.' }, initialStepId: 'start', maxSteps: 30 },
  { id: 'cyber-blackout', title: { pt: 'Blackout Cibernético', en: 'Cyber Blackout' }, category: 'military', difficulty: 'hard', description: { pt: 'Ataque à infraestrutura elétrica nacional.', en: 'Attack on national electrical infrastructure.' }, initialStepId: 'start', maxSteps: 30 },
  { id: 'hyper-inflation-crisis', title: { pt: 'Crise de Hiperinflação', en: 'Hyper-inflation Crisis' }, category: 'economic', difficulty: 'medium', description: { pt: 'Colapso da moeda em um país aliado.', en: 'Currency collapse in an allied nation.' }, initialStepId: 'start', maxSteps: 30 },
  { id: 'bioweapon-leak', title: { pt: 'Vazamento de Bioarma', en: 'Bioweapon Leak' }, category: 'diplomacy', difficulty: 'hard', description: { pt: 'Contenção de patógeno experimental.', en: 'Experimental pathogen containment.' }, initialStepId: 'start', maxSteps: 30 },
  { id: 'amazon-sovereignty', title: { pt: 'Soberania da Amazônia', en: 'Amazon Sovereignty' }, category: 'diplomacy', difficulty: 'medium', description: { pt: 'Crescente pressão internacional sobre a floresta.', en: 'Growing international pressure over the forest.' }, initialStepId: 'start', maxSteps: 30 },
  { id: 'space-debris-clash', title: { pt: 'Confronto em Órbita', en: 'Space Debris Clash' }, category: 'military', difficulty: 'hard', description: { pt: 'Destruição de satélites de comunicação.', en: 'Destruction of communication satellites.' }, initialStepId: 'start', maxSteps: 30 },
  { id: 'lithium-monopoly', title: { pt: 'Monopólio do Lítio', en: 'Lithium Monopoly' }, category: 'economic', difficulty: 'easy', description: { pt: 'Guerra comercial no Triângulo do Lítio.', en: 'Trade war in the Lithium Triangle.' }, initialStepId: 'start', maxSteps: 30 },
  { id: 'balkan-fragmentation', title: { pt: 'Fragmentação Balcânica', en: 'Balkan Fragmentation' }, category: 'diplomacy', difficulty: 'medium', description: { pt: 'Novas fronteiras e velhas tensões.', en: 'New borders and old tensions.' }, initialStepId: 'start', maxSteps: 30 },
  { id: 'energy-blackmail', title: { pt: 'Chantagem Energética', en: 'Energy Blackmail' }, category: 'economic', difficulty: 'medium', description: { pt: 'Corte no suprimento de gás via gasoduto.', en: 'Gas supply cut via pipeline.' }, initialStepId: 'start', maxSteps: 30 },
  { id: 'civil-war-intervention', title: { pt: 'Intervenção em Guerra Civil', en: 'Civil War Intervention' }, category: 'military', difficulty: 'medium', description: { pt: 'Apoiar rebeldes ou manter o regime?', en: 'Support rebels or maintain the regime?' }, initialStepId: 'start', maxSteps: 30 },
  { id: 'deep-sea-mining', title: { pt: 'Mineração Abissal', en: 'Deep Sea Mining' }, category: 'economic', difficulty: 'easy', description: { pt: 'Exploração em águas internacionais disputadas.', en: 'Exploration in disputed international waters.' }, initialStepId: 'start', maxSteps: 30 },
  { id: 'migrant-surge', title: { pt: 'Crise Migratória em Massa', en: 'Mass Migrant Crisis' }, category: 'diplomacy', difficulty: 'medium', description: { pt: 'Fluxo sem precedentes em fronteiras fechadas.', en: 'Unprecedented flow across closed borders.' }, initialStepId: 'start', maxSteps: 30 },
  { id: 'quantum-computing-race', title: { pt: 'Corrida Quântica', en: 'Quantum Race' }, category: 'economic', difficulty: 'hard', description: { pt: 'Quebra de criptografia militar global.', en: 'Breaking global military encryption.' }, initialStepId: 'start', maxSteps: 30 },
  { id: 'nuclear-silo-hack', title: { pt: 'Invasão de Silo Nuclear', en: 'Nuclear Silo Hack' }, category: 'military', difficulty: 'hard', description: { pt: 'Perda de controle de ogivas nucleares.', en: 'Loss of control over nuclear warheads.' }, initialStepId: 'start', maxSteps: 30 },
  { id: 'water-scarcity-treaty', title: { pt: 'Tratado de Escassez Hídrica', en: 'Water Scarcity Treaty' }, category: 'diplomacy', difficulty: 'medium', description: { pt: 'Racionamento de águas transfronteiriças.', en: 'Transboundary water rationing.' }, initialStepId: 'start', maxSteps: 30 },
  { id: 'drone-swarm-terror', title: { pt: 'Enxames de Drones Terroristas', en: 'Drone Swarm Terror' }, category: 'military', difficulty: 'medium', description: { pt: 'Ataques descentralizados em áreas urbanas.', en: 'Decentralized attacks in urban areas.' }, initialStepId: 'start', maxSteps: 30 },
  { id: 'moon-base-sanctuary', title: { pt: 'Santuário na Base Lunar', en: 'Moon Base Sanctuary' }, category: 'military', difficulty: 'medium', description: { pt: 'Disputa por território extraterrestre.', en: 'Dispute over extraterrestrial territory.' }, initialStepId: 'start', maxSteps: 30 },
  { id: 'corporate-state-takeover', title: { pt: 'Golpe Corporativo', en: 'Corporate Takeover' }, category: 'economic', difficulty: 'hard', description: { pt: 'Quando uma Big Tech compra um governo.', en: 'When a Big Tech buys a government.' }, initialStepId: 'start', maxSteps: 30 }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'kiev-2022',
    title: { pt: 'Crise de Kiev (2022)', en: 'Kiev Crisis (2022)' },
    summary: { pt: 'Análise estratégica da invasão russa sob a ótica da teoria dos jogos.', en: 'Strategic analysis of the Russian invasion through the lens of game theory.' },
    analysis: { pt: 'A invasão russa da Ucrânia em 2022 representa um caso clássico de falha na dissuasão diplomática. Sob a ótica da Teoria dos Jogos, ambos os lados operaram com informações incompletas sobre a capacidade de resistência e a coesão das sanções globais. O resultado foi uma transição de um "Jogo de Barganha" para um "Conflito de Atrito", onde o desgaste logístico superou o valor estratégico inicial do território.', en: 'The 2022 Russian invasion of Ukraine represents a classic case of diplomatic deterrence failure. From a Game Theory perspective, both sides operated with incomplete information regarding resistance capacity and the cohesion of global sanctions. The result was a transition from a "Bargaining Game" to a "Conflict of Attrition," where logistical exhaustion outweighed the initial strategic value of the territory.' },
    date: '2024-03-15'
  },
  {
    id: 'cuban-missile',
    title: { pt: 'Crise dos Mísseis em Cuba (1962)', en: 'Cuban Missile Crisis (1962)' },
    summary: { pt: 'O ápice da Guerra Fria e a Diplomacia de Borda (Brinkmanship).', en: 'The peak of the Cold War and Brinkmanship Diplomacy.' },
    analysis: { pt: 'Conhecido como o momento mais próximo que o mundo chegou de uma guerra nuclear total. A análise foca no uso da "vizinhança do perigo" como ferramenta de barganha. A resolução via bloqueio naval (quarentena) foi uma jogada de "escalada controlada" que permitiu a Khrushchev salvar a face enquanto removia a ameaça imediata.', en: 'Known as the closest the world ever came to total nuclear war. This analysis focuses on using the "neighborhood of danger" as a bargaining tool. The resolution via naval blockade (quarantine) was a "controlled escalation" move that allowed Khrushchev to save face while removing the immediate threat.' },
    date: '2024-03-20'
  },
  {
    id: 'stuxnet-iran',
    title: { pt: 'Ataque Stuxnet (2010)', en: 'Stuxnet Cyber Attack (2010)' },
    summary: { pt: 'O primeiro uso documentado de uma arma cibernética para destruição física.', en: 'The first documented use of a cyber weapon for physical destruction.' },
    analysis: { pt: 'Stuxnet redefiniu a guerra híbrida. Ao atingir centrífugas de enriquecimento de urânio através de software, os atacantes provaram que infraestruturas criticas são vulneráveis sem um único disparo. O estudo destaca a importância do "Air Gap" e como as vulnerabilidades de Dia-Zero são os mísseis balísticos da era digital.', en: 'Stuxnet redefined hybrid warfare. By targeting uranium enrichment centrifuges via software, attackers proved critical infrastructure is vulnerable without a single shot fired. The study highlights the importance of "Air Gap" security and how Zero-Day vulnerabilities are the ballistic missiles of the digital age.' },
    date: '2024-03-25'
  },
  {
    id: 'falklands-logistics',
    title: { pt: 'Guerra das Malvinas (1982)', en: 'Falklands Conflict (1982)' },
    summary: { pt: 'Projeção de força a longa distância e superioridade aérea.', en: 'Long-range force projection and air superiority.' },
    analysis: { pt: 'A vitória britânica dependeu quase inteiramente da logística e da capacidade de sustentar forças a mais de 12.000 km de distância. O uso massivo de tecnologia de mísseis Exocet pela Argentina mostrou como armas baratas podem ameaçar bens navais extremamente caros, antecipando a guerra naval moderna.', en: 'The British victory relied almost entirely on logistics and the capacity to sustain forces over 12,000 km away. Argentina’s massive use of Exocet missile technology showed how inexpensive weapons can threaten extremely costly naval assets, anticipating modern naval warfare.' },
    date: '2024-04-01'
  },
  {
    id: 'belt-and-road',
    title: { pt: 'Iniciativa Belt and Road (China)', en: 'Belt and Road Initiative (China)' },
    summary: { pt: 'Soft Power e a armadilha do endividamento estratégico.', en: 'Soft Power and the Strategic Debt Trap.' },
    analysis: { pt: 'A China redesenhou a geopolítica através de infraestrutura. Ao financiar portos e ferrovias em países em desenvolvimento, Pequim criou dependências econômicas que se traduzem em influência política. É um jogo de Go em escala global, focando no posicionamento de longo prazo em vez de vitórias táticas imediatas.', en: 'China has redesigned geopolitics through infrastructure. By financing ports and railways in developing nations, Beijing created economic dependencies that translate into political influence. It is a global-scale game of Go, focusing on long-term positioning rather than immediate tactical victories.' },
    date: '2024-04-05'
  },
  {
    id: 'vienna-congress',
    title: { pt: 'Congresso de Viena (1815)', en: 'Congress of Vienna (1815)' },
    summary: { pt: 'A arquitetura de 100 anos de paz na Europa.', en: 'The architecture of 100 years of peace in Europe.' },
    analysis: { pt: 'Após as Guerras Napoleônicas, as grandes potências criaram um sistema de Equilíbrio de Poder. O estudo analisa como a inclusão da França derrotada nas negociações (Diplomacia de Castlereagh e Metternich) evitou o revanchismo que mais tarde causaria a 2ª Guerra Mundial.', en: 'After the Napoleonic Wars, great powers created a Balance of Power system. This study analyzes how including defeated France in negotiations (Castlereagh and Metternich diplomacy) prevented the revanchism that would later cause WWII.' },
    date: '2024-04-10'
  },
  {
    id: 'stalingrad-urban',
    title: { pt: 'Batalha de Stalingrado (1942)', en: 'Battle of Stalingrad (1942)' },
    summary: { pt: 'O custo humano e estratégico da guerra urbana total.', en: 'The human and strategic cost of total urban warfare.' },
    analysis: { pt: 'O ponto de virada da 2ª Guerra Mundial. Stalingrado provou que a superioridade tecnológica alemã (Blitzkrieg) pode ser neutralizada em ambientes urbanos densos ("Rattenkrieg"). A lição central é a importância da moral e da profundidade estratégica defensiva.', en: 'The turning point of WWII. Stalingrad proved that German technological superiority (Blitzkrieg) can be neutralized in dense urban environments ("Rattenkrieg"). The central lesson is the importance of morale and strategic defensive depth.' },
    date: '2024-04-15'
  },
  {
    id: 'oil-embargo-1973',
    title: { pt: 'Embargo de Petróleo (1973)', en: 'Oil Embargo (1973)' },
    summary: { pt: 'A energia como arma de coação geopolítica.', en: 'Energy as a tool for geopolitical coercion.' },
    analysis: { pt: 'A OPEP demonstrou que o controle de recursos naturais pode dobrar as economias das superpotências. O choque do petróleo mudou a política externa dos EUA permanentemente, forçando a criação de reservas estratégicas e a busca por diversificação energética.', en: 'OPEC demonstrated that control over natural resources can bend the economies of superpowers. The oil shock permanently changed US foreign policy, forcing the creation of strategic reserves and the search for energy diversification.' },
    date: '2024-04-20'
  },
  {
    id: 'suez-crisis-1956',
    title: { pt: 'Crise de Suez (1956)', en: 'Suez Crisis (1956)' },
    summary: { pt: 'O declínio do colonialismo clássico e a nova ordem bipolar.', en: 'The decline of classical colonialism and the new bipolar order.' },
    analysis: { pt: 'Reino Unido e França tentaram retomar o Canal de Suez, mas foram impedidos pela pressão diplomática de EUA e URSS. Este evento marcou o fim das potências europeias como atores independentes globais e o início da supremacia total das superpotências da Guerra Fria.', en: 'The UK and France attempted to retake the Suez Canal but were halted by diplomatic pressure from the US and USSR. This event marked the end of European powers as independent global actors and the beginning of Cold War superpower supremacy.' },
    date: '2024-04-25'
  },
  {
    id: 'brexit-fracture',
    title: { pt: 'Fractura do Brexit (2016-2020)', en: 'Brexit Fracture (2016-2020)' },
    summary: { pt: 'Populismo e a desestabilização de blocos econômicos.', en: 'Populism and the destabilization of economic blocs.' },
    analysis: { pt: 'Uma análise da saída do Reino Unido da UE. O estudo foca em como a guerra de informação e o nacionalismo econômico podem fragmentar alianças de décadas, resultando em novos equilíbrios de poder regionais e fricções comerciais duradouras.', en: 'An analysis of the UK leaving the EU. The study focuses on how information warfare and economic nationalism can fragment decades-old alliances, resulting in new regional power balances and lasting trade frictions.' },
    date: '2024-04-28'
  },
  {
    id: 'yom-kippur-intel',
    title: { pt: 'Guerra do Yom Kippur (1973)', en: 'Yom Kippur War (1973)' },
    summary: { pt: 'Falha de Inteligência e a surpresa operacional.', en: 'Intelligence failure and operational surprise.' },
    analysis: { pt: 'Israel foi pego de surpresa apesar de ter os dados. A análise revela como o "viés de confirmação" pode cegar analistas experientes. A recuperação israelense mostrou a importância da resiliência e da contra-ofensiva rápida em cenários de choque inicial.', en: 'Israel was caught by surprise despite having the data. The analysis reveals how "confirmation bias" can blind experienced analysts. The Israeli recovery showed the importance of resilience and rapid counter-offensive in initial shock scenarios.' },
    date: '2024-05-01'
  },
  {
    id: 'panama-canal',
    title: { pt: 'Tratados do Canal do Panamá', en: 'Panama Canal Treaties' },
    summary: { pt: 'A entrega estratégica e a soberania do trânsito global.', en: 'Strategic handover and global transit sovereignty.' },
    analysis: { pt: 'A devolução do controle do canal pelo governo dos EUA ao Panamá foi um ato de pragmatismo diplomático para evitar agitação regional. O estudo analisa o impacto no fluxo comercial global e na influência dos EUA na América Central.', en: 'The US returning control of the canal to Panama was a diplomatic pragmatism act to avoid regional unrest. The study analyzes the impact on global trade flow and US influence in Central America.' },
    date: '2024-05-05'
  },
  {
    id: 'operation-neptune-spear',
    title: { pt: 'Operação Lança de Netuno (2011)', en: 'Operation Neptune Spear (2011)' },
    summary: { pt: 'Operações especiais e violação de soberania aliada.', en: 'Special operations and violation of allied sovereignty.' },
    analysis: { pt: 'O ataque que resultou na morte de bin Laden no Paquistão. Analisa a tensão diplomática gerada por uma operação unilateral dentro de um país aliado "complicado". O uso de tecnologia furtiva em helicópteros foi um fator crítico de sucesso.', en: 'The raid that resulted in the death of bin Laden in Pakistan. Analyzes the diplomatic tension generated by a unilateral operation within a "complicated" allied nation. The use of stealth helicopter technology was a critical success factor.' },
    date: '2024-05-10'
  },
  {
    id: 'korean-dmz',
    title: { pt: 'A Zona Desmilitarizada da Coreia', en: 'The Korean DMZ' },
    summary: { pt: 'O conflito congelado mais perigoso do mundo.', en: 'The world\'s most dangerous frozen conflict.' },
    analysis: { pt: 'Setenta anos de impasse armado. O estudo analisa como a DMZ serve como um para-choque vital, mas também como um barril de pólvora. A Teoria da Estabilidade/Instabilidade é aplicada aqui: a paz em larga escala é mantida pela ameaça de aniquilação mútua.', en: 'Seventy years of armed standoff. The study analyzes how the DMZ serves as a vital buffer but also as a powder keg. The Stability/Instability Theory is applied here: large-scale peace is maintained by the threat of mutual annihilation.' },
    date: '2024-05-15'
  },
  {
    id: 'gold-standard-exit',
    title: { pt: 'Fim do Padrão Ouro (1971)', en: 'Exit from the Gold Standard (1971)' },
    summary: { pt: 'O "Nixon Shock" e a hegemonia do Dólar Fiat.', en: 'The "Nixon Shock" and the hegemony of the Fiat Dollar.' },
    analysis: { pt: 'Ao desvincular o dólar do ouro, os EUA mudaram as regras do sistema financeiro global. O estudo explora como isso deu a Washington um poder econômico sem precedentes, permitindo sanções financeiras como armas de guerra.', en: 'By decoupling the dollar from gold, the US changed the rules of the global financial system. The study explores how this gave Washington unprecedented economic power, allowing for financial sanctions as weapons of war.' },
    date: '2024-05-20'
  },
  {
    id: 'peloponnesian-trap',
    title: { pt: 'A Armadilha de Tucídides', en: 'The Thucydides Trap' },
    summary: { pt: 'Esparta vs Atenas: O perigo de potências ascendentes.', en: 'Sparta vs Athens: The danger of rising powers.' },
    analysis: { pt: 'O termo explica por que a guerra é quase inevitável quando uma potência em ascensão ameaça a hegemonia de uma potência estabelecida. Aplicado hoje à relação EUA-China, este estudo clássico mostra padrões de comportamento milenares.', en: 'The term explains why war is almost inevitable when a rising power threatens the hegemony of an established power. Applied today to the US-China relationship, this classic study shows ancient behavioral patterns.' },
    date: '2024-05-25'
  },
  {
    id: 'enigma-code',
    title: { pt: 'Código Enigma (1940s)', en: 'Enigma Code (1940s)' },
    summary: { pt: 'A guerra silenciosa nos bastidores dos sinais.', en: 'The silent war behind signals.' },
    analysis: { pt: 'Bletchley Park e a quebra da criptografia alemã reduziram a 2ª Guerra Mundial em pelo menos dois anos. O estudo enfatiza que a informação correta no momento certo vale mais do que divisões mecanizadas inteiras.', en: 'Bletchley Park and the breaking of German encryption shortened WWII by at least two years. The study emphasizes that the right information at the right time is worth more than entire mechanized divisions.' },
    date: '2024-05-30'
  },
  {
    id: 'arab-spring',
    title: { pt: 'Primavera Árabe (2011)', en: 'Arab Spring (2011)' },
    summary: { pt: 'Redes sociais e o colapso de regimes autoritários.', en: 'Social media and the collapse of authoritarian regimes.' },
    analysis: { pt: 'A tecnologia permitiu a organização sem líderes, desafiando táticas tradicionais de policiamento. O vácuo de poder resultante na Síria e Líbia gerou conflitos que ainda ressoam na geopolítica mundial hoje.', en: 'Technology enabled leaderless organization, challenging traditional policing tactics. The resulting power vacuum in Syria and Libya generated conflicts that still resonate in world geopolitics today.' },
    date: '2024-06-01'
  },
  {
    id: 'space-shuttle-challenger',
    title: { pt: 'Desastre da Challenger (1986)', en: 'Challenger Disaster (1986)' },
    summary: { pt: 'Viés Gerencial e a falha do pensamento sistêmico.', en: 'Management Bias and the failure of systems thinking.' },
    analysis: { pt: 'Embora não seja uma guerra, é um caso de estudo crítico sobre falha institucional sob pressão política. O estudo foca no "Pensamento de Grupo" (Groupthink) e como o desrespeito a avisos técnicos por metas políticas causou a catástrofe.', en: 'While not a war, it is a critical case study of institutional failure under political pressure. The study focuses on "Groupthink" and how ignoring technical warnings for political goals caused the catastrophe.' },
    date: '2024-06-05'
  },
  {
    id: 'vietnam-asymmetric',
    title: { pt: 'Guerra do Vietnã e Assimetria', en: 'Vietnam War and Asymmetry' },
    summary: { pt: 'A derrota da superpotência por forças irregulares.', en: 'The defeat of the superpower by irregular forces.' },
    analysis: { pt: 'Analisa como o Vietcong neutralizou o poder aéreo e tecnológico dos EUA usando túneis e táticas de guerrilha. O estudo destaca que a vitória militar sem legitimidade política local é insustentável a longo prazo.', en: 'Analyzes how the Vietcong neutralized US air and technological power using tunnels and guerrilla tactics. The study highlights that military victory without local political legitimacy is unsustainable in the long term.' },
    date: '2024-06-10'
  }
];
