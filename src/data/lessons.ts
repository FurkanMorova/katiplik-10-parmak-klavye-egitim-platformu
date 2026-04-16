export interface Lesson {
  id: string;
  title: string;
  slug: string;
  seoContent: string; // HTML allowed
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  keyboardType: 'F' | 'Q';
  allowedCharacters: string[];
  customWords?: string[];
  wordCount: number;
  targetWpm: number;
  targetAccuracy: number;
}

export const lessons: Lesson[] = [
  {
    id: "f-1",
    title: "Ders 1: Temel Sıra Sol El",
    slug: "f-klavye-ders-1-temel-sira-sol-el",
    seoContent: `
      <h2>Ders 1: Temel Sıra Sol El</h2>
      <p>On parmak F klavye eğitimine sol elin temel sıradaki harfleriyle başlıyoruz.</p>
      <ul>
        <li><strong>U</strong> - Serçe parmak</li>
        <li><strong>İ</strong> - Yüzük parmak</li>
        <li><strong>E</strong> - Orta parmak</li>
        <li><strong>A</strong> - İşaret parmağı</li>
      </ul>
      <p>Parmaklarınızı belirtilen tuşların üzerine hafifçe yerleştirin. Doğru kas hafızasının oluşabilmesi için kesinlikle klavyeye bakmadan ve ekrana odaklanarak egzersizi tamamlayın.</p>
      <p>Klavyede hızlanmanın altın kuralı, doğru oturuş ve ekrana bakma alışkanlığıdır. Çalışmalarınız sırasında kesinlikle klavyeye bakmayın. Hatalarınızı ekranda görerek düzeltin. Bu, kas hafızanızı doğrudan güçlendirecektir. Beyniniz parmak uçlarınıza hangi tuşun nerede olduğunu zamanla ezberletecek.</p>
    `,
    difficulty: "beginner",
    keyboardType: "F",
    allowedCharacters: ["u", "i", "e", "a"],
    wordCount: 50,
    targetWpm: 15,
    targetAccuracy: 90
  },
  {
    id: "f-2",
    title: "Ders 2: Temel Sıra Sağ El",
    slug: "f-klavye-ders-2-temel-sira-sag-el",
    seoContent: `
      <h2>Ders 2: Temel Sıra Sağ El</h2>
      <p>Şimdi sağ elinizin işaret, orta, yüzük ve serçe parmaklarını kullanarak sağ el orta sırasındaki temel tuşları öğreneceğiz.</p>
      <ul>
        <li><strong>K</strong> - İşaret parmağı</li>
        <li><strong>M</strong> - Orta parmak</li>
        <li><strong>L</strong> - Yüzük parmak</li>
        <li><strong>Y</strong> - Serçe parmak</li>
        <li><strong>Ş</strong> - Serçe parmak uzanarak</li>
      </ul>
      <p>Yeni bir tuş dizilimi öğrenirken bol bol tekrar yapmak şarttır. Hata yapmaktan çekinmeyin, yavaş ama isabetli vuruşlar yapmaya çalışın. Zamanla hızınız arka planda otomatik olarak artacaktır. Sağlık açısından bileklerinizi masaya dayamamaya özen gösterin.</p>
    `,
    difficulty: "beginner",
    keyboardType: "F",
    allowedCharacters: ["k", "m", "l", "y", "ş"],
    wordCount: 50,
    targetWpm: 15,
    targetAccuracy: 90
  },
  {
    id: "f-3",
    title: "Ders 3: Temel Sıra Sol ve Sağ El Birleşimi",
    slug: "f-klavye-ders-3-temel-sira-birlesim",
    seoContent: `
      <h2>Ders 3: Temel Sıra U İ E A K M L Y Ş</h2>
      <p>Sol el ve sağ elin temel sıradaki ana tuşlarını pekiştiriyoruz.</p>
      <p>Artık her iki elinizi de klavyeye yerleştirerek karışık egzersizler yapacaksınız. Bu sayede her iki el-göz koordinasyonunuz gelişecek.</p>
      <p>Bu aşamada zihniniz her iki ele de komut vermeye başlayacak. İlk başlarda duraksamalar yaşayabilirsiniz. Bu gayet normaldir. Ritminizi bozmadan, harfleri zihninizde kodlayarak yazmaya devam edin. Ekranda çıkan her karakter, sizin klavyeye olan bağlılığınızı artıracaktır.</p>
    `,
    difficulty: "beginner",
    keyboardType: "F",
    allowedCharacters: ["u", "i", "e", "a", "k", "m", "l", "y", "ş"],
    wordCount: 60,
    targetWpm: 18,
    targetAccuracy: 90
  },
  {
    id: "f-4",
    title: "Ders 4: Temel Sıra Tamamı",
    slug: "f-klavye-ders-4-tam-temel-sira",
    seoContent: `
      <h2>Ders 4: Temel Sıra Tamamı (Ü ve T Tuşları Dahil)</h2>
      <p>Temel sıradaki tüm harfleri dahil ediyoruz. Bu derste işaret parmaklarınızla <strong>Ü</strong> ve <strong>T</strong> harflerine uzanmayı öğreneceksiniz.</p>
      <p>Sol işaret parmağınız "A" tuşundayken sağa (içe) uzanarak "Ü" tuşuna basmalı ve hemen "A" tuşuna geri dönmelidir. Sağ işaret parmağınız ise "K" tuşundayken sola (içe) uzanarak "T" tuşuna basmalı ve tekrar geri dönmelidir.</p>
      <p>Uzanma hareketleri klavye eğitiminin en hassas noktalarından biridir. Parmağınız uzandıktan sonra temel sıradaki yerine mikrosaniyeler içinde geri gelmelidir. Parmağınızı diğer tuşun üzerinde unutursanız, bir sonraki harf için yapacağınız vuruş hatalı olacaktır.</p>
    `,
    difficulty: "beginner",
    keyboardType: "F",
    allowedCharacters: ["u", "i", "e", "a", "ü", "t", "k", "m", "l", "y", "ş"],
    wordCount: 60,
    targetWpm: 18,
    targetAccuracy: 90
  },
  {
    id: "f-5",
    title: "Ders 5: Üst Sıra Sol El",
    slug: "f-klavye-ders-5-ust-sira-sol-el",
    seoContent: `
      <h2>Ders 5: Üst Sıra Sol El (F G Ğ I O)</h2>
      <p>Parmaklarınız temel sırada iken, sol el parmaklarınızla üst sıradaki tuşlara (F, G, Ğ, I, O) uzanmayı ve ardından tekrar temel sıraya dönmeyi öğreneceksiniz.</p>
      <p>Unutmayın, her hamleden sonra parmaklarınız tekrar ana yuvalarına (U İ E A) geri dönmelidir!</p>
      <p>Üst sıraya geçiş yapmak genelde öğrencilerin en zorlandığı kısımdır. Bu dersi en az 3-4 defa tekrar etmenizi öneririz. Ritim duygunuzu geliştirmek için sanki bir piyano çalıyormuşsunuz gibi tuşlara dokunun. Tuşlara sert basmak hızınızı düşürür, daima yumuşak vuruşlar yapın.</p>
    `,
    difficulty: "beginner",
    keyboardType: "F",
    allowedCharacters: ["f", "g", "ğ", "ı", "o"],
    wordCount: 60,
    targetWpm: 18,
    targetAccuracy: 90
  },
  {
    id: "f-6",
    title: "Ders 6: Üst Sıra Sağ El",
    slug: "f-klavye-ders-6-ust-sira-sag-el",
    seoContent: `
      <h2>Ders 6: Üst Sıra Sağ El (D R N H P)</h2>
      <p>Sağ elinizi kullanarak üst sıradaki tuşları pekiştireceğiz.</p>
      <p>Temel sırada olan (K M L Y Ş) sağ el parmaklarınız ile yukarı uzanarak D, R, N, H, P tuşlarına basıp ardından vakit kaybetmeden asıl yerinize geri dönün.</p>
      <p>Artık sağ elinizin erişim menzilini geliştireceksiniz. D R N H P tuşları kelime sonlarında sıkça kullanılan harfleri barındırdığı için çok kritiktir. Yeterli pratik yaptığınızda parmaklarınızın bu tuşlara gitmek için hiç düşünmeden hareket ettiğini göreceksiniz. Sabırlı olun ve pratiklerinizi eksik bırakmayın.</p>
    `,
    difficulty: "beginner",
    keyboardType: "F",
    allowedCharacters: ["d", "r", "n", "h", "p"],
    wordCount: 60,
    targetWpm: 18,
    targetAccuracy: 90
  },
  {
    id: "f-7",
    title: "Ders 7: Üst Sıra Tamamı",
    slug: "f-klavye-ders-7-ust-sira-tamami",
    seoContent: `
      <h2>Ders 7: Üst Sıra Birleşimi (F G Ğ I O D R N H P)</h2>
      <p>Sol ve sağ elinizin üst sıralarındaki tuşları harmanlayarak pratik yapıyoruz. Parmaklarınızın üst tuşlara nasıl hızla uzanıp geri çekildiğini hissetmeye odaklanın.</p>
      <p>Bu aşama, beyninizin gelişmiş hafızasını test edeceğiniz en önemli seviyedir. Tüm üst sıra ve temel sırayı aklınızda tutmak zor olsa da tekrar ettikçe bilinçaltınız bu haritalamayı kolayca ezberleyecektir. Uzun soluklu yazılarda bileklerinizi masaya koymamanız ve dik oturmanız çok önemlidir, aksi takdirde çabuk yorulursunuz.</p>
    `,
    difficulty: "beginner",
    keyboardType: "F",
    allowedCharacters: ["f", "g", "ğ", "ı", "o", "d", "r", "n", "h", "p"],
    wordCount: 60,
    targetWpm: 20,
    targetAccuracy: 90
  },
  {
    id: "f-8",
    title: "Ders 8: Temel ve Üst Sıra Kelime Egzersizi",
    slug: "f-klavye-ders-8-temel-ust-kelimeler",
    seoContent: `
      <h2>Ders 8: Anlamlı Kelimelerle Temel ve Üst Sıra Peşiştirmesi</h2>
      <p>Şu ana kadar öğrendiğiniz temel ve üst sıra harfleriyle oluşturulmuş anlamlı Türkçe kelimelerle hız ve doğruluk çalışmaları yapacağız.</p>
      <p>Hatalı bastığınızda moralinizi bozmadan hemen doğru tuşu bulmaya çalışın. Klavyeye bakmak alışkanlığınızı köreltir, sadece ekrana odaklanın.</p>
      <p>Bu ders gerçek yazma hızınıza ulaşmanız için bir sıçrama tahtasıdır. Ürettiğimiz kelimeler tamamen Türkçede en sık karşınıza çıkacak sözcük öbeklerinden alındığı için, bu dersteki performansınız katiplik hızınıza veya standart ofis çalışma hızınıza en yakın durumu gösterir. Lütfen tam odak ile devam edin!</p>
    `,
    difficulty: "intermediate",
    keyboardType: "F",
    allowedCharacters: ["u", "i", "e", "a", "ü", "t", "k", "m", "l", "y", "ş", "f", "g", "ğ", "ı", "o", "d", "r", "n", "h", "p"],
    customWords: ["defter", "kitap", "okul", "yarın", "telefon", "kedi", "dünya", "hayat", "güneş", "ay", "kum", "orman", "dağ", "armut", "elma", "nar", "portakal", "halı", "perde", "kapı", "kutu", "para", "adam", "kadın", "anne", "dede", "hala", "dayı", "yol", "tren", "gemi", "gel", "git", "al", "oku", "koş", "dur", "at", "tut", "kır", "yap"],
    wordCount: 60,
    targetWpm: 25,
    targetAccuracy: 90
  },
  {
    id: "f-9",
    title: "Ders 9: Alt Sıra Sol El",
    slug: "f-klavye-ders-9-alt-sira-sol",
    seoContent: `
      <h2>Ders 9: Alt Sıra Sol El (J Ö V C Ç)</h2>
      <p>Klavyenin alt sırasındaki tuşlara sol elinizle uzanmayı öğreneceksiniz. Temel sıradan aşağı uzanarak J, Ö, V, C ve Ç tuşlarına basın ve hızla tekrar ana sıraya dönün.</p>
      <p>Artık klavyenin alt katmanına iniyoruz. J, Ö, V, C, Ç tuşları Türkçe kelimelerde kendine has ve kritik yerlerde geçerler. Alt sıraya inmek parmak kaslarınız için başlangıçta biraz zorlayıcı olabilir ama pratikle bu engeli de kolayca aşacaksınız. Unutmayın, bilekler havada olacak!</p>
    `,
    difficulty: "advanced",
    keyboardType: "F",
    allowedCharacters: ["j", "ö", "v", "c", "ç"],
    wordCount: 60,
    targetWpm: 20,
    targetAccuracy: 90
  },
  {
    id: "f-10",
    title: "Ders 10: Alt Sıra Sağ El",
    slug: "f-klavye-ders-10-alt-sira-sag",
    seoContent: `
      <h2>Ders 10: Alt Sıra Sağ El (Z S B)</h2>
      <p>Klavyenin alt sırasının sağ tarafında kalan Z, S ve B tuşlarını sağ el parmaklarınızla nasıl yöneteceğinizi öğreneceğiz.</p>
      <p>Bu son harf eğitiminde artık sağ elinizin parmaklarını bükmeyi ve bükülü pozisyondayken de ne kadar kuvvetli vurabileceğinizi öğreneceksiniz. Kalan tüm harfleri tamamladıktan sonra, F klavyenin dizilimi zihninizde eksiksiz olarak oluşacaktır.</p>
    `,
    difficulty: "advanced",
    keyboardType: "F",
    allowedCharacters: ["z", "s", "b"],
    wordCount: 60,
    targetWpm: 20,
    targetAccuracy: 90
  },
  {
    id: "f-11",
    title: "Ders 11: Tüm Harfler Egzersizi",
    slug: "f-klavye-ders-11-tum-harfler",
    seoContent: `
      <h2>Ders 11: Klavyenin Tamamı</h2>
      <p>Tebrikler! F klavyedeki tüm harflerin yerlerini öğrendiniz. Bu egzersizde, tüm harflerin geçtiği rastgele kelimelerle karşılaşarak pratik yapacak ve öğrendiğiniz tüm tuş dizilimlerini pekiştireceksiniz.</p>
      <p>Bu seviyeden sonra bol bol kitap, dergi, makale yazarak veya gelişmiş egzersizler yaparak DBK (dakikadaki kelime sayınızı) artırabilirsiniz.</p>
      <p>Tam donanımlı bir on parmak kullanıcısı olarak, metinleri hataları en aza indirerek ve hızla tamamlamayı başarıp başaramadığınızı bu egzersiz ölçmektedir. Dilerseniz bu testi her gün klavye ısınma antrenmanı olarak kullanabilir ve parmaklarınızı açabilirsiniz.</p>
    `,
    difficulty: "advanced",
    keyboardType: "F",
    allowedCharacters: ["u", "i", "e", "a", "ü", "t", "k", "m", "l", "y", "ş", "f", "g", "ğ", "ı", "o", "d", "r", "n", "h", "p", "j", "ö", "v", "c", "ç", "z", "s", "b"],
    wordCount: 80,
    targetWpm: 30,
    targetAccuracy: 90
  },
  {
    id: "q-1",
    title: "Ders 1: Temel Sıra Sol El",
    slug: "q-klavye-ders-1-temel-sira-sol-el",
    seoContent: `
      <h2>Ders 1: Temel Sıra Sol El (Q Klavye)</h2>
      <p>On parmak Q klavye eğitimine sol elinizin temel sıradaki harfleriyle (A, S, D, F) başlıyoruz.</p>
      <ul>
        <li><strong>A</strong> - Serçe parmak</li>
        <li><strong>S</strong> - Yüzük parmak</li>
        <li><strong>D</strong> - Orta parmak</li>
        <li><strong>F</strong> - İşaret parmağı</li>
      </ul>
      <p>Parmaklarınızı belirtilen tuşların üzerine hafifçe yerleştirin. İşaret parmağınızın altındaki F tuşunda ufak bir kabartı bulunur; bu sizin referans noktanızdır. Doğru kas hafızasının oluşabilmesi için kesinlikle klavyeye bakmadan ve ekrana odaklanarak egzersizi tamamlayın.</p>
      <p>Klavyede hızlanmanın altın kuralı, doğru oturuş ve sadece ekrana bakma alışkanlığıdır. Çalışmalarınız sırasında klavyeye bakmamak, beyninizin zamanla parmak uçlarınıza harflerin yerini ezberletmesini sağlar.</p>
    `,
    difficulty: "beginner",
    keyboardType: "Q",
    allowedCharacters: ["a", "s", "d", "f"],
    wordCount: 50,
    targetWpm: 15,
    targetAccuracy: 90
  },
  {
    id: "q-2",
    title: "Ders 2: Temel Sıra Sağ El",
    slug: "q-klavye-ders-2-temel-sira-sag-el",
    seoContent: `
      <h2>Ders 2: Temel Sıra Sağ El (Q Klavye)</h2>
      <p>Şimdi sağ elinizin işaret, orta, yüzük ve serçe parmaklarını kullanarak sağ el orta sırasındaki temel tuşları öğreneceğiz (J, K, L, Ş).</p>
      <ul>
        <li><strong>J</strong> - İşaret parmağı</li>
        <li><strong>K</strong> - Orta parmak</li>
        <li><strong>L</strong> - Yüzük parmak</li>
        <li><strong>Ş</strong> - Serçe parmak</li>
      </ul>
      <p>J tuşunun üzerinde de F tuşunda olduğu gibi referans kabartısı bulunur. Yeni bir tuş dizilimi öğrenirken bol bol tekrar yapmak şarttır. Hata yapmaktan çekinmeyin, yavaş ama isabetli vuruşlar yapmaya çalışın.</p>
    `,
    difficulty: "beginner",
    keyboardType: "Q",
    allowedCharacters: ["j", "k", "l", "ş"],
    wordCount: 50,
    targetWpm: 15,
    targetAccuracy: 90
  },
  {
    id: "q-3",
    title: "Ders 3: Temel Sıra Tamamı",
    slug: "q-klavye-ders-3-temel-sira-tamami",
    seoContent: `
      <h2>Ders 3: Temel Sıra Birleşimi (A S D F G H J K L Ş İ)</h2>
      <p>Sol el ve sağ elin temel sıradaki tüm tuşlarını pekiştiriyoruz. Bu aşamada temel sıranın ortasında kalan <strong>G</strong> ve <strong>H</strong> ile en sağdaki <strong>İ</strong> tuşlarına uzanmayı öğreneceksiniz.</p>
      <p>Sol işaret parmağınız "F" tuşundayken yana kayıp "G" tuşuna bakar. Sağ işaret parmağınız "J" tuşundayken yana kayıp "H" tuşuna basar. Sağ serçe parmağınız ise Ş tuşundan yana "İ" tuşuna uzanır.</p>
      <p>Bu egzersizde zihniniz her iki ele de komut vermeye başlayacaktır. İlk başlarda duraksamalar yaşamanız normaldir; ritminizi bozmadan yazmaya devam edin.</p>
    `,
    difficulty: "beginner",
    keyboardType: "Q",
    allowedCharacters: ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ş", "i"],
    wordCount: 60,
    targetWpm: 18,
    targetAccuracy: 90
  },
  {
    id: "q-4",
    title: "Ders 4: Üst Sıra Sol El",
    slug: "q-klavye-ders-4-ust-sira-sol-el",
    seoContent: `
      <h2>Ders 4: Üst Sıra Sol El (Q W E R T Y)</h2>
      <p>Temel sıradaki hakimiyetiniz arttıkça, klavyenin üst sırasına sol el parmaklarınızı uzatmayı öğrenmelisiniz. (Wait/Not: Aslında Y tuşu genellikle sağ el işaret parmağı ile basılır, ancak Q klavyede bazen sol veya sağ ele göre farklı standartlar öğretilebilir. Bu derste Q W E R T Y grubunu pekiştireceksiniz.)</p>
      <p>Temel kural şudur: Parmağınız üst sıradaki harfe basıp hemen ardından tekrar <strong>temel sıradaki kendi yuvasına</strong> dönmelidir.</p>
    `,
    difficulty: "beginner",
    keyboardType: "Q",
    allowedCharacters: ["q", "w", "e", "r", "t", "y"],
    wordCount: 60,
    targetWpm: 18,
    targetAccuracy: 90
  },
  {
    id: "q-5",
    title: "Ders 5: Üst Sıra Sağ El",
    slug: "q-klavye-ders-5-ust-sira-sag-el",
    seoContent: `
      <h2>Ders 5: Üst Sıra Sağ El (Y U I O P)</h2>
      <p>Sağ el işaret parmağını ve diğer parmakları kullanarak Y, U, I, O, P tuşlarına uzanma egzersizi yapacağız. (Sağ işaret parmağınız hem Y hem U tuşlarına ulaşabilir).</p>
      <p>Uzanma hareketleri klavye eğitiminin en hassas noktalarından biridir. Parmağınız uzandıktan sonra temel sıradaki yerine geri gelmeden bir sonraki harfe gitmeye çalışırsa hata oranı artar.</p>
    `,
    difficulty: "beginner",
    keyboardType: "Q",
    allowedCharacters: ["y", "u", "ı", "o", "p"],
    wordCount: 60,
    targetWpm: 18,
    targetAccuracy: 90
  },
  {
    id: "q-6",
    title: "Ders 6: Üst Sıra Sağ El (Ğ Ü)",
    slug: "q-klavye-ders-6-ust-sira-sag-el-ek",
    seoContent: `
      <h2>Ders 6: Üst Sıra Sağ El Uzanma (Y U I O P Ğ Ü)</h2>
      <p>Sağ el üst sıra tuşlarına Türkçe karakterler olan Ğ ve Ü tuşlarını ekliyoruz. Bu tuşlara sağ elinizin serçe ve yüzük parmaklarını esneterek ulaşacaksınız.</p>
      <p>Bu derste sabırlı olmalı ve kaslarınızı zorlamak yerine ritminizi korumalısınız.</p>
    `,
    difficulty: "beginner",
    keyboardType: "Q",
    allowedCharacters: ["y", "u", "ı", "o", "p", "ğ", "ü"],
    wordCount: 60,
    targetWpm: 18,
    targetAccuracy: 90
  },
  {
    id: "q-7",
    title: "Ders 7: Üst Sıranın Tamamı",
    slug: "q-klavye-ders-7-ust-sira-tamami",
    seoContent: `
      <h2>Ders 7: Üst Sıra Birleşimi (Q W E R T Y U I O P Ğ Ü)</h2>
      <p>Tüm üst sıra harflerini bir araya getiriyor, sol ve sağ elin koordinasyonunu artırıyoruz. Bu aşama beyninizin harflerini zihninde harmanlaması için harika bir antrenmandır.</p>
      <p>Egzersiz sırasında parmakların tuşlara yumuşakça dokunduğundan emin olun. Sert basışlar hızınızı ve akıcılığınızı doğrudan düşürecektir.</p>
    `,
    difficulty: "beginner",
    keyboardType: "Q",
    allowedCharacters: ["q", "w", "e", "r", "t", "y", "u", "ı", "o", "p", "ğ", "ü"],
    wordCount: 60,
    targetWpm: 20,
    targetAccuracy: 90
  },
  {
    id: "q-8",
    title: "Ders 8: Temel ve Üst Sıra Anlamlı Kelimeler",
    slug: "q-klavye-ders-8-anlamli-kelimeler",
    seoContent: `
      <h2>Ders 8: Q Klavye Anlamlı Kelimelerle Pratik</h2>
      <p>Şu ana kadar öğrendiğiniz Temel ve Üst sıra harfleriyle yazılabilecek anlamlı Türkçe kelimeleri çalışacağız.</p>
      <p>Kelimeleri yazarken harf harf değil, blok halinde zihinde okuyarak akıcı bir yazım sergilemeye çalışın. Gerçek ofis hızınıza en yakın performansı bu dersle ölçeceksiniz!</p>
    `,
    difficulty: "intermediate",
    keyboardType: "Q",
    allowedCharacters: ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ş", "i", "q", "w", "e", "r", "t", "y", "u", "ı", "o", "p", "ğ", "ü"],
    customWords: ["defter", "kitap", "okul", "kedi", "hayat", "ay", "dağ", "portakal", "halı", "perde", "kapı", "kutu", "para", "dede", "hala", "dayı", "yol", "gel", "git", "al", "oku", "koş", "dur", "at", "tut", "kır", "yap", "gül", "kış", "kuş", "ses", "su", "ot"],
    wordCount: 60,
    targetWpm: 25,
    targetAccuracy: 90
  },
  {
    id: "q-9",
    title: "Ders 9: Alt Sıra Sol El",
    slug: "q-klavye-ders-9-alt-sira-sol",
    seoContent: `
      <h2>Ders 9: Alt Sıra Sol El (Z X C V B)</h2>
      <p>Artık alt kata iniyoruz! Z, X, C, V ve B tuşlarını sol elinizle yöneteceksiniz. Alt sıraya inmek parmak kaslarınız için başlangıçta biraz zorlayıcı olabilir ama pratikle bu engeli de kolayca aşacaksınız.</p>
    `,
    difficulty: "advanced",
    keyboardType: "Q",
    allowedCharacters: ["z", "x", "c", "v", "b"],
    wordCount: 60,
    targetWpm: 20,
    targetAccuracy: 90
  },
  {
    id: "q-10",
    title: "Ders 10: Alt Sıra Sağ El",
    slug: "q-klavye-ders-10-alt-sira-sag",
    seoContent: `
      <h2>Ders 10: Alt Sıra Sağ El (N M Ö Ç)</h2>
      <p>Q klavyenin alt sırasındaki N, M, Ö, Ç tuşlarını sağ elinizle aşağı doğru esneyerek yazmayı çalışacaksınız.</p>
      <p>Geliştikçe bu harflerin kelimeler içerisindeki akışına alışacak ve parmaklarınızı kıvırarak bu serideki vuruşlarınızı hızlandıracaksınız.</p>
    `,
    difficulty: "advanced",
    keyboardType: "Q",
    allowedCharacters: ["n", "m", "ö", "ç"],
    wordCount: 60,
    targetWpm: 20,
    targetAccuracy: 90
  },
  {
    id: "q-11",
    title: "Ders 11: Klavyenin Tamamı",
    slug: "q-klavye-ders-11-tum-harfler",
    seoContent: `
      <h2>Ders 11: Tüm Q Klavye</h2>
      <p>Harika bir iş çıkardınız ve Q klavyedeki tüm harflerin yerlerini on parmak formatında öğrendiniz! Bu egzersiz tüm klavyeyi aynı anda tarayacak.</p>
      <p>Tam donanımlı bir on parmak kullanıcısı olarak, metinleri hataları en aza indirerek ve hızla tamamlamayı başarıp başaramadığınızı bu egzersiz ölçmektedir. Dilerseniz bu testi her gün klavye ısınma antrenmanı olarak kullanabilir ve parmaklarınızı açabilirsiniz.</p>
    `,
    difficulty: "advanced",
    keyboardType: "Q",
    allowedCharacters: ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ş", "i", "q", "w", "e", "r", "t", "y", "u", "ı", "o", "p", "ğ", "ü", "z", "x", "c", "v", "b", "n", "m", "ö", "ç"],
    wordCount: 80,
    targetWpm: 30,
    targetAccuracy: 90
  }
];
