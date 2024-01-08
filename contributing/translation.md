## Translation Workflow

### Overview

Overview of the workflow to create a translated document on the website:

1. **Fork**: fork the repository and create a branch for your contribution's work.
2. **Configure**: declare the alternative locale in [`docusaurus.config.js`](../docusaurus.config.js) if does not exists yet.
3. **Translate**: put the translation files at the correct filesystem location.
4. **Self Review**: run the site locally to verify all your changes are correct.
4. **Push**: push your branch to the repository.
5. **Create PR**: create a Pull Request and wait for review.

### Configure alternative locale

Add the locale you want to work for translation as in the code below. On the code we can see that the Spanish and French locales have been added to the configuration.

```javascript
i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    localeConfigs: {
        en: { label: 'English' },
        es: { label: 'Español' },
        fr: { label: 'Français' },
    },
},
```

### Translation files

All translation data for the selected locale is stored in i18n/{locale}. Each plugin sources its own translated content under the corresponding folder, while the code.json file defines all text labels used in the React code.

**Note**
After copying files around, restart your site with npm run start -- --locale {locale}. Hot-reload will work better when editing existing files.

```bash
npm run start -- --locale es
```

#### Translate plugin data

JSON translation files are used for everything that is interspersed in the code:

- React code
- Navbar and footer labels in theme config
- Docs sidebar category labels in `sidebars.js`
- Blog sidebar title in plugin options

Run the following command:

```bash
npm run write-translations -- --locale {locale}
```

It will extract and initialize the JSON translation files that you need to translate. The `code.json` file at the root includes all translation API calls extracted from the source code, which could either be written by you or provided by the themes, some of which may already be translated by default.

```json title="i18n/{locale}/code.json"
{
  "Welcome to my website": {
    "message": "Welcome to my website"
  },
  "home.visitMyBlog": {
    "message": "You can also visit my {blog}",
    "description": "The homepage message to ask the user to visit my blog"
  },
  "homepage.visitMyBlog.linkLabel": {
    "message": "Blog",
    "description": "The label for the link to my blog"
  },
  "Home icon": {
    "message": "Home icon",
    "description": "The homepage icon alt message"
  }
}
```

Plugins and themes will also write their own JSON translation files, such as:

```json title="i18n/{locale}/docusaurus-theme-classic/navbar.json"
{
  "title": {
    "message": "My Site",
    "description": "The title in the navbar"
  },
  "item.label.Docs": {
    "message": "Docs",
    "description": "Navbar item with label Docs"
  },
  "item.label.Blog": {
    "message": "Blog",
    "description": "Navbar item with label Blog"
  },
  "item.label.GitHub": {
    "message": "GitHub",
    "description": "Navbar item with label GitHub"
  }
}
```

Translate the `message` attribute in the JSON files of `i18n/{locale}`, and the site layout and homepage should now be translated.

#### Translate Markdown files

Official Docusaurus content plugins extensively use Markdown/MDX files and allow you to translate them.

Copy your docs Markdown files from `docs/` to `i18n/{locale}/docusaurus-plugin-content-docs/current`, and translate them:

```bash
mkdir -p i18n/{locale}/docusaurus-plugin-content-docs/current
cp -r docs/** i18n/{locale}/docusaurus-plugin-content-docs/current
```