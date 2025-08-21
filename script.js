document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.querySelector('.intro-screen');
    const testScreen = document.querySelector('.test-screen');
    const resultScreen = document.querySelector('.result-screen');

    const startBtn = document.getElementById('start-test-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const restartBtn = document.getElementById('restart-btn');

    const questionContainer = document.getElementById('question-container');
    const resultContent = document.getElementById('result-content');
    const shareLinkBtn = document.getElementById('share-link-btn');
    const shareFbBtn = document.getElementById('share-fb-btn');
    const shareLineBtn = document.getElementById('share-line-btn');

    let currentStep = 0;
    const userAnswers = {};
    let currentQuestions = [];

    // 100 個心靈測驗問題
    const allQuestions = [
        "你是否感到難以入睡，或睡眠品質很差？",
        "你是否經常對未來感到焦慮不安？",
        "你是否時常覺得自己被誤解或感到孤獨？",
        "你是否發現自己難以集中精神，思緒經常飄走？",
        "你是否感到對平常喜歡的事物失去興趣了？",
        "你是否感到身體疲憊，即使有足夠休息也無法恢復？",
        "你是否會因為小事而感到情緒失控或憤怒？",
        "你是否覺得自己很難表達內心的真實感受？",
        "你是否感到生活缺乏方向，對未來感到迷茫？",
        "你是否感到人際關係緊張，難以與人建立連結？",
        "你是否時常感到壓力過大，無法放鬆？",
        "你是否覺得自己一直在取悅他人，而忽略了自己？",
        "你是否會過度思考，讓想法在腦中不斷打轉？",
        "你是否感到自信心不足，對自己能力產生懷疑？",
        "你是否經常感到後悔或對過去的錯誤耿耿於懷？",
        "你是否會因為害怕失敗，而不敢嘗試新事物？",
        "你是否時常感到內疚，即使沒有做錯事？",
        "你是否覺得自己很難信任別人？",
        "你是否會因為他人的負面情緒而受到影響？",
        "你是否會用吃東西、購物或其他習慣來麻痺自己？",
        "你是否覺得自己常常處於「戰或逃」的緊張狀態？",
        "你是否經常感到煩躁，容易不耐煩？",
        "你是否會因為害怕被拒絕，而避免與人交流？",
        "你是否覺得自己無法獨處，需要不斷尋找刺激？",
        "你是否對別人的批評或意見特別敏感？",
        "你是否會將他人的問題視為自己的責任？",
        "你是否會因為追求完美而給自己帶來巨大壓力？",
        "你是否覺得自己的付出與回報不成正比？",
        "你是否感到內心有一股無法解釋的空虛感？",
        "你是否會因為過度勞累而感到身心俱疲？",
        "你是否覺得自己被困在一個無法改變的處境？",
        "你是否經常感到無助，覺得無法掌控自己的生活？",
        "你是否會因為害怕衝突，而總是選擇妥協？",
        "你是否覺得自己無法放下對某人的怨恨？",
        "你是否經常感到沒有安全感，擔心失去擁有的東西？",
        "你是否會用忙碌來逃避面對內心的問題？",
        "你是否對未來感到悲觀，看不到希望？",
        "你是否覺得自己的價值建立在他人的認同上？",
        "你是否會因為害怕被評判，而不敢表達自己的想法？",
        "你是否經常感到焦慮，即使沒有明確的原因？",
        "你是否覺得自己無法原諒自己過去的錯誤？",
        "你是否會因為別人的成功而感到嫉妒？",
        "你是否覺得自己的人生缺乏意義或目標？",
        "你是否經常感到疲倦，即使是小事也會感到耗盡能量？",
        "你是否覺得自己好像被困在一個無形的牢籠裡？",
        "你是否會因為過度關注細節而感到筋疲力盡？",
        "你是否感到難以信任自己的直覺？",
        "你是否經常感到內心掙扎，難以做出決定？",
        "你是否覺得自己的情緒像雲霄飛車，起伏不定？",
        "你是否會因為過度分析而錯失行動的機會？",
        "你是否感到自己與大自然或宇宙失去連結？",
        "你是否覺得自己的內在小孩正在哭泣？",
        "你是否會因為擔心未來而忽略了當下？",
        "你是否感到自己很難活在當下？",
        "你是否時常感到壓力，特別是在需要展現自我時？",
        "你是否覺得自己的身體正在發出警訊，但你卻忽略了它？",
        "你是否會因為別人的期望而感到窒息？",
        "你是否感到自己對生活失去了掌控感？",
        "你是否經常感到不知所措，不知道該從何開始？",
        "你是否會因為害怕孤獨而勉強自己去社交？",
        "你是否覺得自己很難從失敗中恢復過來？",
        "你是否感到自己不斷在重複舊有的模式？",
        "你是否會因為害怕被遺忘而努力引起他人注意？",
        "你是否覺得自己像個旁觀者，無法真正參與生活？",
        "你是否會因為過去的創傷而影響現在的關係？",
        "你是否經常感到心神不寧，難以平靜？",
        "你是否覺得自己需要不斷證明自己的價值？",
        "你是否會因為害怕被利用而對他人保持距離？",
        "你是否感到自己總是處於緊張狀態，無法放鬆肩頸？",
        "你是否會因為他人的不滿而感到是自己的錯？",
        "你是否覺得自己很難原諒他人？",
        "你是否經常感到無聊，無法找到樂趣？",
        "你是否會因為害怕衝突而避免表達自己的意見？",
        "你是否覺得自己像一個空殼，沒有靈魂？",
        "你是否時常感到頭痛或身體某處疼痛？",
        "你是否會因為害怕被拋棄而緊抓著關係不放？",
        "你是否覺得自己很難感受到真正的快樂？",
        "你是否經常感到力不從心，覺得自己能力不足？",
        "你是否會因為環境的嘈雜而感到煩躁？",
        "你是否覺得自己一直在為別人而活？",
        "你是否會因為擔心未來而無法享受現在？",
        "你是否覺得自己很難找到屬於自己的平靜？",
        "你是否時常感到被困住，沒有出口？",
        "你是否會因為外界的期待而放棄自己的夢想？",
        "你是否覺得自己的情緒起伏很大，難以控制？",
        "你是否會因為擔心犯錯而不敢行動？",
        "你是否感到自己失去了對生活的好奇心？",
        "你是否會因為過度分析而感到不知所措？",
        "你是否覺得自己很難放下對某件事情的執著？",
        "你是否經常感到胸口鬱悶或呼吸不順？",
        "你是否會因為害怕失去控制而緊繃身體？",
        "你是否覺得自己很難真正愛自己？",
        "你是否時常感到自己不夠好？",
        "你是否會因為他人的期待而感到疲憊？",
        "你是否覺得自己的能量被耗盡了？",
        "你是否經常感到空虛，即使身邊有很多人？",
        "你是否會因為害怕失敗而退縮？",
        "你是否覺得自己被過去的陰影所籠罩？",
        "你是否時常感到難以放鬆，即使在休息時？",
        "你是否會因為他人的意見而改變自己的決定？",
        "你是否感到自己的內在聲音被淹沒了？"
    ];

    // 50 個羅馬神話人物的狀態資料庫
    const romanGodsData = [
        {
            "name": "邱比特 (Cupid) 狀態",
            "background": "羅馬神話中的愛神，手持弓箭，象徵著愛情的起始與激情。他調皮而難以捉摸，代表著情感的強大力量，但也可能帶來混亂。",
            "emotion": "熱情、浪漫、渴望連結，但伴隨著不確定感和情感波動。",
            "blendName": "愛神之箭",
            "oils": [{ "name": "玫瑰", "drops": 3 }, { "name": "依蘭", "drops": 2 }, { "name": "佛手柑", "drops": 1 }],
            "warnings": "佛手柑精油具光敏性，使用後應避免日曬。",
            "mantra": "愛，是探索與發現的旅程。願你的心，如箭般勇敢，射向最真實的自己。"
        },
        {
            "name": "維納斯 (Venus) 狀態",
            "background": "美與愛的女神，象徵著美學、和諧與吸引力。她追求完美，是社交場合的焦點，但內心深處可能隱藏著對評價的敏感。",
            "emotion": "和諧、優雅、渴望被欣賞，但伴隨著對完美的焦慮和人際壓力。",
            "blendName": "完美和諧",
            "oils": [{ "name": "茉莉", "drops": 3 }, { "name": "天竺葵", "drops": 2 }, { "name": "薰衣草", "drops": 1 }],
            "warnings": "懷孕初期應避免使用茉莉精油。",
            "mantra": "美麗，不只在於外表，更在於心靈的寧靜。願你的存在，如花般盛開，優雅而從容。"
        },
        {
            "name": "戰神 (Mars) 狀態",
            "background": "戰爭之神，代表著勇氣、決心與行動力。他充滿能量，不畏挑戰，但內心的憤怒與衝突可能讓他顯得衝動，需要找到釋放的管道。",
            "emotion": "勇敢、果斷、充滿鬥志，但伴隨著易怒、焦慮和內在衝突。",
            "blendName": "勇者之心",
            "oils": [{ "name": "茶樹", "drops": 3 }, { "name": "尤加利", "drops": 2 }, { "name": "檸檬", "drops": 1 }],
            "warnings": "尤加利精油請勿直接塗抹於皮膚，敏感肌膚請稀釋使用。",
            "mantra": "你的力量，源於內在的火焰。願你將每一次挑戰，都化為自我成長的燃料。"
        },
        {
            "name": "朱庇特 (Jupiter) 狀態",
            "background": "眾神之王，天空與雷電之神，象徵著權威、領導力與宏偉的視野。他習慣承擔責任，但可能因壓力過大而感到孤獨。",
            "emotion": "自信、領導、富有遠見，但伴隨著責任感過重和疲憊。",
            "blendName": "王者之息",
            "oils": [{ "name": "乳香", "drops": 3 }, { "name": "雪松", "drops": 2 }, { "name": "葡萄柚", "drops": 1 }],
            "warnings": "葡萄柚精油具光敏性，使用後應避免日曬。",
            "mantra": "真正的力量，來自內心的平靜。願你承擔起責任的同時，也能享受屬於自己的那片天空。"
        },
        {
            "name": "墨丘利 (Mercury) 狀態",
            "background": "眾神的信使，掌管商業、旅行與溝通。他思維敏捷、反應快速，能輕鬆應對各種情況，但也可能因過度的資訊而感到混亂。",
            "emotion": "聰明、機智、充滿活力，但伴隨著思慮過多和精神疲勞。",
            "blendName": "思緒清晰",
            "oils": [{ "name": "迷迭香", "drops": 3 }, { "name": "檸檬草", "drops": 2 }, { "name": "薄荷", "drops": 1 }],
            "warnings": "迷迭香精油不建議高血壓患者使用。",
            "mantra": "溝通的藝術，在於清晰的表達。願你整理思緒，讓每個想法都輕盈而有力。"
        },
        {
            "name": "灶神 (Vesta) 狀態",
            "background": "爐火女神，象徵著家庭的中心與永恆的聖火。她內斂、平靜，代表著穩定與內在的安穩。她享受獨處，但也可能與外界脫節。",
            "emotion": "寧靜、穩定、內斂，但伴隨著些許的孤獨感或與世界脫節的疲憊。",
            "blendName": "爐心平靜",
            "oils": [{ "name": "檀香", "drops": 3 }, { "name": "沒藥", "drops": 2 }, { "name": "甜橙", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "願你的內在爐火永遠明亮。在寧靜中找到力量，在溫暖中感受連結。"
        },
        {
            "name": "農神 (Saturn) 狀態",
            "background": "播種與收穫之神，代表著紀律、勤奮與腳踏實地。他重視秩序和結構，但有時會因壓力過大或過度自律而感到沮喪。",
            "emotion": "勤奮、自律、堅忍，但伴隨著沉重的責任感和壓抑。",
            "blendName": "大地之錨",
            "oils": [{ "name": "杜松", "drops": 3 }, { "name": "絲柏", "drops": 2 }, { "name": "廣藿香", "drops": 1 }],
            "warnings": "懷孕期間不建議使用杜松精油。",
            "mantra": "每一份耕耘，都將換來豐盛。願你的腳步穩健，讓每一個努力都開花結果。"
        },
        {
            "name": "狄安娜 (Diana) 狀態",
            "background": "月亮與狩獵女神，象徵著獨立、自由與純潔。她熱愛大自然，享受獨處，但過於獨立可能讓她難以向外尋求幫助。",
            "emotion": "獨立、自由、直覺，但伴隨著孤獨感和不願依賴他人的心態。",
            "blendName": "自由之林",
            "oils": [{ "name": "岩蘭草", "drops": 3 }, { "name": "黑雲杉", "drops": 2 }, { "name": "羅勒", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "你的自由，源於內心的力量。願你翱翔天際的同時，也知道大地永遠是你的歸宿。"
        },
        {
            "name": "密涅瓦 (Minerva) 狀態",
            "background": "智慧女神，掌管藝術、工藝與戰略。她聰明、理性，追求知識與邏輯，但過度理性可能讓她忽略情感層面。",
            "emotion": "理性、聰慧、有條理，但伴隨著情感壓抑和過度分析。",
            "blendName": "智慧之光",
            "oils": [{ "name": "茶樹", "drops": 3 }, { "name": "尤加利", "drops": 2 }, { "name": "迷迭香", "drops": 1 }],
            "warnings": "迷迭香精油不建議高血壓患者使用。",
            "mantra": "智慧與心，是完美的結合。願你用理性的雙眼洞察世界，也用感性的心感受生活。"
        },
        {
            "name": "阿波羅 (Apollo) 狀態",
            "background": "太陽神，掌管音樂、醫藥與光明。他才華橫溢，充滿魅力，但過度追求完美可能讓他感到壓力。",
            "emotion": "樂觀、有才華、充滿活力，但伴隨著對完美的焦慮和自我苛求。",
            "blendName": "太陽之歌",
            "oils": [{ "name": "檸檬", "drops": 3 }, { "name": "佛手柑", "drops": 2 }, { "name": "薰衣草", "drops": 1 }],
            "warnings": "檸檬和佛手柑精油具光敏性，使用後應避免日曬。",
            "mantra": "你的光芒，無需完美來證明。願你接受不完美，並在每一天找到屬於自己的溫暖。"
        },
        {
            "name": "朱諾 (Juno) 狀態",
            "background": "天后，婚姻與家庭的女神。她忠誠、有奉獻精神，但有時會因過度為他人付出而感到疲憊，需要重新找回自我。",
            "emotion": "忠誠、母性、有責任感，但伴隨著身心疲憊和自我忽略。",
            "blendName": "內在之愛",
            "oils": [{ "name": "乳香", "drops": 3 }, { "name": "雪松", "drops": 2 }, { "name": "羅馬洋甘菊", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "愛他人之前，請先愛自己。願你將那份溫柔與奉獻，也留給自己的心靈花園。"
        },
        {
            "name": "寧芙 (Nymph) 狀態",
            "background": "自然界的精靈，掌管樹木、河流與山林。她們與大自然有著深刻的連結，充滿靈性，但有時會因外界的紛擾而感到能量耗盡。",
            "emotion": "靈性、直覺、與自然連結，但伴隨著敏感和能量耗盡。",
            "blendName": "森林之語",
            "oils": [{ "name": "杜松", "drops": 3 }, { "name": "絲柏", "drops": 2 }, { "name": "丁香", "drops": 1 }],
            "warnings": "丁香精油刺激性強，需稀釋使用。",
            "mantra": "你的靈魂，與大自然同頻共振。願你在喧囂中，找到屬於自己的那片寧靜森林。"
        },
        {
            "name": "凱瑞斯 (Ceres) 狀態",
            "background": "豐收女神，代表著滋養、耐心與母愛。她慷慨而充滿愛心，但過度照顧他人可能讓她忽略了自己的需求。",
            "emotion": "滋養、慷慨、耐心，但伴隨著自我犧牲和疲憊。",
            "blendName": "大地之母",
            "oils": [{ "name": "廣藿香", "drops": 3 }, { "name": "依蘭", "drops": 2 }, { "name": "天竺葵", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "給予之前，請先填滿自己。願你像大地一樣，先滋養自己，再用愛去擁抱世界。"
        },
        {
            "name": "涅普頓 (Neptune) 狀態",
            "background": "海神，掌管海洋與河流。他情感豐富、充滿想像力，但情緒如海浪般起伏不定，容易陷入內心世界的波濤洶湧。",
            "emotion": "情感豐富、想像力、直覺強，但伴隨著情緒化和內心混亂。",
            "blendName": "深海之錨",
            "oils": [{ "name": "檀香", "drops": 3 }, { "name": "薰衣草", "drops": 2 }, { "name": "檸檬", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "情緒如海，潮起潮落。願你學會駕馭內心的海浪，在深處找到平靜的港灣。"
        },
        {
            "name": "普羅塞庇娜 (Proserpina) 狀態",
            "background": "冥后，兼具春日女神與冥界女王的雙重身份。她內心充滿矛盾，時而開朗活潑，時而深沉內斂，需要在光明與黑暗中尋找平衡。",
            "emotion": "多變、矛盾、內心複雜，但伴隨著對自我多重面向的困惑。",
            "blendName": "雙子平衡",
            "oils": [{ "name": "甜橙", "drops": 3 }, { "name": "乳香", "drops": 2 }, { "name": "羅馬洋甘菊", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "光明與陰影，都是你的一部分。願你擁抱所有面向的自己，找到屬於你的內在和諧。"
        },
        {
            "name": "福爾圖娜 (Fortuna) 狀態",
            "background": "幸運女神，掌管命運之輪。她樂觀開朗，相信運氣，但有時會因過於依賴外在因素而缺乏內在力量。",
            "emotion": "樂觀、開朗、充滿希望，但伴隨著對運氣的依賴和缺乏掌控感。",
            "blendName": "幸運之輪",
            "oils": [{ "name": "葡萄柚", "drops": 3 }, { "name": "甜橙", "drops": 2 }, { "name": "檸檬", "drops": 1 }],
            "warnings": "葡萄柚和檸檬精油具光敏性，使用後應避免日曬。",
            "mantra": "運氣，是留給有準備的人。願你主動創造自己的機會，讓每一天都充滿美好的可能。"
        },
        {
            "name": "席勒 (Silenus) 狀態",
            "background": "酒神的伴侶，充滿智慧與幽默。他外表歡樂，但內心可能隱藏著孤獨，用表面的熱鬧來掩蓋內心的平靜。",
            "emotion": "幽默、智慧、樂觀，但伴隨著內在的孤獨和不願示弱。",
            "blendName": "智者之盾",
            "oils": [{ "name": "雪松", "drops": 3 }, { "name": "岩蘭草", "drops": 2 }, { "name": "薰衣草", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "在人群中保持真我，在獨處中找到力量。願你的幽默成為連接，而不是掩蓋。"
        },
        {
            "name": "泰提斯 (Thetis) 狀態",
            "background": "海洋女神，充滿母性與保護慾。她深愛自己的孩子，但因為害怕失去而緊抓不放，有時反而會帶來窒息感。",
            "emotion": "母性、保護、充滿愛，但伴隨著焦慮和不願放手。",
            "blendName": "海之擁抱",
            "oils": [{ "name": "佛手柑", "drops": 3 }, { "name": "絲柏", "drops": 2 }, { "name": "玫瑰", "drops": 1 }],
            "warnings": "佛手柑精油具光敏性，使用後應避免日曬。",
            "mantra": "愛，是給予，也是放手。願你信任生命的流動，在每一個擁抱中感受自由。"
        },
        {
            "name": "歐羅芭 (Europa) 狀態",
            "background": "一位勇敢的公主，被朱庇特變成公牛拐走，從此踏上未知的旅程。她熱愛冒險，追求新奇，但有時會因衝動而迷失方向。",
            "emotion": "冒險、好奇、勇敢，但伴隨著衝動和迷失感。",
            "blendName": "冒險家之路",
            "oils": [{ "name": "薄荷", "drops": 3 }, { "name": "迷迭香", "drops": 2 }, { "name": "檸檬草", "drops": 1 }],
            "warnings": "薄荷精油不建議孕婦和幼兒使用。",
            "mantra": "每一個轉彎，都是新的開始。願你的好奇心引領你，在探索中找到真實的自己。"
        },
        {
            "name": "薩拉西亞 (Salacia) 狀態",
            "background": "海神涅普頓的妻子，海洋的化身。她深沉、寧靜，代表著海洋深處的平靜，但也可能因過於內斂而感到情緒淤積。",
            "emotion": "寧靜、深沉、內斂，但伴隨著情感淤積和孤立感。",
            "blendName": "海洋之心",
            "oils": [{ "name": "丁香", "drops": 3 }, { "name": "沒藥", "drops": 2 }, { "name": "檀香", "drops": 1 }],
            "warnings": "丁香精油刺激性強，需稀釋使用。",
            "mantra": "你的內心，是未知的海洋。願你找到自由表達的出口，讓每一個情感都得以流動。"
        },
        {
            "name": "法瑪 (Fama) 狀態",
            "background": "名聲女神，擁有無數雙眼睛與耳朵，能迅速傳播消息。她渴望被認可，但有時會因過於在意他人眼光而感到壓力。",
            "emotion": "渴望認可、重視名聲、敏感，但伴隨著人際壓力與焦慮。",
            "blendName": "內在之聲",
            "oils": [{ "name": "乳香", "drops": 3 }, { "name": "檀香", "drops": 2 }, { "name": "天竺葵", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "世界的聲音很多，但最重要的是你的。願你聆聽內在的聲音，並從中找到真正的自信。"
        },
        {
            "name": "赫爾墨斯 (Hermes) 狀態",
            "background": "眾神的信使，掌管旅行、商業與溝通。他思維敏捷、充滿活力，但有時會因過於忙碌而感到身心俱疲。",
            "emotion": "聰明、機智、充滿活力，但伴隨著身心疲憊和過度勞累。",
            "blendName": "信使之翼",
            "oils": [{ "name": "迷迭香", "drops": 3 }, { "name": "薄荷", "drops": 2 }, { "name": "檸檬", "drops": 1 }],
            "warnings": "迷迭香精油不建議高血壓患者使用。",
            "mantra": "速度不是唯一的指標，休息是為了走更長的路。願你找到屬於自己的節奏，在忙碌中也能保持平靜。"
        },
        {
            "name": "墨忒斯 (Morta) 狀態",
            "background": "命運女神，剪斷生命的線。她沉著、理性、不帶情感，但過於壓抑情感可能讓她感到內在僵硬。",
            "emotion": "理性、冷靜、果斷，但伴隨著情感壓抑和內在僵硬。",
            "blendName": "命運之線",
            "oils": [{ "name": "尤加利", "drops": 3 }, { "name": "檸檬草", "drops": 2 }, { "name": "茶樹", "drops": 1 }],
            "warnings": "尤加利精油請勿直接塗抹於皮膚，敏感肌膚請稀釋使用。",
            "mantra": "生命有其流動的節奏。願你學會柔軟，讓情感自由流動，而非被束縛。"
        },
        {
            "name": "希波墨涅斯 (Hippomenes) 狀態",
            "background": "一位渴望贏得比賽以贏得阿塔蘭塔公主的英雄。他充滿競爭心，渴望成功，但有時會因過度追求而感到焦慮。",
            "emotion": "競爭、渴望成功、堅定，但伴隨著焦慮和壓力。",
            "blendName": "勝利之光",
            "oils": [{ "name": "丁香", "drops": 3 }, { "name": "絲柏", "drops": 2 }, { "name": "雪松", "drops": 1 }],
            "warnings": "丁香精油刺激性強，需稀釋使用。",
            "mantra": "成功的喜悅，在於欣賞過程中的風景。願你享受旅程，而不是只看重結果。"
        },
        {
            "name": "皮盧姆努斯 (Pilumnus) 狀態",
            "background": "農業與烤餅之神，樂於助人，充滿奉獻精神。但有時會因過度付出而感到被掏空，需要學會保護自己的能量。",
            "emotion": "奉獻、慷慨、樂於助人，但伴隨著身心耗竭和自我界線模糊。",
            "blendName": "奉獻之泉",
            "oils": [{ "name": "岩蘭草", "drops": 3 }, { "name": "廣藿香", "drops": 2 }, { "name": "薰衣草", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "你的慷慨是無價的禮物。願你學會先滋養自己，讓愛與能量源源不絕。"
        },
        {
            "name": "赫爾克里斯 (Hercules) 狀態",
            "background": "古希臘神話中最偉大的英雄，擁有強大力量，無所畏懼。他習慣獨自承擔所有挑戰，但有時會感到不堪重負。",
            "emotion": "強大、勇敢、堅韌，但伴隨著疲憊和不願尋求幫助。",
            "blendName": "英雄之盾",
            "oils": [{ "name": "尤加利", "drops": 3 }, { "name": "迷迭香", "drops": 2 }, { "name": "雪松", "drops": 1 }],
            "warnings": "尤加利精油請勿直接塗抹於皮膚，敏感肌膚請稀釋使用。",
            "mantra": "真正的勇氣，是懂得何時放下。願你學會分享重擔，讓他人也能成為你的力量。"
        },
        {
            "name": "阿特拉斯 (Atlas) 狀態",
            "background": "一位泰坦神，因懲罰而被迫扛起天空。他充滿責任感，堅韌不拔，但有時會因背負太多而感到疲憊不堪。",
            "emotion": "負責任、堅韌、有毅力，但伴隨著身心疲憊和沉重感。",
            "blendName": "天空之柱",
            "oils": [{ "name": "絲柏", "drops": 3 }, { "name": "檀香", "drops": 2 }, { "name": "乳香", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "你不是一個人面對世界。願你找到能讓自己喘息的空間，將重擔轉化為成長的基石。"
        },
        {
            "name": "俄爾甫斯 (Orpheus) 狀態",
            "background": "一位才華橫溢的音樂家，他的音樂能打動萬物。他充滿創造力，熱愛藝術，但有時會因過於理想化而感到失落。",
            "emotion": "創造力、藝術家氣質、敏感，但伴隨著理想與現實的落差。",
            "blendName": "靈感之弦",
            "oils": [{ "name": "茉莉", "drops": 3 }, { "name": "玫瑰", "drops": 2 }, { "name": "廣藿香", "drops": 1 }],
            "warnings": "懷孕初期應避免使用茉莉精油。",
            "mantra": "藝術源於生活，也將回歸生活。願你將夢想融入現實，讓每一次創作都充滿生命力。"
        },
        {
            "name": "喀戎 (Chiron) 狀態",
            "background": "一位半人馬族的智者與老師，擅長療癒。他充滿智慧，能幫助他人療癒，但有時會因過度關注他人的傷口而忽略了自己。",
            "emotion": "智慧、同理心、療癒者，但伴隨著自我忽略和疲憊。",
            "blendName": "療癒之手",
            "oils": [{ "name": "沒藥", "drops": 3 }, { "name": "乳香", "drops": 2 }, { "name": "羅馬洋甘菊", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "先治癒自己，才能照亮他人。願你將那份療癒的力量，也給予自己的心靈。"
        },
        {
            "name": "卡米拉 (Camilla) 狀態",
            "background": "一位女戰士，動作迅速，無所畏懼。她獨立、堅強，但有時會因過於急躁而錯失機會，需要放慢腳步。",
            "emotion": "獨立、堅強、果斷，但伴隨著急躁和衝動。",
            "blendName": "戰士之憩",
            "oils": [{ "name": "檸檬", "drops": 3 }, { "name": "葡萄柚", "drops": 2 }, { "name": "薄荷", "drops": 1 }],
            "warnings": "檸檬和葡萄柚精油具光敏性，使用後應避免日曬。",
            "mantra": "速度不是唯一的指標，節奏才是。願你學會享受當下，在每一個腳步中感受平靜。"
        },
        {
            "name": "法烏斯 (Faunus) 狀態",
            "background": "山林之神，代表著自然與野性。他熱愛自然，充滿自由精神，但有時會因過於自由而感到沒有歸屬感。",
            "emotion": "自由、野性、與自然連結，但伴隨著孤獨和無根感。",
            "blendName": "大地歸屬",
            "oils": [{ "name": "岩蘭草", "drops": 3 }, { "name": "檀香", "drops": 2 }, { "name": "雪松", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "你的心，是大地的延伸。願你找到一個能讓你感到安心的地方，讓心靈得以歸根。"
        },
        {
            "name": "埃涅阿斯 (Aeneas) 狀態",
            "background": "特洛伊的英雄，肩負著建立新國家的使命。他充滿使命感，堅定不移，但有時會因過於執著而忽略了身邊的人。",
            "emotion": "使命感、堅定、有毅力，但伴隨著執著和人際關係的緊張。",
            "blendName": "英雄之途",
            "oils": [{ "name": "雪松", "drops": 3 }, { "name": "乳香", "drops": 2 }, { "name": "羅勒", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "前方的路，與身邊的人同樣重要。願你在追求使命的同時，也能好好珍惜每個與你同行的人。"
        },
        {
            "name": "普羅米修斯 (Prometheus) 狀態",
            "background": "一位泰坦神，從奧林帕斯山盜取火種送給人類。他充滿創造力，勇於挑戰權威，但有時會因過於衝動而帶來風險。",
            "emotion": "創造力、挑戰精神、獨立，但伴隨著衝動和魯莽。",
            "blendName": "火種之光",
            "oils": [{ "name": "茶樹", "drops": 3 }, { "name": "尤加利", "drops": 2 }, { "name": "檸檬", "drops": 1 }],
            "warnings": "尤加利精油請勿直接塗抹於皮膚，敏感肌膚請稀釋使用。",
            "mantra": "創新是勇氣的結晶。願你用智慧駕馭那份熱情，讓每一次創造都充滿希望。"
        },
        {
            "name": "達芙妮 (Daphne) 狀態",
            "background": "一位熱愛自由的寧芙，不願被束縛。她追求自由，不願被情感所困，但也因此感到孤單。",
            "emotion": "自由、獨立、不願被束縛，但伴隨著對親密關係的恐懼和孤獨。",
            "blendName": "自由之歌",
            "oils": [{ "name": "薰衣草", "drops": 3 }, { "name": "羅馬洋甘菊", "drops": 2 }, { "name": "甜橙", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "真正的自由，是心靈的自由。願你信任，並敞開心扉，讓愛與連結滋養你的靈魂。"
        },
        {
            "name": "赫爾辛尼 (Hercynia) 狀態",
            "background": "古羅馬神話中的一位森林女神，充滿神秘感，內心深邃。她不輕易向外界敞開，但內心的封閉也讓她感到孤立。",
            "emotion": "神秘、內斂、深邃，但伴隨著孤立感和封閉。",
            "blendName": "神秘之森",
            "oils": [{ "name": "岩蘭草", "drops": 3 }, { "name": "沒藥", "drops": 2 }, { "name": "檀香", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "你的內心，是獨一無二的寶藏。願你找到一個能讓你感到安全的空間，將這份美好分享給值得的人。"
        },
        {
            "name": "科里亞 (Coria) 狀態",
            "background": "農業女神，代表著豐饒與母愛。她慷慨，充滿愛心，但有時會因過度付出而感到疲憊。",
            "emotion": "慷慨、母愛、奉獻，但伴隨著身心疲憊和自我忽略。",
            "blendName": "豐饒之土",
            "oils": [{ "name": "玫瑰", "drops": 3 }, { "name": "依蘭", "drops": 2 }, { "name": "天竺葵", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "你的愛是無盡的源泉。願你先滋養自己，才能讓這份愛流向更遠的地方。"
        },
        {
            "name": "維多利亞 (Victoria) 狀態",
            "background": "勝利女神，充滿鬥志，渴望榮耀。她追求成功，但有時會因過度競爭而感到焦慮。",
            "emotion": "鬥志、競爭、渴望勝利，但伴隨著焦慮和壓力。",
            "blendName": "勝利之翼",
            "oils": [{ "name": "檸檬", "drops": 3 }, { "name": "葡萄柚", "drops": 2 }, { "name": "薄荷", "drops": 1 }],
            "warnings": "檸檬和葡萄柚精油具光敏性，使用後應避免日曬。",
            "mantra": "成功之路，由每一個腳步鋪成。願你享受旅程，在每一個小小的勝利中，找到真正的喜悅。"
        },
        {
            "name": "波莫娜 (Pomona) 狀態",
            "background": "果樹女神，掌管果實的成長。她樂於享受生活，充滿喜悅，但有時會因害怕改變而固守現狀。",
            "emotion": "喜悅、滿足、樂於享受，但伴隨著對變化的恐懼和固執。",
            "blendName": "果實之樂",
            "oils": [{ "name": "甜橙", "drops": 3 }, { "name": "佛手柑", "drops": 2 }, { "name": "葡萄柚", "drops": 1 }],
            "warnings": "所有柑橘類精油皆具光敏性，使用後應避免日曬。",
            "mantra": "生命如四季，變化帶來新生。願你擁抱每一個改變，讓生命更加豐富。"
        },
        {
            "name": "維圖姆努斯 (Vertumnus) 狀態",
            "background": "季節與變革之神，能隨季節變換外貌。他善於適應，充滿變革精神，但有時會因過於多變而感到混亂。",
            "emotion": "適應性、多變、靈活，但伴隨著混亂和缺乏穩定感。",
            "blendName": "變革之錨",
            "oils": [{ "name": "迷迭香", "drops": 3 }, { "name": "尤加利", "drops": 2 }, { "name": "茶樹", "drops": 1 }],
            "warnings": "迷迭香精油不建議高血壓患者使用。",
            "mantra": "變化是成長的印記。願你找到內心的錨點，在多變的世界中保持堅定。"
        },
        {
            "name": "潘 (Pan) 狀態",
            "background": "山林與牧神，充滿野性與自由。他熱愛大自然，充滿生機，但有時會因過於放縱而感到迷失。",
            "emotion": "自由、野性、直覺，但伴隨著迷失和無序。",
            "blendName": "野性之靈",
            "oils": [{ "name": "岩蘭草", "drops": 3 }, { "name": "絲柏", "drops": 2 }, { "name": "廣藿香", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "回歸自然，找回真實的你。願你在自由的探索中，發現心靈的歸宿。"
        },
        {
            "name": "狄俄尼索斯 (Dionysus) 狀態",
            "background": "酒神，代表著歡樂、熱情與狂喜。他享受當下，充滿生命力，但有時會因過度沉溺於享樂而感到空虛。",
            "emotion": "熱情、享樂、充滿活力，但伴隨著空虛和失控。",
            "blendName": "狂喜之舞",
            "oils": [{ "name": "依蘭", "drops": 3 }, { "name": "茉莉", "drops": 2 }, { "name": "檀香", "drops": 1 }],
            "warnings": "懷孕初期應避免使用茉莉精油。",
            "mantra": "真正的快樂，來自內心的豐盛。願你享受每一個當下，在狂喜中也能找到心靈的平靜。"
        },
        {
            "name": "阿瑞斯 (Ares) 狀態",
            "background": "戰爭之神，代表著衝動、暴力與衝突。他充滿攻擊性，敢於冒險，但有時會因無法控制情緒而傷害自己或他人。",
            "emotion": "衝動、憤怒、攻擊性，但伴隨著情感失控。",
            "blendName": "憤怒之釋",
            "oils": [{ "name": "檸檬草", "drops": 3 }, { "name": "茶樹", "drops": 2 }, { "name": "尤加利", "drops": 1 }],
            "warnings": "尤加利精油請勿直接塗抹於皮膚，敏感肌膚請稀釋使用。",
            "mantra": "你的力量，是為了保護，而非傷害。願你將那份衝動，轉化為改變世界的決心。"
        },
        {
            "name": "赫爾墨斯 (Hermes) 狀態",
            "background": "眾神的信使，掌管旅行、商業與溝通。他思維敏捷、充滿活力，但有時會因過於忙碌而感到身心俱疲。",
            "emotion": "聰明、機智、充滿活力，但伴隨著身心疲憊和過度勞累。",
            "blendName": "信使之翼",
            "oils": [{ "name": "迷迭香", "drops": 3 }, { "name": "薄荷", "drops": 2 }, { "name": "檸檬", "drops": 1 }],
            "warnings": "迷迭香精油不建議高血壓患者使用。",
            "mantra": "速度不是唯一的指標，休息是為了走更長的路。願你找到屬於自己的節奏，在忙碌中也能保持平靜。"
        },
        {
            "name": "克洛里斯 (Chloris) 狀態",
            "background": "花神，代表著春天與新生。她充滿希望，熱愛生命，但有時會因害怕失去美好而感到焦慮。",
            "emotion": "希望、樂觀、充滿生機，但伴隨著對失去的恐懼和焦慮。",
            "blendName": "新生之花",
            "oils": [{ "name": "佛手柑", "drops": 3 }, { "name": "甜橙", "drops": 2 }, { "name": "薰衣草", "drops": 1 }],
            "warnings": "佛手柑精油具光敏性，使用後應避免日曬。",
            "mantra": "生命如花，有開有落。願你珍惜每一個當下，並相信每一次的結束，都是另一個美好的開始。"
        },
        {
            "name": "普路托 (Pluto) 狀態",
            "background": "冥王，掌管地下世界與財富。他內心深沉，充滿洞察力，但有時會因過於孤僻而與世界隔離。",
            "emotion": "深沉、洞察力、內斂，但伴隨著孤僻和與人隔離。",
            "blendName": "冥府之光",
            "oils": [{ "name": "岩蘭草", "drops": 3 }, { "name": "沒藥", "drops": 2 }, { "name": "乳香", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "真正的財富，來自心靈的豐盛。願你找到一個能讓你感到安全的連結，讓內在的光芒得以分享。"
        },
        {
            "name": "歐忒耳珀 (Euterpe) 狀態",
            "background": "掌管音樂與抒情詩的繆斯女神。她充滿喜悅，熱愛音樂，但有時會因過度沉溺於美好而忽略了現實。",
            "emotion": "喜悅、熱愛藝術、充滿靈感，但伴隨著對現實的逃避。",
            "blendName": "繆斯之聲",
            "oils": [{ "name": "依蘭", "drops": 3 }, { "name": "羅馬洋甘菊", "drops": 2 }, { "name": "甜橙", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "藝術源於生活，也將回歸生活。願你找到平衡，讓夢想與現實並行，創造出更動人的樂章。"
        },
        {
            "name": "忒彌斯 (Themis) 狀態",
            "background": "正義女神，代表著法律與公平。她追求公正，富有正義感，但有時會因過於嚴苛而感到疲憊。",
            "emotion": "公正、理性、正義感，但伴隨著過度嚴苛和疲憊。",
            "blendName": "正義之秤",
            "oils": [{ "name": "檀香", "drops": 3 }, { "name": "絲柏", "drops": 2 }, { "name": "羅勒", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "真正的正義，源於內心的寬容。願你對自己和他人更溫柔，讓每一份判斷都充滿愛與理解。"
        },
        {
            "name": "波塞頓 (Poseidon) 狀態",
            "background": "海神，掌管海洋與地震。他情感豐富，充滿力量，但有時會因情緒的波濤洶湧而感到失控。",
            "emotion": "情感豐富、有力量、有魅力，但伴隨著情緒化和失控。",
            "blendName": "海神之息",
            "oils": [{ "name": "薰衣草", "drops": 3 }, { "name": "沒藥", "drops": 2 }, { "name": "雪松", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "你的內心，如同海洋般深邃。願你學會駕馭情緒的浪潮，在每一個潮起潮落中找到平靜。"
        },
        {
            "name": "阿喀琉斯 (Achilles) 狀態",
            "background": "古希臘神話中最偉大的英雄，無所畏懼。他渴望榮耀，但過於驕傲讓他忽略了自身的脆弱。",
            "emotion": "勇敢、渴望榮耀、驕傲，但伴隨著脆弱和自大。",
            "blendName": "英雄之淚",
            "oils": [{ "name": "尤加利", "drops": 3 }, { "name": "迷迭香", "drops": 2 }, { "name": "檸檬草", "drops": 1 }],
            "warnings": "尤加利精油請勿直接塗抹於皮膚，敏感肌膚請稀釋使用。",
            "mantra": "承認脆弱，是真正的勇敢。願你擁抱所有不完美，讓自己變得更強大。"
        },
        {
            "name": "厄洛斯 (Eros) 狀態",
            "background": "原始的愛神，代表著原始的慾望與生命力。他充滿慾望，渴望連結，但有時會因過於依賴感官刺激而感到空虛。",
            "emotion": "慾望、原始力量、渴望連結，但伴隨著空虛和不滿足。",
            "blendName": "原始之愛",
            "oils": [{ "name": "依蘭", "drops": 3 }, { "name": "茉莉", "drops": 2 }, { "name": "檀香", "drops": 1 }],
            "warnings": "懷孕初期應避免使用茉莉精油。",
            "mantra": "愛，不僅是慾望的火焰，更是心靈的連結。願你尋找那份能滋養靈魂的愛，讓自己感到完整。"
        },
        {
            "name": "赫柏 (Hebe) 狀態",
            "background": "青春女神，掌管青春與永恆。她充滿活力，樂觀向上，但有時會因害怕長大而逃避現實。",
            "emotion": "青春、活力、樂觀，但伴隨著對成長的恐懼和逃避。",
            "blendName": "青春之泉",
            "oils": [{ "name": "甜橙", "drops": 3 }, { "name": "檸檬", "drops": 2 }, { "name": "薄荷", "drops": 1 }],
            "warnings": "檸檬精油具光敏性，使用後應避免日曬。",
            "mantra": "每一個年紀，都有其獨特的美。願你勇敢前行，讓歲月成為你最珍貴的禮物。"
        },
        {
            "name": "法厄同 (Phaethon) 狀態",
            "background": "太陽神之子，因過於驕傲而駕馭太陽馬車失敗。他充滿野心，渴望證明自己，但有時會因衝動而帶來災難。",
            "emotion": "野心、勇敢、渴望證明，但伴隨著驕傲和衝動。",
            "blendName": "驕陽之夢",
            "oils": [{ "name": "迷迭香", "drops": 3 }, { "name": "尤加利", "drops": 2 }, { "name": "茶樹", "drops": 1 }],
            "warnings": "迷迭香精油不建議高血壓患者使用。",
            "mantra": "夢想的光芒，需要智慧來駕馭。願你用謙遜的心，讓每一個夢想都得以實現。"
        },
        {
            "name": "潘多拉 (Pandora) 狀態",
            "background": "首位女性，因好奇而打開了裝滿災難的盒子。她充滿好奇心，渴望探索，但有時會因無法控制而帶來混亂。",
            "emotion": "好奇、探索、不願受限，但伴隨著混亂和後悔。",
            "blendName": "希望之盒",
            "oils": [{ "name": "佛手柑", "drops": 3 }, { "name": "薰衣草", "drops": 2 }, { "name": "天竺葵", "drops": 1 }],
            "warnings": "佛手柑精油具光敏性，使用後應避免日曬。",
            "mantra": "好奇心，是打開世界的鑰匙。願你帶著那份天真的好奇，在探索中找到希望。"
        },
        {
            "name": "波斯波莉娜 (Persephone) 狀態",
            "background": "冥后，兼具春日女神與冥界女王的雙重身份。她內心充滿矛盾，時而開朗活潑，時而深沉內斂，需要在光明與黑暗中尋找平衡。",
            "emotion": "多變、矛盾、內心複雜，但伴隨著對自我多重面向的困惑。",
            "blendName": "平衡之光",
            "oils": [{ "name": "甜橙", "drops": 3 }, { "name": "乳香", "drops": 2 }, { "name": "羅馬洋甘菊", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "光明與陰影，都是你的一部分。願你擁抱所有面向的自己，找到內在的和諧。"
        },
        {
            "name": "西西弗斯 (Sisyphus) 狀態",
            "background": "一位因欺騙眾神而受罰，永恆地將巨石推上山頂的國王。他堅韌、永不放棄，但有時會感到生活徒勞無功。",
            "emotion": "堅韌、有毅力、不屈不撓，但伴隨著無助感和徒勞。",
            "blendName": "永恆之石",
            "oils": [{ "name": "岩蘭草", "drops": 3 }, { "name": "廣藿香", "drops": 2 }, { "name": "絲柏", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "每一步，都是有意義的。願你將那份堅韌，轉化為生活的力量，而不是無謂的掙扎。"
        },
        {
            "name": "雅典娜 (Athena) 狀態",
            "background": "智慧與戰爭女神，代表著策略、理性與秩序。她聰明、有遠見，但過於嚴肅可能讓她忽略情感層面。",
            "emotion": "智慧、理性、有策略，但伴隨著情感壓抑和嚴肅。",
            "blendName": "智慧之盾",
            "oils": [{ "name": "茶樹", "drops": 3 }, { "name": "迷迭香", "drops": 2 }, { "name": "乳香", "drops": 1 }],
            "warnings": "迷迭香精油不建議高血壓患者使用。",
            "mantra": "智慧與溫柔，是真正的力量。願你用理性的雙眼洞察世界，也用溫柔的心擁抱自己。"
        },
        {
            "name": "赫菲斯托斯 (Hephaestus) 狀態",
            "background": "火神與工匠之神，跛足但技藝精湛。他充滿創造力，專注於自己的作品，但有時會因孤獨而感到不被理解。",
            "emotion": "創造力、專注、勤奮，但伴隨著孤獨和不被理解。",
            "blendName": "工匠之火",
            "oils": [{ "name": "雪松", "drops": 3 }, { "name": "沒藥", "drops": 2 }, { "name": "尤加利", "drops": 1 }],
            "warnings": "尤加利精油請勿直接塗抹於皮膚，敏感肌膚請稀釋使用。",
            "mantra": "你的價值，不在於他人的眼光。願你專注於內心的熱情，用你的雙手創造屬於你的世界。"
        },
        {
            "name": "阿斯克勒庇俄斯 (Asclepius) 狀態",
            "background": "醫神，代表著療癒與生命。他充滿同理心，擅長治癒，但有時會因過度付出而感到疲憊。",
            "emotion": "同理心、療癒、關懷，但伴隨著身心疲憊和耗竭。",
            "blendName": "醫者之光",
            "oils": [{ "name": "乳香", "drops": 3 }, { "name": "檀香", "drops": 2 }, { "name": "羅馬洋甘菊", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "你先填滿自己，才能更好地幫助他人。願你照顧好自己的心靈，讓愛與能量源源不絕。"
        },
        {
            "name": "哈得斯 (Hades) 狀態",
            "background": "冥王，掌管地下世界。他深沉、內斂，不輕易表達情感，但內心充滿力量與洞察力。",
            "emotion": "深沉、內斂、有洞察力，但伴隨著孤獨和冷漠。",
            "blendName": "冥界之聲",
            "oils": [{ "name": "岩蘭草", "drops": 3 }, { "name": "沒藥", "drops": 2 }, { "name": "廣藿香", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "你的深邃，是獨一無二的力量。願你信任那份洞察力，並找到一個能理解你內心世界的夥伴。"
        },
        {
            "name": "阿爾忒彌斯 (Artemis) 狀態",
            "background": "月亮與狩獵女神，代表著獨立與自由。她專注於自己的目標，不願被情感束縛，但有時會因此感到孤單。",
            "emotion": "獨立、專注、自由，但伴隨著孤獨感和不願依賴他人。",
            "blendName": "月神之箭",
            "oils": [{ "name": "絲柏", "drops": 3 }, { "name": "黑雲杉", "drops": 2 }, { "name": "羅勒", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "你的獨立，是你的力量。願你享受獨處的時光，並找到能與你並肩同行的夥伴。"
        },
        {
            "name": "阿芙蘿狄忒 (Aphrodite) 狀態",
            "background": "美與愛之女神，代表著美麗、吸引力與慾望。她充滿魅力，但有時會因過於追求外在而忽略內心。",
            "emotion": "美麗、充滿魅力、感性，但伴隨著對外在的追求和空虛感。",
            "blendName": "女神之美",
            "oils": [{ "name": "玫瑰", "drops": 3 }, { "name": "依蘭", "drops": 2 }, { "name": "天竺葵", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "真正的美麗，來自內心的光芒。願你從內在開始滋養自己，讓美麗由內而外散發。"
        },
        {
            "name": "阿基米德 (Archimedes) 狀態",
            "background": "古希臘的數學家與發明家，代表著智慧與創造力。他專注於思考與發明，但有時會因過度沉迷於內心世界而與外界脫節。",
            "emotion": "智慧、創造力、專注，但伴隨著孤獨和與人隔離。",
            "blendName": "智慧之光",
            "oils": [{ "name": "迷迭香", "drops": 3 }, { "name": "尤加利", "drops": 2 }, { "name": "茶樹", "drops": 1 }],
            "warnings": "迷迭香精油不建議高血壓患者使用。",
            "mantra": "思想的力量，足以改變世界。願你在內心探索的同時，也找到與外界連結的橋樑。"
        },
        {
            "name": "克羅諾斯 (Kronos) 狀態",
            "background": "泰坦神之王，掌管時間。他擁有巨大的力量，但因害怕被取代而吞噬了自己的孩子。",
            "emotion": "力量、權威、控制，但伴隨著焦慮和不安全感。",
            "blendName": "時間之軸",
            "oils": [{ "name": "檀香", "drops": 3 }, { "name": "乳香", "drops": 2 }, { "name": "絲柏", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "時間會證明一切。願你放下對未來的恐懼，信任生命的進程，讓每一刻都充滿平靜。"
        },
        {
            "name": "赫爾墨斯 (Hermes) 狀態",
            "background": "眾神的信使，掌管旅行、商業與溝通。他思維敏捷、充滿活力，但有時會因過於忙碌而感到身心俱疲。",
            "emotion": "聰明、機智、充滿活力，但伴隨著身心疲憊和過度勞累。",
            "blendName": "信使之翼",
            "oils": [{ "name": "迷迭香", "drops": 3 }, { "name": "薄荷", "drops": 2 }, { "name": "檸檬", "drops": 1 }],
            "warnings": "迷迭香精油不建議高血壓患者使用。",
            "mantra": "速度不是唯一的指標，休息是為了走更長的路。願你找到屬於自己的節奏，在忙碌中也能保持平靜。"
        },
        {
            "name": "狄俄尼索斯 (Dionysus) 狀態",
            "background": "酒神，代表著歡樂、熱情與狂喜。他享受當下，充滿生命力，但有時會因過度沉溺於享樂而感到空虛。",
            "emotion": "熱情、享樂、充滿活力，但伴隨著空虛和失控。",
            "blendName": "狂喜之舞",
            "oils": [{ "name": "依蘭", "drops": 3 }, { "name": "茉莉", "drops": 2 }, { "name": "檀香", "drops": 1 }],
            "warnings": "懷孕初期應避免使用茉莉精油。",
            "mantra": "真正的快樂，來自內心的豐盛。願你享受每一個當下，在狂喜中也能找到心靈的平靜。"
        },
        {
            "name": "希臘的命運三女神 (The Fates) 狀態",
            "background": "掌管所有人的命運，從出生到死亡。她們理性、嚴苛，不帶情感，代表著對一切的掌控。",
            "emotion": "理性、控制、嚴苛，但伴隨著情感壓抑和孤立。",
            "blendName": "命運之光",
            "oils": [{ "name": "尤加利", "drops": 3 }, { "name": "檸檬草", "drops": 2 }, { "name": "茶樹", "drops": 1 }],
            "warnings": "尤加利精油請勿直接塗抹於皮膚，敏感肌膚請稀釋使用。",
            "mantra": "你，是自己命運的設計師。願你用溫柔的雙手，編織出屬於自己的美好人生。"
        },
        {
            "name": "赫爾墨斯 (Hermes) 狀態",
            "background": "眾神的信使，掌管旅行、商業與溝通。他思維敏捷、充滿活力，但有時會因過於忙碌而感到身心俱疲。",
            "emotion": "聰明、機智、充滿活力，但伴隨著身心疲憊和過度勞累。",
            "blendName": "信使之翼",
            "oils": [{ "name": "迷迭香", "drops": 3 }, { "name": "薄荷", "drops": 2 }, { "name": "檸檬", "drops": 1 }],
            "warnings": "迷迭香精油不建議高血壓患者使用。",
            "mantra": "速度不是唯一的指標，休息是為了走更長的路。願你找到屬於自己的節奏，在忙碌中也能保持平靜。"
        },
        {
            "name": "克洛里斯 (Chloris) 狀態",
            "background": "花神，代表著春天與新生。她充滿希望，熱愛生命，但有時會因害怕失去美好而感到焦慮。",
            "emotion": "希望、樂觀、充滿生機，但伴隨著對失去的恐懼和焦慮。",
            "blendName": "新生之花",
            "oils": [{ "name": "佛手柑", "drops": 3 }, { "name": "甜橙", "drops": 2 }, { "name": "薰衣草", "drops": 1 }],
            "warnings": "佛手柑精油具光敏性，使用後應避免日曬。",
            "mantra": "生命如花，有開有落。願你珍惜每一個當下，並相信每一次的結束，都是另一個美好的開始。"
        },
        {
            "name": "普路托 (Pluto) 狀態",
            "background": "冥王，掌管地下世界與財富。他內心深沉，充滿洞察力，但有時會因過於孤僻而與世界隔離。",
            "emotion": "深沉、洞察力、內斂，但伴隨著孤僻和與人隔離。",
            "blendName": "冥府之光",
            "oils": [{ "name": "岩蘭草", "drops": 3 }, { "name": "沒藥", "drops": 2 }, { "name": "乳香", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "真正的財富，來自心靈的豐盛。願你找到一個能讓你感到安全的連結，讓內在的光芒得以分享。"
        },
        {
            "name": "歐忒耳珀 (Euterpe) 狀態",
            "background": "掌管音樂與抒情詩的繆斯女神。她充滿喜悅，熱愛音樂，但有時會因過度沉溺於美好而忽略了現實。",
            "emotion": "喜悅、熱愛藝術、充滿靈感，但伴隨著對現實的逃避。",
            "blendName": "繆斯之聲",
            "oils": [{ "name": "依蘭", "drops": 3 }, { "name": "羅馬洋甘菊", "drops": 2 }, { "name": "甜橙", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "藝術源於生活，也將回歸生活。願你找到平衡，讓夢想與現實並行，創造出更動人的樂章。"
        },
        {
            "name": "忒彌斯 (Themis) 狀態",
            "background": "正義女神，代表著法律與公平。她追求公正，富有正義感，但有時會因過於嚴苛而感到疲憊。",
            "emotion": "公正、理性、正義感，但伴隨著過度嚴苛和疲憊。",
            "blendName": "正義之秤",
            "oils": [{ "name": "檀香", "drops": 3 }, { "name": "絲柏", "drops": 2 }, { "name": "羅勒", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "真正的正義，源於內心的寬容。願你對自己和他人更溫柔，讓每一份判斷都充滿愛與理解。"
        },
        {
            "name": "波塞頓 (Poseidon) 狀態",
            "background": "海神，掌管海洋與地震。他情感豐富，充滿力量，但有時會因情緒的波濤洶湧而感到失控。",
            "emotion": "情感豐富、有力量、有魅力，但伴隨著情緒化和失控。",
            "blendName": "海神之息",
            "oils": [{ "name": "薰衣草", "drops": 3 }, { "name": "沒藥", "drops": 2 }, { "name": "雪松", "drops": 1 }],
            "warnings": "無特殊警告。",
            "mantra": "你的內心，如同海洋般深邃。願你學會駕馭情緒的浪潮，在每一個潮起潮落中找到平靜。"
        },
        {
            "name": "阿喀琉斯 (Achilles) 狀態",
            "background": "古希臘神話中最偉大的英雄，無所畏懼。他渴望榮耀，但過於驕傲讓他忽略了自身的脆弱。",
            "emotion": "勇敢、渴望榮耀、驕傲，但伴隨著脆弱和自大。",
            "blendName": "英雄之淚",
            "oils": [{ "name": "尤加利", "drops": 3 }, { "name": "迷迭香", "drops": 2 }, { "name": "檸檬草", "drops": 1 }],
            "warnings": "尤加利精油請勿直接塗抹於皮膚，敏感肌膚請稀釋使用。",
            "mantra": "承認脆弱，是真正的勇敢。願你擁抱所有不完美，讓自己變得更強大。"
        }
    ];

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    // 開始測驗
    function startTest() {
        introScreen.classList.remove('active');
        testScreen.classList.add('active');
        
        currentQuestions = shuffle(allQuestions).slice(0, 8);
        currentStep = 0;
        showQuestion(currentStep);
    }

    // 顯示題目
    function showQuestion(index) {
        if (index >= currentQuestions.length) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
            return;
        }

        nextBtn.style.display = 'block';
        const qText = currentQuestions[index];
        const cardHTML = `
            <div class="question-card">
                <p class="question-text">${qText}</p>
                <div class="options">
                    <button class="option-btn" data-value="1">從不</button>
                    <button class="option-btn" data-value="2">偶爾</button>
                    <button class="option-btn" data-value="3">經常</button>
                    <button class="option-btn" data-value="4">總是</button>
                </div>
            </div>
        `;
        questionContainer.innerHTML = cardHTML;
        
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
                userAnswers[qText] = parseInt(e.target.dataset.value);
            });
        });
    }

    // 進入下一題
    function goToNextQuestion() {
        const selectedOption = document.querySelector('.option-btn.selected');
        if (!selectedOption) {
            alert('請選擇一個選項！');
            return;
        }
        currentStep++;
        showQuestion(currentStep);
    }

    // 送出測驗並顯示結果 (這裡做了重大調整)
    function submitTest() {
        if (Object.keys(userAnswers).length < currentQuestions.length) {
            alert('請完成所有問題！');
            return;
        }

        testScreen.classList.remove('active');
        resultScreen.classList.add('active');
        resultContent.innerHTML = '<h2>正在為您分析心靈狀態...</h2>';

        // 從資料庫中隨機選擇一個結果
        const randomIndex = Math.floor(Math.random() * romanGodsData.length);
        const chosenGod = romanGodsData[randomIndex];

        // 動態生成精油列表
        const oilsListHTML = chosenGod.oils.map(oil => `
            <li>${oil.name}：${oil.drops}滴（${getOilDescription(oil.name)}）</li>
        `).join('');

        const resultHtml = `
            <h2>心靈狀態分析</h2>
            <h3>羅馬神話人物：${chosenGod.name}</h3>
            <p><strong>人物背景：</strong>${chosenGod.background}</p>
            <p><strong>個性與狀態：</strong>${chosenGod.emotion}</p>
            
            <h2>精油配方建議</h2>
            <h3>「${chosenGod.blendName}」複方精油</h3>
            <ul>
                ${oilsListHTML}
            </ul>
            
            <h2>使用方式與注意事項</h2>
            <p><strong>使用方式：</strong>建議將調配好的複方精油滴入擴香儀器中，讓香氣充滿你的個人空間。或者，將數滴精油與基底油（如甜杏仁油）混合後，輕輕塗抹於胸口或手腕內側，輕輕嗅吸，感受溫暖與平靜的力量。</p>
            <p><strong>警告提示：</strong>${chosenGod.warnings}</p>
            
            <h2>心靈小語</h2>
            <p>${chosenGod.mantra}</p>
        `;
        
        resultContent.innerHTML = resultHtml;
    }

    // 精油描述的函式
    function getOilDescription(oilName) {
        const descriptions = {
            "玫瑰": "幫助心靈沉澱，回歸內在的平靜",
            "依蘭": "帶來深層的安心感，幫助釋放壓力",
            "佛手柑": "提振心情，為內斂的你帶來陽光與溫暖",
            "茉莉": "帶來深層的安心感，幫助釋放壓力",
            "天竺葵": "平衡情緒，找回內在的穩定",
            "薰衣草": "放鬆身心，幫助穩定情緒",
            "茶樹": "淨化身心，帶來清晰的思緒",
            "尤加利": "振奮精神，幫助能量流通",
            "檸檬": "提振心情，帶來正向的能量",
            "乳香": "幫助心靈沉澱，回歸內在的平靜",
            "雪松": "給予穩定與支持，幫助心靈歸根",
            "葡萄柚": "提振心情，幫助釋放壓力",
            "迷迭香": "提升專注力，帶來清晰的思緒",
            "檸檬草": "淨化負面能量，帶來清新感",
            "薄荷": "提神醒腦，幫助思緒清晰",
            "檀香": "幫助心靈沉澱，回歸內在的平靜",
            "沒藥": "帶來深層的安心感，幫助釋放壓力",
            "甜橙": "提振心情，帶來陽光與溫暖",
            "杜松": "淨化身心，幫助排除負面能量",
            "絲柏": "帶來穩定與支持，幫助心靈歸根",
            "廣藿香": "幫助心靈沉澱，回歸內在的平靜",
            "岩蘭草": "帶來穩定與支持，幫助心靈歸根",
            "黑雲杉": "幫助心靈沉澱，回歸內在的平靜",
            "羅勒": "振奮精神，幫助思緒清晰",
            "羅馬洋甘菊": "鎮定情緒，幫助身心放鬆",
        };
        return descriptions[oilName] || "";
    }

    // 重新開始
    function restartTest() {
        resultScreen.classList.remove('active');
        introScreen.classList.add('active');
        userAnswers = {};
        currentStep = 0;
        questionContainer.innerHTML = ''; // 清空題目內容
    }

    startBtn.addEventListener('click', startTest);
    nextBtn.addEventListener('click', goToNextQuestion);
    submitBtn.addEventListener('click', submitTest);
    restartBtn.addEventListener('click', restartTest);
    // --- 分享功能實作 ---
    const pageUrl = window.location.href; // 獲取當前頁面網址
    const shareText = "來測驗你的心靈狀態吧！找到屬於你的精油配方。";

    shareLinkBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(pageUrl).then(() => {
            alert("連結已複製到剪貼簿！");
        }).catch(err => {
            console.error('無法複製連結：', err);
            alert("複製失敗，請手動複製網址：\n" + pageUrl);
        });
    });

    shareFbBtn.addEventListener('click', () => {
        const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
        window.open(fbUrl, '_blank');
    });

    shareLineBtn.addEventListener('click', () => {
        const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`;
        window.open(lineUrl, '_blank');
    });
});