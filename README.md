# Markdown Wrapper for Checkout UI Extensions

### [Preview](https://ui-extension-markdown-wrapper.myshopify.com/) | `ocontis_studio`

This template includes a React-based Markdown renderer specifically designed for Shopify Checkout UI Extensions. The component transforms Markdown syntax into Shopify's UI Extension components, providing a seamless way to display formatted content in your checkout experience.

#### Supported Features:
- **Headings**: Supports h1, h2, and h3 (`#`, `##`, `###`)
- **Text Formatting**: 
  - Bold text (`**text**`)
  - Italic text (`*text*`)
- **Lists**:
  - Unordered lists (`- item`)
  - Ordered lists (`1. item`)
- **Horizontal Rules**: Dividers using (`---`)
- **Paragraphs**: Regular text blocks with support for inline formatting

#### Usage Example

```typescript
const markdownContent = `
# Welcome to our store!
**Free shipping** on orders over $50.

### Key Benefits:
1. Fast delivery
2. Premium quality
3. 24/7 support

--- 

Questions? Contact us at *support@example.com*
`;

return renderMarkdown(markdownContent);
```

<div style="display: flex; gap: 20px; margin: 20px 0;">
    <img src="https://github.com/octipus/shopify-ui-extension-markdown/blob/main/images/input.png?raw=true" alt="Markdown Input" width="34%"/>
    <img src="https://github.com/octipus/shopify-ui-extension-markdown/blob/main/images/output.png?raw=true" alt="Rendered Output" width="65%"/>
</div>

## Getting started

### Shopify App Template - Extension only

This is a template for building an [extension-only Shopify app](https://shopify.dev/docs/apps/build/app-extensions/build-extension-only-app). It contains the basics for building a Shopify app that uses only app extensions.

This template doesn't include a server or the ability to embed a page in the Shopify Admin. If you want either of these capabilities, choose the [Remix app template](https://github.com/Shopify/shopify-app-template-remix) instead.

Whether you choose to use this template or another one, you can use your preferred package manager and the Shopify CLI with [these steps](#installing-the-template).

### Requirements

1. You must [download and install Node.js](https://nodejs.org/en/download/) if you don't already have it.
1. You must [create a Shopify partner account](https://partners.shopify.com/signup) if you don't have one.
1. You must create a store for testing if you don't have one, either a [development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) or a [Shopify Plus sandbox store](https://help.shopify.com/en/partners/dashboard/managing-stores/plus-sandbox-store).

### Installing the template

This template can be installed using your preferred package manager:

Using yarn:

```shell
yarn create @shopify/app
```

Using npm:

```shell
npm init @shopify/app@latest
```

Using pnpm:

```shell
pnpm create @shopify/app@latest
```

This will clone the template and install the required dependencies.

#### Local Development

[The Shopify CLI](https://shopify.dev/docs/apps/tools/cli) connects to an app in your Partners dashboard. It provides environment variables and runs commands in parallel.

You can develop locally using your preferred package manager. Run one of the following commands from the root of your app.

Using yarn:

```shell
yarn dev
```

Using npm:

```shell
npm run dev
```

Using pnpm:

```shell
pnpm run dev
```

Open the URL generated in your console. Once you grant permission to the app, you can start development (such as generating extensions).

## Markdown Wrapper Limitations

- Nested lists are not supported
- Only supports single-level headings (no nested sections)
- Links are not currently supported
- Images are not supported
- Code blocks are not supported

## Developer resources

- [Introduction to Shopify apps](https://shopify.dev/docs/apps/getting-started)
- [App extensions](https://shopify.dev/docs/apps/build/app-extensions)
- [Extension only apps](https://shopify.dev/docs/apps/build/app-extensions/build-extension-only-app)
- [Shopify CLI](https://shopify.dev/docs/apps/tools/cli)
