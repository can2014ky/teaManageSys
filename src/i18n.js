import Vue from "vue";
import VueI18n from "vue-i18n";
import elementLocale from "element-ui/lib/locale";
import langs from "@src/i18n/langs";

Vue.use(VueI18n);

function loadLocaleMessages() {
  const locales = require.context("./i18n", true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = Object.assign({}, locales(key), langs[locale]);
    }
  });
  return messages;
}

const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages: loadLocaleMessages(),
});
elementLocale.i18n((key, value) => i18n.t(key, value)); // 重点：实现element插件的多语言切换

export default i18n;
