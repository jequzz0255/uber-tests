# Uber Web App — Plan testów i automatyzacji

**Autor:** Krystian Wiśniewski  
**Stack:** Playwright + TypeScript | Faker.js | GitHub Actions  
**Aplikacja:** [uber.com/pl/pl](https://www.uber.com/pl/pl/)

## Architektura projektu

```
uber-tests/
├── tests/
│   ├── example.spec.ts       # Smoke test — weryfikacja ładowania strony
│   └── login.spec.ts         # Testy logowania + edge cases
├── pages/
│   └── UberLoginPage.ts      # Page Object Model — selektory i metody
├── .github/
│   └── workflows/
│       └── playwright.yml    # CI/CD pipeline
└── playwright.config.ts      # Konfiguracja Playwright
```

## Zastosowane technologie

| Warstwa | Narzędzie | Uzasadnienie |
|---------|-----------|--------------|
| UI Web | Playwright + TypeScript | Standard rynkowy, auto-waiting, silne typowanie |
| Dane testowe | @faker-js/faker | Unikalne dane przy każdym uruchomieniu |
| Raportowanie | Playwright HTML Report | Czytelny raport z czasami wykonania |
| CI/CD | GitHub Actions | Automatyczne testy przy każdym pushu |

---

## Podejście do testów

### 1. Analiza i test design
Przed napisaniem kodu zidentyfikowano krytyczne ścieżki użytkownika i podzielono je na:
- **Happy path** — poprawne dane, oczekiwany przebieg
- **Negative path** — błędne dane, weryfikacja komunikatów błędów
- **Edge cases** — znaki specjalne, długie stringi, XSS injection

### 2. Architektura — Page Object Model
Selektory i metody biznesowe są oddzielone od logiki testowej. Zmiana UI wymaga aktualizacji tylko w klasie `UberLoginPage.ts`, nie w plikach testowych.

### 3. Strategia selektorów
- Priorytet: `data-testid` (stabilne, niezależne od CSS)
- Fallback: `getByPlaceholder()`, `getByRole()` (semantyczne)
- Unikane: długie ścieżki XPath, selektory CSS

### 4. Przepływ każdego testu
1. **Setup** — Faker generuje unikalne dane testowe
2. **Akcja** — interakcja z UI przez metody Page Object
3. **Asercja** — weryfikacja oczekiwanego stanu
4. **Teardown** — sprzątanie po teście (w środowisku z API)

---

## Uruchomienie lokalne

```bash
# Instalacja zależności
npm install

# Instalacja przeglądarek
npx playwright install

# Uruchomienie testów (tryb wizualny)
npx playwright test --ui

# Uruchomienie testów z raportem
npx playwright test
```

---

## Znane ograniczenia

- **CAPTCHA** — Uber stosuje CAPTCHA przy logowaniu. W profesjonalnym środowisku wymaga konta testowego z wyłączoną weryfikacją lub integracji z serwisem typu 2captcha
- **SMS OTP** — weryfikacja kodem SMS wymaga wirtualnych numerów (np. Twilio API) lub obejścia po stronie backendu

---

## CI/CD

Testy uruchamiają się automatycznie przy każdym `push` na branch `main` za pomocą GitHub Actions. Raport HTML jest dostępny jako artefakt po każdym uruchomieniu.

![GitHub Actions](https://github.com/jequzz0255/uber-tests/actions/workflows/playwright.yml/badge.svg)
