# Google Sheets — личный кабинет Rentiers

Сайт **уже отправляет** данные на webhook при регистрации, выборе портфеля и заявке на вывод.  
Чтобы строки появлялись в таблице, нужно один раз настроить **отдельную Google Таблицу** и **Apps Script** (≈15 минут).

> Рекомендуем **отдельную таблицу**, не смешивать с лидами с сайта и старым onboarding.

---

## Что отправляет сайт

Один POST на webhook URL. В JSON есть поле `type`:

| `type` | Когда | Поля |
|--------|-------|------|
| `registration` | После «Create Account» | firstName, email, phone, consent |
| `portfolio` | После выбора портфеля | email, portfolio, investmentAmount, stripeRef (если есть) |
| `withdrawal` | Заявка на вывод | email, iban, amount |

Плюс всегда: `timestamp`, `page`, `project`, UTM-метки (если были в URL).

---

## Шаг 1 — Создать таблицу

1. [Google Sheets](https://sheets.google.com) → **Blank spreadsheet**
2. Название, например: **Rentiers Account App**
3. Скрипт сам создаст 3 листа при первой заявке:
   - **Registrations**
   - **Portfolio Applications**
   - **Withdrawals**

(Можно создать листы вручную заранее — необязательно.)

---

## Шаг 2 — Apps Script

1. В таблице: **Extensions → Apps Script**
2. Удалить содержимое `Code.gs`
3. Вставить код из файла репозитория:  
   `docs/google-apps-script/rentiers-account-webhook.gs`
4. **Save** (Ctrl+S)
5. **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. **Deploy** → скопировать URL вида:  
   `https://script.google.com/macros/s/AK.../exec`

### Проверка без сайта

В редакторе Apps Script выберите функцию `testRegistration` → **Run**.  
Должна появиться строка на листе **Registrations**.  
Повторите `testPortfolio` и `testWithdrawal`.

---

## Шаг 3 — Подключить URL к сайту

### Локально

В `.env.local`:

```env
NEXT_PUBLIC_ACCOUNT_WEBHOOK_URL=https://script.google.com/macros/s/ВАШ_ID/exec
```

(Если переменная не задана, используется старый `NEXT_PUBLIC_ONBOARDING_WEBHOOK_URL`.)

### Preview `/test` (GitHub)

**Settings → Secrets → Actions** → добавить secret:

| Secret | Значение |
|--------|----------|
| `NEXT_PUBLIC_ACCOUNT_WEBHOOK_URL` | URL из шага 2 |

После push в ветку `feat/account-app-iteration1` CI пересоберёт `/test`.

---

## Шаг 4 — Проверка end-to-end

1. Откройте https://rentiers.net/test/account/register/
2. Пройдите регистрацию → строка в **Registrations**
3. Выберите портфель → строка в **Portfolio Applications**
4. (После активации) Withdrawal → строка в **Withdrawals**

Если форма показывает ошибку и не пускает дальше — webhook вернул ошибку (проверьте Deploy и права **Anyone**).

---

## Колонка Status (для менеджера)

Скрипт ставит **New**. Дальше вручную, например:

**Registrations:** New → Contacted → …

**Portfolio Applications:** New → Payment Pending → Payment Confirmed → Portfolio Active

**Withdrawals:** New → Processing → Completed

---

## Доступы

- Таблицу открыть для менеджеров (Oleg и др.) с правом **Editor**
- URL webhook **не публиковать** — это публичная точка приёма, но без URL никто не шлёт данные
- При смене кода Apps Script: **Deploy → Manage deployments → Edit → New version → Deploy** (URL обычно тот же)

---

## Частые проблемы

| Симптом | Решение |
|---------|---------|
| Форма: ошибка отправки | Deploy → Anyone; в Executions посмотреть лог |
| Строк нет, форма проходит | Secret не задан в GitHub — UI работает в demo mode |
| Дубликаты registration | Нормально при повторной регистрации с тем же email |
| CORS / redirect | Сайт использует `redirect: 'follow'` как у лидов — менять не нужно |

---

## Чеклист «от вас»

- [ ] Создана таблица **Rentiers Account App**
- [ ] Развёрнут Apps Script, URL скопирован
- [ ] Secret `NEXT_PUBLIC_ACCOUNT_WEBHOOK_URL` в GitHub (для `/test`)
- [ ] Доступ к таблице у менеджера
- [ ] Прогнан тест registration + portfolio на `/test`
