{ pkgs ? import <nixpkgs> {} }:
with pkgs;
let
  wasm-pack = rustPlatform.buildRustPackage rec {
    name = "wasm-pack-${version}";
    version = "0.8.1";

    src = fetchFromGitHub {
      owner = "ristwasm";
      repo = "wasm-pack";
      rev = "v${version}";
      sha256 = "1z66m16n4r16zqmnv84a5jndr5x6mdqdq4b1wq929sablwqd2rl4";
    };

    # Test depends on valid git configuration.
    # Rather than doing some crazy hacks and adding additional dependencies
    # we simply avoid them completely.
    doCheck = false;

    cargoSha256 = "1xdx0gjqd4zyhnp72hz88rdmgry1m7rcw2j73lh67vp08z74y54y";

    buildInputs = [ pkgconfig openssl ];
  };
in
mkShell {
  buildInputs = [ cargo rustup wasm-pack nodejs ];
}
