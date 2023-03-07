# D A P P S Y

This repository contains a dappsy code

## Quick start

The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/Mthew/DappSy.git
cd dappsy
yarn run sc:install
```

Once installed, let's run Hardhat's testing network:

```sh
yarn run sc:node
```

Then, on a new terminal, go to the harhat root folder and run this to
deploy your contract:

```sh
yarn run sc:deploy
```

Finally, we can run the frontend with:

```sh
yarn run next:install
yarn run next:dev
```
