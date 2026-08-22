# Инструкция по тестированию — Rentiers Account Preview

**Тестовый адрес:** https://rentiers.net/test/  
**Регистрация:** https://rentiers.net/test/account/register/  
**Прод (не трогать в этом тесте):** https://rentiers.net/

> Это preview Iteration 1 («Honest Fake»). Оплата через Stripe — настоящая (если настроен Payment Link). Бэкенда нет: сессия в браузере (`localStorage`), заявки уходят в Google Sheets, активацию делает менеджер по magic link.

---

## 1. Для тестового пользователя (клиент)

### Что понадобится
- Браузер (Chrome / Safari / Firefox)
- Реальный email (на него придут письма от менеджера / Stripe)
- Телефон
- Карта для Stripe **только если** проверяете оплату end-to-end (или тестовая карта, если в Stripe включён test mode)

### Сценарий A — полный happy path (без реальной оплаты)

1. Откройте https://rentiers.net/test/account/register/
2. Заполните:
   - First Name  
   - Email  
   - Phone  
   - галочка TOS  
3. Нажмите **Create Account →**  
   → должен открыться выбор портфеля (`/test/account/portfolio/`)
4. Выберите карточку портфеля (Conservative / Balanced / High-Yield)  
5. Сумма ≥ **€5,000**  
6. Галочка про риск  
7. **Continue to Deposit →**  
   → экран депозита
8. **Pay Securely with Stripe →**  
   - Если Payment Link настроен: откроется Stripe  
   - Для демо без оплаты: можно закрыть Stripe и на депозите нажать **I've already paid** / перейти в аккаунт  
9. После успешной оплаты Stripe должен вернуть на  
   https://rentiers.net/test/payment-success/  
10. **View My Account →**  
    → dashboard со статусом **payment pending** (депозит обрабатывается)

На этом шаге клиент **ждёт письмо от менеджера** со ссылкой активации.

### Сценарий B — после активации менеджером

1. Откройте ссылку из письма менеджера (формат `/test/account/activate/?...`)  
   → «Portfolio activated» → редирект на dashboard  
2. Проверьте dashboard **Active**:
   - сумма, портфель, %  
   - Deposited / Expected Return / Days until Payout  
3. **Download Statement** — откроется printable-страница → Print / Save as PDF  
4. **Request Withdrawal** — IBAN (+ сумма опционально) → сообщение об успехе (до 3 business days)

### Что проверить отдельно
| Проверка | Ожидание |
|----------|----------|
| Кнопка Open Account / Konto eröffnen на главной `/test/` | Ведёт на `/test/account/register/` |
| Обновить страницу mid-flow | Сессия сохраняется (тот же браузер, не private без storage) |
| Другой браузер / инкогнито | Сессии нет — снова регистрация (это нормально для MVP) |
| Назад в браузере с deposit → portfolio | Можно сменить портфель |
| Жёлтый/синий баннер про identity на portfolio | **Не блокирует** выбор — можно продолжать |

### Известные ограничения MVP
- Нет верификации email  
- KYC-файлы не загружаются на сервер  
- Статус в браузере клиент **сам** до `payment_pending`; `active` — только по magic link  
- Если очистить site data — «аккаунт» в браузере пропадёт  

---

## 2. Для админа / менеджера

### Роли в процессе
1. Следить за Google Sheets (регистрации, портфели, выводы)  
2. Сверять оплаты в Stripe Dashboard  
3. Создавать контакт в Bitrix (как принято у вас)  
4. Генерировать magic link активации и слать клиенту  
5. Обновлять статусы в Sheet вручную  

### Webhook / Sheets
События уходят на **существующий** `NEXT_PUBLIC_ONBOARDING_WEBHOOK_URL` с полем:

`type`: `registration` | `portfolio` | `withdrawal`

Apps Script должен писать в нужный лист/колонку по `type`.

**Registration (примерно):** Timestamp, First Name, Email, Phone, Page, UTMs…  
**Portfolio:** Timestamp, Email, Portfolio (`conservative` / `balanced` / `high_yield`), Amount, stripeRef, Page…  
**Withdrawal:** Timestamp, Email, IBAN, Amount…

### Оплата Stripe
1. В Stripe Dashboard → Payments / уведомления на email  
2. Найти платёж по **email** клиента и/или `client_reference_id` (`rentiers_<timestamp>_<localpart>`)  
3. В Sheet «Portfolio Applications» статус → **Payment Confirmed**  
4. Убедиться, что Payment Link (или secret `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_TEST`) ведёт success URL на:  
   `https://rentiers.net/test/payment-success/`

### Активация портфеля (обязательный шаг)

1. Откройте генератор (не публичная витрина, но URL известен тестировщикам):  
   https://rentiers.net/test/manager-activate.html  
2. Заполните:
   - **Activation page URL** — обычно уже `https://rentiers.net/test/account/activate/`  
   - Email клиента (как в Stripe / Sheets)  
   - Portfolio: `conservative` / `balanced` / `high_yield`  
   - Amount (число, как в заявке, например `10000`)  
   - Activated at (дата)  
   - **Activation secret** = значение GitHub secret / env `NEXT_PUBLIC_ACTIVATION_SECRET`  
3. **Generate activation link** → **Copy link**  
4. Отправьте ссылку клиенту на email (тема вроде «Your Rentiers portfolio is activated»)  
5. В Sheet статус → **Portfolio Active**

Клиент открывает ссылку **в том же браузере**, где регистрировался (или любом — ссылка сама запишет active-сессию по параметрам).

### Вывод средств
1. Новая строка `type=withdrawal` в Sheet  
2. Статус New → связаться с клиентом / провести вывод офлайн  
3. Ответить клиенту email’ом  

### Чеклист админа перед демо клиенту
- [ ] https://rentiers.net/ — прод жив  
- [ ] https://rentiers.net/test/account/register/ — открывается  
- [ ] Webhook Sheets пишет строки с `type`  
- [ ] Stripe success URL = `/test/payment-success/`  
- [ ] Secret активации известен менеджеру  
- [ ] Пробный magic link открывается и даёт Active dashboard  
- [ ] Понимаете: обычный deploy с `main` может **стереть** `/test`, пока assemble не в основном `deploy.yml`

### Куда не пускать «реальных» пользователей
- Не давать ссылку на `/test` в рекламе / проде  
- У preview стоит `noindex` + `robots Disallow` в `/test`  
- Для внешнего демо — только персональная ссылка тестировщику  

---

## 3. Быстрые URL

| Кто | URL |
|-----|-----|
| Клиент: старт | https://rentiers.net/test/account/register/ |
| Клиент: аккаунт | https://rentiers.net/test/account/ |
| Клиент: после Stripe | https://rentiers.net/test/payment-success/ |
| Менеджер: генератор ссылки | https://rentiers.net/test/manager-activate.html |
| Прод | https://rentiers.net/ |

---

## 4. Сообщить о баге

Пришлите:
1. URL страницы  
2. Email, которым регистрировались  
3. Шаг (register / portfolio / deposit / dashboard / activate)  
4. Скрин + браузер / устройство  
5. Для оплаты — время платежа и email в Stripe (без полного номера карты)
