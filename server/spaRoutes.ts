/**
 * Список валидных SPA-маршрутов.
 * Используется сервером, чтобы вернуть HTTP 404 для несуществующих страниц
 * вместо 200 (мягкий 404). Это требование Яндекс Вебмастера.
 */

const KNOWN_CITIES = new Set([
  "istra","odintsovo","khimki","mytishchi","podolsk","balashikha","korolev",
  "lyubertsy","serpukhov","klin","solnechnogorsk","volokolamsk","ruza","mozhaisk",
  "naro-fominsk","chekhov","domodedovo","ramenskoe","elektrostal","noginsk",
  "shchelkovo","fryazevo","pushkino","sergiev-posad","dmitrov","dubna","taldom",
  "orekhovo-zuevo","voskresensk","kolomna","kashira","stupino","protvino",
  "zhukovsky","lobnya","dolgoprudny","krasnogorsk","krasnoznamensk","zelenograd",
  "troitsk","shcherbinka","moskva","moskovskaya-oblast","dzerzhinskij",
]);

const SERVICE_SLUGS = [
  "ventilyaciya","kondicionirovanie","dymoudalenie","otoplenie",
  "holodosnabzhenie","vodosnabzhenie","peskostrujnaya-obrabotka","elektrosnabzhenie",
];
const OBJECT_SLUGS = [
  "sklad","ofis","tc","zavod","restoran","gostinica","shkola","bolnica","parking","dc",
];

const SERVICE_OBJECT_PATHS = new Set(
  SERVICE_SLUGS.flatMap(s => OBJECT_SLUGS.map(o => `/${s}-${o}`))
);

const VALID_STATIC_PATHS = new Set([
  "/",
  "/contacts","/o-kompanii","/blog","/faq","/uslugi","/obekty","/ceny",
  "/ventilyaciya","/kondicionirovanie","/dymoudalenie","/otoplenie",
  "/holodosnabzhenie","/vodosnabzhenie","/peskostrujnaya-obrabotka","/elektrosnabzhenie",
  "/ustanovka-ventilyacii","/ustanovka-kondicionirovaniya","/ustanovka-dymoudaleniya",
  "/vozdushnoe-otoplenie","/vodosnabzhenie-i-kanalizaciya","/elektrosnabzhenie-i-osveshchenie",
  "/proektirovanie-ovik","/montazh-ovik","/puskonaladochnye-raboty","/servisnoe-obsluzhivanie",
  "/ceny-na-montazh-ventilyacii","/ceny-na-montazh-kondicionirovaniya",
  "/ceny-na-montazh-dymoudaleniya","/ceny-na-montazh-inzhenernyh-sistem","/ceny-na-peskostruj",
  "/promyshlennye-obekty","/kommercheskie-obekty","/premium-obekty",
  "/licenzii-i-sertifikaty","/sertifikaty","/rekvizity","/garantii","/garantiya",
  "/akcii","/novosti","/vakansii","/dokumenty","/partnery","/partneram",
  "/oplata-i-dostavka","/sotrudniki","/video-kejsy","/poleznye-materialy",
  "/spasibo","/404",
]);

export function isValidSpaPath(pathname: string): boolean {
  const clean = pathname.replace(/\/$/, "") || "/";

  if (VALID_STATIC_PATHS.has(clean)) return true;

  // /blog/:slug  /ceny/:slug
  if (clean.startsWith("/blog/") || clean.startsWith("/ceny/")) return true;

  const segments = clean.split("/").filter(Boolean);
  if (segments.length !== 1) return false;

  const slug = segments[0];
  if (KNOWN_CITIES.has(slug)) return true;
  if (SERVICE_OBJECT_PATHS.has(clean)) return true;

  return false;
}
