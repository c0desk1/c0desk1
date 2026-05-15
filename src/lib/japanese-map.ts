// src/lib/japanese-map.ts

export const japaneseToLatinMap: Record<string, string> = {

  // Waktu
  '今日': 'kyou',    '明日': 'ashita',  '昨日': 'kinou',
  '毎日': 'mainichi','今年': 'kotoshi', '去年': 'kyonen',
  '午前': 'gozen',   '午後': 'gogo',

  // Tempat
  '学校': 'gakkou',  '大学': 'daigaku', '病院': 'byouin',
  '部屋': 'heya',    '建物': 'tatemono','図書館': 'toshokan',
  '世界': 'sekai',

  // Makanan & alam
  '野菜': 'yasai',   '果物': 'kudamono',

  // Transportasi
  '電車': 'densha',  '自転車': 'jitensha','飛行機': 'hikouki',

  // Teknologi & ilmu
  '情報': 'jouhou',  '技術': 'gijutsu',  '科学': 'kagaku',

  // Hiburan
  '映画': 'eiga',    '屋敷': 'yashiki',  '使う': 'tsukau',

  // ---- Horror / game (ditambahkan) ----
  '恐怖': 'kyoufu',
  '潜入': 'sennyuu',
  '亡霊': 'bourei',
  '幽霊': 'yuurei',
  '廃墟': 'haikyo',
  '生存': 'seizon',
  '感染': 'kansen',
  '変異': 'heni',
  '脅威': 'kyoui',
  '悪夢': 'akumu',
  '暗闇': 'kurayami',
  '怪物': 'kaibutsu',
  '武器': 'buki',
  '謎': 'nazo',
  '探索': 'tansaku',
  '逃亡': 'toubou',
  '生き残り': 'ikinokori',

  // ---- Kata majemuk umum lainnya ----
  '日本語': 'nihongo',
  '東京': 'toukyou',
  '大阪': 'oosaka',
  '名前': 'namae',
  '言葉': 'kotoba',
  '物語': 'monogatari',
  '冒険': 'bouken',
  '戦闘': 'sentou',
  '勝利': 'shouri',
  '敗北': 'haiboku',
  '仲間': 'nakama',
  '敵': 'teki',

  // ==================== HIRAGANA DASAR ====================
  'あ': 'a',  'い': 'i',   'う': 'u',   'え': 'e',  'お': 'o',
  'か': 'ka', 'き': 'ki',  'く': 'ku',  'け': 'ke', 'こ': 'ko',
  'さ': 'sa', 'し': 'shi', 'す': 'su',  'せ': 'se', 'そ': 'so',
  'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
  'な': 'na', 'に': 'ni',  'ぬ': 'nu',  'ね': 'ne', 'の': 'no',
  'は': 'ha', 'ひ': 'hi',  'ふ': 'fu',  'へ': 'he', 'ほ': 'ho',
  'ま': 'ma', 'み': 'mi',  'む': 'mu',  'め': 'me', 'も': 'mo',
  'や': 'ya', 'ゆ': 'yu',  'よ': 'yo',
  'ら': 'ra', 'り': 'ri',  'る': 'ru',  'れ': 're', 'ろ': 'ro',
  'わ': 'wa', 'を': 'wo',  'ん': 'n',

  // Hiragana — dakuten
  'が': 'ga', 'ぎ': 'gi',  'ぐ': 'gu',  'げ': 'ge', 'ご': 'go',
  'ざ': 'za', 'じ': 'ji',  'ず': 'zu',  'ぜ': 'ze', 'ぞ': 'zo',
  'だ': 'da', 'ぢ': 'ji',  'づ': 'zu',  'で': 'de', 'ど': 'do',
  'ば': 'ba', 'び': 'bi',  'ぶ': 'bu',  'べ': 'be', 'ぼ': 'bo',

  // Hiragana — handakuten
  'ぱ': 'pa', 'ぴ': 'pi',  'ぷ': 'pu',  'ぺ': 'pe', 'ぽ': 'po',

  // Hiragana — yoon (kombinasi dua karakter)
  'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
  'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
  'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
  'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
  'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
  'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
  'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
  'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
  'じゃ': 'ja',  'じゅ': 'ju',  'じょ': 'jo',
  'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
  'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',

  // Hiragana — kana kecil standalone (fallback)
  'ゃ': 'ya', 'ゅ': 'yu', 'ょ': 'yo',
  'ぁ': 'a',  'ぃ': 'i',  'ぅ': 'u',  'ぇ': 'e', 'ぉ': 'o',

  // っ — sokuon: ditangani khusus di slugify(); fallback string kosong
  'っ': '',

  // ==================== KATAKANA DASAR ====================
  'ア': 'a',  'イ': 'i',   'ウ': 'u',   'エ': 'e',  'オ': 'o',
  'カ': 'ka', 'キ': 'ki',  'ク': 'ku',  'ケ': 'ke', 'コ': 'ko',
  'サ': 'sa', 'シ': 'shi', 'ス': 'su',  'セ': 'se', 'ソ': 'so',
  'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
  'ナ': 'na', 'ニ': 'ni',  'ヌ': 'nu',  'ネ': 'ne', 'ノ': 'no',
  'ハ': 'ha', 'ヒ': 'hi',  'フ': 'fu',  'ヘ': 'he', 'ホ': 'ho',
  'マ': 'ma', 'ミ': 'mi',  'ム': 'mu',  'メ': 'me', 'モ': 'mo',
  'ヤ': 'ya', 'ユ': 'yu',  'ヨ': 'yo',
  'ラ': 'ra', 'リ': 'ri',  'ル': 'ru',  'レ': 're', 'ロ': 'ro',
  'ワ': 'wa', 'ヲ': 'wo',  'ン': 'n',

  // Katakana — dakuten
  'ガ': 'ga', 'ギ': 'gi',  'グ': 'gu',  'ゲ': 'ge', 'ゴ': 'go',
  'ザ': 'za', 'ジ': 'ji',  'ズ': 'zu',  'ゼ': 'ze', 'ゾ': 'zo',
  'ダ': 'da', 'ヂ': 'ji',  'ヅ': 'zu',  'デ': 'de', 'ド': 'do',
  'バ': 'ba', 'ビ': 'bi',  'ブ': 'bu',  'ベ': 'be', 'ボ': 'bo',

  // Katakana — handakuten
  'パ': 'pa', 'ピ': 'pi',  'プ': 'pu',  'ペ': 'pe', 'ポ': 'po',

  // Katakana — yoon
  'キャ': 'kya', 'キュ': 'kyu', 'キョ': 'kyo',
  'シャ': 'sha', 'シュ': 'shu', 'ショ': 'sho',
  'チャ': 'cha', 'チュ': 'chu', 'チョ': 'cho',
  'ニャ': 'nya', 'ニュ': 'nyu', 'ニョ': 'nyo',
  'ヒャ': 'hya', 'ヒュ': 'hyu', 'ヒョ': 'hyo',
  'ミャ': 'mya', 'ミュ': 'myu', 'ミョ': 'myo',
  'リャ': 'rya', 'リュ': 'ryu', 'リョ': 'ryo',
  'ギャ': 'gya', 'ギュ': 'gyu', 'ギョ': 'gyo',
  'ジャ': 'ja',  'ジュ': 'ju',  'ジョ': 'jo',
  'ビャ': 'bya', 'ビュ': 'byu', 'ビョ': 'byo',
  'ピャ': 'pya', 'ピュ': 'pyu', 'ピョ': 'pyo',

  // Katakana — kana kecil standalone (fallback)
  'ャ': 'ya', 'ュ': 'yu', 'ョ': 'yo',
  'ァ': 'a',  'ィ': 'i',  'ゥ': 'u',  'ェ': 'e', 'ォ': 'o',

  // ッ — sokuon: ditangani khusus di slugify(); fallback string kosong
  'ッ': '',

  // Tanda vokal panjang katakana — abaikan
  'ー': '',

  // ==================== KANJI SINGLE-KARAKTER ====================

  // Angka & satuan waktu
  '一': 'ichi',   '二': 'ni',     '三': 'san',    '四': 'shi',
  '五': 'go',     '六': 'roku',   '七': 'shichi', '八': 'hachi',
  '九': 'kyuu',   '十': 'juu',    '百': 'hyaku',  '千': 'sen',
  '万': 'man',
  '日': 'nichi',  '月': 'tsuki',  '年': 'nen',    '時': 'ji',
  '分': 'fun',    '秒': 'byou',   '今': 'ima',

  // Posisi & arah
  '上': 'ue',     '下': 'shita',  '中': 'naka',   '外': 'soto',
  '左': 'hidari', '右': 'migi',   '北': 'kita',   '南': 'minami',
  '東': 'higashi','西': 'nishi',
  '前': 'mae',    '後': 'ato',    '横': 'yoko',
  '近': 'chika',  '遠': 'too',

  // Alam
  '天': 'ten',    '地': 'chi',    '山': 'yama',   '川': 'kawa',
  '海': 'umi',    '雨': 'ame',    '雪': 'yuki',

  // Orang & keluarga
  '人': 'hito',   '男': 'otoko',  '女': 'onna',   '子': 'ko',
  '父': 'chichi', '母': 'haha',   '兄': 'ani',    '弟': 'otouto',
  '姉': 'ane',    '妹': 'imouto', '友': 'tomo',

  // Tubuh
  '目': 'me',     '耳': 'mimi',   '口': 'kuchi',  '手': 'te',
  '足': 'ashi',   '心': 'kokoro',

  // Makanan
  '食': 'shoku',  '飲': 'in',     '水': 'mizu',   '米': 'kome',
  '肉': 'niku',

  // Tempat (single)
  '駅': 'eki',    '店': 'mise',   '家': 'ie',
  '町': 'machi',  '村': 'mura',   '都': 'to',     '市': 'shi',
  '館': 'kan',

  // Transportasi (single)
  '車': 'kuruma', '船': 'fune',

  // Teknologi (single)
  '電': 'den',    '話': 'wa',     '機': 'ki',     '械': 'kai',

  // Horror / game (single — ditambahkan)
  '恐': 'kyou',   '怖': 'fu',
  '深': 'fuka',   '潜': 'sen',
  '廃': 'hai',    '墟': 'kyo',
  '変': 'hen',    '異': 'i',
  '暗': 'an',     '闇': 'yami',
  '怪': 'kai',    '物': 'butsu',
  '謎': 'nazo',   '索': 'saku',
  '逃': 'to',     '亡': 'bou',
  '霊': 'rei',    '幽': 'yuu',

  // Hiburan & game (single)
  '遊': 'yuu',    '戯': 'gi',     '画': 'ga',     '音': 'oto',
  '楽': 'raku',   '曲': 'kyoku',
  '死': 'shi',    '体': 'tai',
  '威': 'i',      '脅': 'kyou',

  // Kata kerja (stem)
  '見': 'mi',     '聞': 'ki',     '読': 'yo',     '書': 'ka',
  '買': 'ka',
  '行': 'i',      '来': 'ku',     '帰': 'kae',    '出': 'de',
  '入': 'ire',    '始': 'haji',   '終': 'owa',    '開': 'hira',
  '閉': 'to',     '作': 'tsuku',  '使': 'tsuka',

  // Sifat
  '大': 'dai',    '小': 'shou',   '新': 'shin',   '古': 'ko',
  '長': 'chou',   '短': 'tan',    '高': 'kou',    '安': 'an',
  '多': 'ta',     '少': 'shou',   '全': 'zen',    '最': 'sai',
  '良': 'ryou',   '悪': 'aku',    '早': 'haya',   '遅': 'oso',

  // Kata umum / sufiks
  '語': 'go',     '学': 'gaku',   '生': 'sei',    '会': 'kai',
  '社': 'sha',    '者': 'sha',    '的': 'teki',   '性': 'sei',
  '理': 'ri',     '数': 'suu',
  '字': 'ji',     '文': 'bun',    '化': 'ka',
  '自': 'ji',     '動': 'dou',    '用': 'you',    '方': 'hou',
  '法': 'hou',    '回': 'kai',    '度': 'do',     '場': 'ba',
  '合': 'gou',    '間': 'kan',    '先': 'saki',
  '通': 'toori',  '道': 'michi',  '路': 'ro',
  '名': 'na',
  '別': 'betsu',  '色': 'iro',    '形': 'katachi',
  '力': 'chikara','気': 'ki',     '運': 'un',
  '命': 'inochi',
  '戦': 'ikusa',  '闘': 'tatakai','忍': 'nin',
  '愛': 'ai',     '恋': 'koi',    '夢': 'yume',
};