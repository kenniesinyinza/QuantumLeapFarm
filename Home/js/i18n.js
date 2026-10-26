/* QuantumLeap Farm - language switcher (English / Chinyanja / Icibemba).
   Edit the words in TRANSLATIONS below; keys match data-i18n="..." in the HTML.
   Visitor choice is saved in localStorage; ?lang=ny|bem|en in a link also works. */
(function () {
  var TRANSLATIONS = {
  "en": {
    "home": "Home",
    "products": "Products",
    "eggs": "Eggs",
    "chicken": "Chicken",
    "pork": "Pork",
    "vegetables": "Vegetables",
    "services": "Services",
    "poultry": "Poultry",
    "piggery": "Piggery",
    "horticulture": "Horticulture",
    "about": "About Us",
    "profile": "Profile",
    "signin": "Sign In",
    "signup": "Sign Up",
    "language": "Language",
    "welcome": "Welcome to QuantumLeap Farm",
    "tagline": "Growing quality, feeding communities",
    "learn": "Learn More",
    "ourproducts": "Our Products",
    "view": "View Product",
    "gallery": "Photo Gallery",
    "layers": "Layer Hens",
    "whitechickens": "White Chickens",
    "backtoproducts": "\u2190 Back to Products",
    "d_veg": "Fresh vegetables from our farm.",
    "d_chicken": "Quality poultry products from our farm.",
    "d_pork": "Quality pork products from our piggery.",
    "d_eggs": "Fresh eggs from our farm.",
    "ourservices": "Our Services",
    "c_piggery": "Well-managed piggery for healthy pork production.",
    "hortitag": "Fresh Produce, Sustainable Growth",
    "hortititle": "Growing Vegetables. Cultivating Quality.",
    "hortidescription": "We provide quality horticulture services from planting and irrigation to harvesting, helping deliver fresh, healthy produce all year round.",
    "cropvarieties": "Crop Varieties",
    "yearsexperience": "Years of Experience",
    "organicpractices": "Organic Practices",
    "coreservices": "Core Services",
    "hortiservice1": "Seed selection and planting",
    "hortiservice2": "Irrigation and water management",
    "hortiservice3": "Soil health and fertilization",
    "hortiservice4": "Pest and disease control",
    "hortiservice5": "Harvesting and post-harvest handling",
    "gallerytitle": "Gallery",
    "piggerytag": "Smart Piggery, Sustainable Future",
    "piggerytitle": "Raising Healthy Pigs. Growing Quality Farms.",
    "piggerydescription": "We provide quality pig farming services from breeding and feeding to proper animal care, helping farmers maintain healthy and productive pigs.",
    "pigsraised": "Pigs Raised Annually",
    "qualityassured": "Quality Assured",
    "pigservice1": "Pig breeding and genetics management",
    "pigservice2": "Balanced feeding programs for healthy growth",
    "pigservice3": "Veterinary care and disease prevention",
    "pigservice4": "Farrowing and piglet care",
    "pigservice5": "Farm hygiene and waste management",
    "poultrytag": "Healthy Flocks, Fresh Eggs",
    "poultrytitle": "Raising Poultry. Delivering Freshness.",
    "poultrydescription": "We provide quality poultry farming services from hatching and feeding to health monitoring, ensuring healthy birds and fresh eggs for our farmers and customers.",
    "birdsraised": "Birds Raised Annually",
    "poultryservice1": "Chick hatching and brooding",
    "poultryservice2": "Balanced poultry feeding programs",
    "poultryservice3": "Disease prevention and vaccination",
    "poultryservice4": "Egg collection and grading",
    "poultryservice5": "Coop hygiene and waste management",
    "abouttitle": "About QuantumLeap Farm",
    "abouttagline": "Growing quality agriculture and connecting communities.",
    "backhome": "Back Home",
    "exploreproducts": "Explore Products",
    "whoweare": "Who We Are",
    "aboutintro1": "Quantum Leap Farms is an agricultural enterprise based in Ndola, Zambia. We focus on producing healthy, sustainable farm products that support households, businesses, and communities.",
    "aboutintro2": "Our farm brings together modern growing practices, reliable service, and a strong commitment to quality. We believe agriculture should be productive, honest, and accessible to everyone.",
    "ourvalues": "Our Values",
    "quality": "Quality",
    "integrity": "Integrity",
    "sustainability": "Sustainability",
    "whatwedo": "What We Do",
    "aboutsummary": "Quantum Leap Farms focuses on agricultural production and supplying quality farm products to individuals, businesses, and local communities. We are committed to responsible farming practices while continuously improving our methods, service, and customer experience.",
    "aboutp": "QuantumLeap Farm is an agricultural enterprise focused on providing quality farm products and services. Our main activities include poultry, piggery and horticulture where we produce fresh and healthy agricultural products through modern and sustainable farming practices.",
    "footerp": "Quantum Leap Farm is committed to producing quality agricultural products and feeding communities.",
    "quick": "Quick Links",
    "product": "Product",
    "contact": "Contact Us",
    "copy": "© 2026 QuantumLeap Farm. All rights reserved.",
    "forgot": "Forgot password?",
    "or": "Or",
    "email": "Email",
    "password": "Password",
    "create": "Create password",
    "confirm": "Confirm password"
  },
  "ny": {
    "home": "Kunyumba",
    "products": "Zogulitsa",
    "eggs": "Mazira",
    "chicken": "Nkhuku",
    "pork": "Nyama ya nkhumba",
    "vegetables": "Ndiwo zamasamba",
    "services": "Ntchito zathu",
    "poultry": "Kuweta nkhuku",
    "piggery": "Kuweta nkhumba",
    "horticulture": "Ulimi wa ndiwo zamasamba",
    "about": "Zaife",
    "profile": "Akaunti",
    "signin": "Lowani",
    "signup": "Lembetsani",
    "language": "Chilankhulo",
    "welcome": "Takulandirani ku QuantumLeap Farm",
    "tagline": "Timalima zabwino, kudyetsa madera athu",
    "learn": "Dziwani zambiri",
    "ourproducts": "Zogulitsa zathu",
    "view": "Onani chinthu",
    "d_veg": "Ndiwo zamasamba zatsopano zochokera ku famu yathu.",
    "d_chicken": "Zinthu zabwino za nkhuku zochokera ku famu yathu.",
    "d_pork": "Nyama ya nkhumba yabwino yochokera ku famu yathu ya nkhumba.",
    "d_eggs": "Mazira atsopano ochokera ku famu yathu.",
    "ourservices": "Ntchito zathu",
    "c_piggery": "Malo oweta nkhumba osamalidwa bwino popanga nyama ya nkhumba yathanzi.",
    "hortitag": "Zokolola Zatsopano, Ulimi Wokhazikika",
    "hortititle": "Kulima Ndiwo Zamasamba. Kukulitsa Ubwino.",
    "hortidescription": "Timapereka ntchito za ulimi wa ndiwo zamasamba kuyambira kubzala ndi kuthirira mpaka kukolola, kuti tipeze zokolola zatsopano ndi zathanzi chaka chonse.",
    "cropvarieties": "Mitundu ya Zomera",
    "yearsexperience": "Zaka Zogwira Ntchito",
    "organicpractices": "Njira Zachilengedwe",
    "coreservices": "Ntchito Zazikulu",
    "hortiservice1": "Kusankha mbewu ndi kubzala",
    "hortiservice2": "Kuthirira ndi kasamalidwe ka madzi",
    "hortiservice3": "Thanzi la nthaka ndi feteleza",
    "hortiservice4": "Kuletsa tizirombo ndi matenda",
    "hortiservice5": "Kukolola ndi kusamalira zokolola pambuyo pokolola",
    "gallerytitle": "Zithunzi za Famu",
    "piggerytag": "Kuweta Nkhumba Mwanzeru, Tsogolo Lokhazikika",
    "piggerytitle": "Kuweta Nkhumba Zathanzi. Kukulitsa Mafamu Abwino.",
    "piggerydescription": "Timapereka ntchito zabwino zoweta nkhumba kuyambira kuswana ndi kudyetsa mpaka kusamalira ziweto moyenera, pothandiza alimi kukhala ndi nkhumba zathanzi ndi zobereka bwino.",
    "pigsraised": "Nkhumba Zowetedwa Pachaka",
    "qualityassured": "Ubwino Wotsimikizika",
    "pigservice1": "Kuswana nkhumba ndi kusamalira mitundu yake",
    "pigservice2": "Mapulogalamu odyetsa moyenera kuti zikule bwino",
    "pigservice3": "Chisamaliro cha ziweto ndi kupewa matenda",
    "pigservice4": "Kubereka ndi kusamalira ana a nkhumba",
    "pigservice5": "Ukhondo wa famu ndi kasamalidwe ka zinyalala",
    "poultrytag": "Nkhuku Zathanzi, Mazira Atsopano",
    "poultrytitle": "Kuweta Nkhuku. Kupereka Zatsopano.",
    "poultrydescription": "Timapereka ntchito zabwino zoweta nkhuku kuyambira kuswa mazira ndi kudyetsa mpaka kuyang'anira thanzi, kuti alimi ndi makasitomala azikhala ndi nkhuku zathanzi ndi mazira atsopano.",
    "birdsraised": "Nkhuku Zowetedwa Pachaka",
    "poultryservice1": "Kuswa ndi kulera anapiye",
    "poultryservice2": "Mapulogalamu odyetsa nkhuku moyenera",
    "poultryservice3": "Kupewa matenda ndi katemera",
    "poultryservice4": "Kusonkhanitsa ndi kusanja mazira",
    "poultryservice5": "Ukhondo wa khola ndi kasamalidwe ka zinyalala",
    "abouttitle": "Zokhudza QuantumLeap Farm",
    "abouttagline": "Kulima bwino ndi kugwirizanitsa madera athu.",
    "backhome": "Bwererani Kunyumba",
    "exploreproducts": "Onani Zogulitsa",
    "whoweare": "Ndife Ndani",
    "aboutintro1": "Quantum Leap Farms ndi bizinesi yaulimi yomwe ili ku Ndola, Zambia. Timayang'ana kwambiri kupanga zinthu zaulimi zathanzi komanso zokhazikika zomwe zimathandiza mabanja, mabizinesi ndi madera.",
    "aboutintro2": "Famu yathu imagwiritsa ntchito njira zamakono zolimira, ntchito yodalirika komanso kudzipereka kwambiri ku zinthu zabwino. Timakhulupirira kuti ulimi uyenera kukhala wopindulitsa, wowona mtima komanso wofikira aliyense.",
    "ourvalues": "Mfundo Zathu",
    "quality": "Ubwino",
    "integrity": "Kuwona Mtima",
    "sustainability": "Kukhazikika",
    "whatwedo": "Zomwe Timachita",
    "aboutsummary": "Quantum Leap Farms imayang'ana kwambiri ulimi ndi kupereka zinthu zabwino zaulimi kwa anthu, mabizinesi ndi madera akumaloko. Timadzipereka ku njira zaulimi wodalirika ndipo timapitiriza kukonza njira zathu, ntchito zathu ndi mmene timathandizira makasitomala.",
    "aboutp": "QuantumLeap Farm ndi bizinesi yaulimi yopereka zinthu ndi ntchito zabwino zaulimi. Ntchito zathu zikuluzikulu ndi kuweta nkhuku, kuweta nkhumba ndi ulimi wa ndiwo zamasamba, kumene timapanga zinthu zatsopano komanso zathanzi mwa njira zamakono komanso zokhazikika.",
    "footerp": "Quantum Leap Farm yadzipereka kupanga zinthu zabwino zaulimi ndi kudyetsa madera.",
    "quick": "Maulalo ofulumira",
    "product": "Zogulitsa",
    "contact": "Lumikizanani nafe",
    "copy": "© 2026 QuantumLeap Farm. Maufulu onse ndi otetezedwa.",
    "forgot": "Mwaiwala mawu achinsinsi?",
    "or": "Kapena",
    "email": "Imelo",
    "password": "Mawu achinsinsi",
    "create": "Pangani mawu achinsinsi",
    "confirm": "Tsimikizirani mawu achinsinsi"
  },
  "bem": {
    "home": "Ku Ng'anda",
    "products": "Ifyo Tushitisha",
    "eggs": "Amaani",
    "chicken": "Inkuku",
    "pork": "Inama ya Ngulube",
    "vegetables": "Umusalu",
    "services": "Incito Shesu",
    "poultry": "Ukulusha Inkuku",
    "piggery": "Ukulusha Ingulube",
    "horticulture": "Ubulimi bwa Umusalu",
    "about": "Pali Ifwe",
    "profile": "Akaunti",
    "signin": "Ukwingila",
    "signup": "Ukulembesha",
    "language": "Ululimi",
    "welcome": "Mwaiseni ku QuantumLeap Farm",
    "tagline": "Tulima ifisuma, tulisha abantu",
    "learn": "Mwishibe Ifingi",
    "ourproducts": "Ifyo Tushitisha",
    "view": "Amwene",
    "d_veg": "Umusalu uupya ukufuma ku faamu yesu.",
    "d_chicken": "Ifya nkuku ifisuma ukufuma ku faamu yesu.",
    "d_pork": "Inama ya ngulube iisuma ukufuma ku faamu yesu.",
    "d_eggs": "Amaani apya ukufuma ku faamu yesu.",
    "ourservices": "Incito Shesu",
    "c_piggery": "Ifikola fya ngulube ifisungwa bwino ukupanga inama ya ngulube iisuma.",
    "hortitag": "Ifyakukolola Ifipya, Bulimi Ubukashika",
    "hortititle": "Ukulima Imisalu. Ukupanga Ifisuma.",
    "hortidescription": "Tupela incito sha bulimi bwa musalu ukufuma mukusala imbeu no kumina amenshi mpaka mukukolola, pakuti tukwate ifyakulya ifipya kabili ifya buumi umwaka onse.",
    "cropvarieties": "Imisalu Ipusana Pusana",
    "yearsexperience": "Imyaka ya Incito",
    "organicpractices": "Inshila sha Bulimi bwa Ntanda",
    "coreservices": "Incito Ishikulu",
    "hortiservice1": "Ukusala imbeu no kulima",
    "hortiservice2": "Ukuminisha amenshi no kusunga amenshi",
    "hortiservice3": "Ukusunga bwino ubutaka no kubika ifyakulisha",
    "hortiservice4": "Ukulwisha utulwani ne fyalwala",
    "hortiservice5": "Ukukolola no kusunga ifyakulola",
    "gallerytitle": "Amashusho ya Faamu",
    "piggerytag": "Ukulusha Ingulube mu Bupanga, Imyaka Iya Bwino",
    "piggerytitle": "Ukulusha Ingulube Sha Buumi. Ukukusha Amafaamu Ayasuma.",
    "piggerydescription": "Tupela incito sha kulusha ingulube ukufuma mukusala imibele no kulisha mpaka ukusunga bwino ifibeto, ukuti abafyashi bakwate ingulube sha buumi kabili ishingakula bwino.",
    "pigsraised": "Ingulube Ishakulwa Mu Mwaka",
    "qualityassured": "Ubwina Bwashininkishiwa",
    "pigservice1": "Ukusala imibele ya ngulube no kusunga imibele",
    "pigservice2": "Inshila sha kulisha bwino pakukula",
    "pigservice3": "Ukusunga ifibeto no kulwisha amalwele",
    "pigservice4": "Ukusunga ingulube ishibala ne fyana fyashyo",
    "pigservice5": "Ubusaka bwa faamu no kusunga imyanda",
    "poultrytag": "Inkuku Sha Buumi, Amaani Apya",
    "poultrytitle": "Ukulusha Inkuku. Ukupela Ifipya.",
    "poultrydescription": "Tupela incito sha kulusha inkuku ukufuma mukuswa amaani no kulisha mpaka ukusunga ubumi, pakuti abafyashi ne bakasitoma bakwate inkuku sha buumi na amaani apya.",
    "birdsraised": "Inkuku Ishakulwa Mu Mwaka",
    "poultryservice1": "Ukuswa no kusunga ifipushi",
    "poultryservice2": "Inshila sha kulisha inkuku bwino",
    "poultryservice3": "Ukulwisha amalwele no kubika umuti",
    "poultryservice4": "Ukukonka no kusala amaani",
    "poultryservice5": "Ubusaka bwa nkuku no kusunga imyanda",
    "abouttitle": "Pa QuantumLeap Farm",
    "abouttagline": "Ukulima ifisuma no kubomfya abantu bonse pamo.",
    "backhome": "Bweleleni ku Ng'anda",
    "exploreproducts": "Moneni Ifyo Tushitisha",
    "whoweare": "Ifwe Nibani",
    "aboutintro1": "Quantum Leap Farms ni kampani ya bulimi iili mu Ndola, Zambia. Tulingile ukulima ifintu ifya mu buumi kabili ifikashika ifya kubombela amaka, amalonda na bantu mu mishi.",
    "aboutintro2": "Faamu yesu ibika pamo inshila sha bulimi sha lelo, incito ishingasumina no kulangisha ukuti ifintu fibe bwino. Tushininkisha ukuti bulimi bufwile ukubomfya, ukuba bwa cine no kufikilisha bonse.",
    "ourvalues": "Ifyo Twasuminisha",
    "quality": "Ubwina",
    "integrity": "Ubucishinka",
    "sustainability": "Ukukashika",
    "whatwedo": "Ifyo Tuchita",
    "aboutsummary": "Quantum Leap Farms ilima no kushitisha ifintu ifisuma ifya bulimi ku bantu, amalonda na bantu mu mishi. Tulangisha ukulima mu nshila ishingaleta ubusuma, kabili twalifulisha inshila shesu, incito no kusunga abashita.",
    "aboutp": "QuantumLeap Farm ni bwikashi bwa bulimi ubukonka ukupanga ifintu ne ncito ifisuma. Incito shesu nkulu ni kulusha inkuku, ukulusha ingulube ne bulimi bwa umusalu, apo tupanga ifintu ifipya kabili ifya mano mu nshila sha lelo ishikalipa.",
    "footerp": "Quantum Leap Farm yalipeelwa ukupanga ifintu ifisuma ifya bulimi no kulisha abantu.",
    "quick": "Amalinki",
    "product": "Ifyo Tushitisha",
    "contact": "Lumwikeni",
    "copy": "© 2026 QuantumLeap Farm. Amaufulu yonse yasungwa.",
    "forgot": "Mwalubwa ilyashi lya kwingila?",
    "or": "Nangu",
    "email": "Imeili",
    "password": "Ilyashi lya kwingila",
    "create": "Pangeni ilyashi lya kwingila",
    "confirm": "Shininkeni ilyashi lya kwingila"
  }
};
  var CODES = { en: 'en', ny: 'ny', nya: 'ny', chi: 'ny', bem: 'bem' };
  var KEY = 'ql-lang';

  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(l) { try { localStorage.setItem(KEY, l); } catch (e) {} }

  function fromBrowser() {
    var list = navigator.languages || [navigator.language || 'en'];
    for (var i = 0; i < list.length; i++) {
      var c = CODES[String(list[i]).toLowerCase().split('-')[0]];
      if (c) return c;
    }
    return 'en';
  }

  function initial() {
    var q = (location.search.match(/[?&]lang=([a-z]+)/) || [])[1];
    if (q && TRANSLATIONS[q]) { save(q); return q; }
    var s = saved();
    return TRANSLATIONS[s] ? s : fromBrowser();
  }

  function apply(lang) {
    var d = TRANSLATIONS[lang] || TRANSLATIONS.en, en = TRANSLATIONS.en;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      el.textContent = d[k] || en[k] || el.textContent;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-ph');
      el.placeholder = d[k] || en[k] || el.placeholder;
    });
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach(function (a) {
      var on = a.getAttribute('data-lang') === lang;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }

  function set(lang) { save(lang); apply(lang); }

  document.addEventListener('DOMContentLoaded', function () {
    apply(initial());
    document.querySelectorAll('[data-lang]').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); set(a.getAttribute('data-lang')); });
    });
    document.querySelectorAll('.password-box span').forEach(function (s) {
      s.addEventListener('click', function () {
        var i = s.parentNode.querySelector('input');
        i.type = i.type === 'password' ? 'text' : 'password';
      });
    });
  });
})();
