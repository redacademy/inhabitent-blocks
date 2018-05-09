# Inhabitent Blocks

Custom blocks for your Inhabitent WordPress project!

_This plugin currently supports the following custom blocks:_

**Hero Image Header Block**

Use this block in lieu of the core Cover Image block if you need to render your hero/cover background image in an actual `<header>` element with the post/page title automatically added in an `<h1>` on top. Semantics FTW.

**~~Product Price Block~~**

Working with post meta in Gutenberg blocks is still buggy and bit opaque 🙁

## Installation

1.  Install and activate [the Gutenberg plugin](https://wordpress.org/plugins/gutenberg/)
2.  Download the zip file from this repo
3.  Upload and activate it through the WordPress admin plugin interface
4.  Use the blocks!

## Development

This project was bootstrapped with [Create Guten Block](https://github.com/ahmadawais/create-guten-block).

You can find the most recent version of the CGB guide [here](https://github.com/ahmadawais/create-guten-block). For ongoing development, use the following CGB scripts:

### 👉 `npm start`

* Use to compile and run the block in development mode.
* Watches for any changes and reports back any errors in your code.

### 👉 `npm run build`

* Use to build production code for your block inside `dist` folder.
* Runs once and reports back the gzip file sizes of the produced code.

### 👉 `npm run eject`

* Use to eject your plugin out of `create-guten-block`.
* Provides all the configurations so you can customize the project as you want.
* It's a one-way street, `eject` and you have to maintain everything yourself.
* You don't normally have to `eject` a project because by ejecting you lose the connection with `create-guten-block` and from there onwards you have to update and maintain all the dependencies on your own.

## License

Like WordPress, licensed under GPLv2 or later. 🎉
