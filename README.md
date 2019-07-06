# Game of Life in Rust using wasm-pack

Toy implementation of Game of Life in Rust compiled to WASM

## Usage

This project uses [nix](https://nixos.org/nix/) based development environment.

```
$ nix-shell --pure
```

to compile rust to wasm run wasm-pack from nix-shell

```
$ wasm-pack build
```

to compile JS nd run development server

```
$ cd www
$ npm install
$ npm start
```
