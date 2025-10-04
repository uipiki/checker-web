// モックデータ: 大会とトーナメントの情報

export const tournaments = [
  {
    id: 1,
    eventName: "東京ポーカーフェスティバル2024",
    eventId: "tpf2024",
    tournamentName: "メインイベント",
    buyIn: 30000,
    payoutStructure: [
      { place: 1, percentage: 30 },
      { place: 2, percentage: 20 },
      { place: 3, percentage: 15 },
      { place: 4, percentage: 10 },
      { place: 5, percentage: 8 },
      { place: 6, percentage: 7 },
      { place: 7, percentage: 5 },
      { place: 8, percentage: 3 },
      { place: 9, percentage: 2 },
    ]
  },
  {
    id: 2,
    eventName: "東京ポーカーフェスティバル2024",
    eventId: "tpf2024",
    tournamentName: "サイドイベント A",
    buyIn: 10000,
    payoutStructure: [
      { place: 1, percentage: 40 },
      { place: 2, percentage: 25 },
      { place: 3, percentage: 15 },
      { place: 4, percentage: 10 },
      { place: 5, percentage: 10 },
    ]
  },
  {
    id: 3,
    eventName: "大阪ポーカーチャンピオンシップ2024",
    eventId: "opc2024",
    tournamentName: "グランドトーナメント",
    buyIn: 50000,
    payoutStructure: [
      { place: 1, percentage: 35 },
      { place: 2, percentage: 20 },
      { place: 3, percentage: 13 },
      { place: 4, percentage: 10 },
      { place: 5, percentage: 8 },
      { place: 6, percentage: 6 },
      { place: 7, percentage: 4 },
      { place: 8, percentage: 2 },
      { place: 9, percentage: 2 },
    ]
  },
  {
    id: 4,
    eventName: "大阪ポーカーチャンピオンシップ2024",
    eventId: "opc2024",
    tournamentName: "デイリートーナメント",
    buyIn: 5000,
    payoutStructure: [
      { place: 1, percentage: 50 },
      { place: 2, percentage: 30 },
      { place: 3, percentage: 20 },
    ]
  },
];

// イベント一覧を取得
export const getEvents = () => {
  const eventMap = new Map();
  tournaments.forEach(t => {
    if (!eventMap.has(t.eventId)) {
      eventMap.set(t.eventId, {
        id: t.eventId,
        name: t.eventName
      });
    }
  });
  return Array.from(eventMap.values());
};

// イベントIDからトーナメント一覧を取得
export const getTournamentsByEvent = (eventId) => {
  return tournaments.filter(t => t.eventId === eventId);
};

// トーナメントIDからトーナメント情報を取得
export const getTournamentById = (id) => {
  return tournaments.find(t => t.id === id);
};
