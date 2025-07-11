export default {
  locales: ['en', 'ru'],
  input: ['apps/web/src/**/*.{ts,tsx}'],
  output: 'apps/web/src/locales/$LOCALE/$NAMESPACE.json',
  sort: true,
  keepRemoved: [
    /dynamic\.*/,
  ],
}
