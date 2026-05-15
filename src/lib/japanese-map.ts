// src/lib/japanese-map.ts

/**
 * Pemetaan karakter Jepang (Hiragana, Katakana, Kanji dasar) ke Romaji.
 * Gunakan untuk transliterasi sebelum diproses slug lebih lanjut.
 */
export const japaneseToLatinMap: Record<string, string> = {
  // Hiragana
  'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
  'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
  'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
  'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
  'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
  'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
  'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
  'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
  'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
  'わ': 'wa', 'を': 'wo', 'ん': 'n',
  'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
  'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
  'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
  'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
  'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
  'ゃ': 'ya', 'ゅ': 'yu', 'ょ': 'yo', 'っ': 'tsu',

  // Katakana
  'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
  'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
  'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
  'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
  'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
  'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
  'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
  'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
  'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
  'ワ': 'wa', 'ヲ': 'wo', 'ン': 'n',
  'ガ': 'ga', 'ギ': 'gi', 'グ': 'gu', 'ゲ': 'ge', 'ゴ': 'go',
  'ザ': 'za', 'ジ': 'ji', 'ズ': 'zu', 'ゼ': 'ze', 'ゾ': 'zo',
  'ダ': 'da', 'ヂ': 'ji', 'ヅ': 'zu', 'デ': 'de', 'ド': 'do',
  'バ': 'ba', 'ビ': 'bi', 'ブ': 'bu', 'ベ': 'be', 'ボ': 'bo',
  'パ': 'pa', 'ピ': 'pi', 'プ': 'pu', 'ペ': 'pe', 'ポ': 'po',
  'ャ': 'ya', 'ュ': 'yu', 'ョ': 'yo', 'ッ': 'tsu',

  // Kanji dasar (tambahkan sesuai kebutuhan artikel)
  '一': 'ichi', '二': 'ni', '三': 'san', '人': 'hito', '日': 'nichi',
  '月': 'tsuki', '年': 'nen', '時': 'ji', '分': 'fun', '今': 'ima',
  '前': 'mae', '後': 'ato', '上': 'ue', '下': 'shita', '中': 'naka',
  '大': 'dai', '小': 'shou', '本': 'hon', '語': 'go', '学': 'gaku',
  '生': 'sei', '会': 'kai', '社': 'sha', '者': 'sha', '的': 'teki',
  '出': 'shutsu', '入': 'nyuu', '見': 'ken', '聞': 'bun', '書': 'sho',
  '言': 'gen', '話': 'wa', '読': 'doku', '買': 'bai', '食': 'shoku',
  '自': 'ji', '動': 'dou', '作': 'saku', '使': 'shi', '用': 'you',
  '方': 'hou', '法': 'hou', '行': 'kou', '来': 'rai', '回': 'kai',
  '新': 'shin', '古': 'ko', '長': 'chou', '短': 'tan', '高': 'kou',
  '安': 'an', '多': 'ta', '少': 'shou', '全': 'zen', '最': 'sai',
  '化': 'ka', '性': 'sei', '物': 'butsu', '理': 'ri', '数': 'suu',
  '字': 'ji', '文': 'bun', '情': 'jou', '報': 'hou', '電': 'den',

  // Tambahan dari artikel Resident Evil
  '亡': 'bou', '霊': 'rei', '都': 'to', '市': 'shi', '街': 'gai',
  '死': 'shi', '体': 'tai', '館': 'kan', '屋': 'ya', '敷': 'shiki',
  '屋敷': 'yashiki', // contoh gabungan, bisa diatur sesuai kemunculan
  // Silakan tambah kanji lain yang sering muncul
};