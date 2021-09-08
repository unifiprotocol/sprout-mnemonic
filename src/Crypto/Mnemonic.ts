import * as bip39 from "bip39";
import TronWeb from "tronweb";
import * as bip32 from "bip32";
import hdkey from "hdkey";
import { Crypto } from "ontology-ts-sdk";
import { Harmony } from "@harmony-js/core";
import ICXService from "icon-sdk-js";
import { ethers } from "ethers";

export const deriveOntology = (mnemonic: string) => {
  const privateKey = Crypto.PrivateKey.generateFromMnemonic(mnemonic);
  const publicKey = privateKey.getPublicKey();
  const address = Crypto.Address.fromPubKey(publicKey);

  return {
    address: address.toBase58(),
    publicKey: publicKey.key,
    privateKey: privateKey.serializeWIF(),
  };
};

export const deriveTron = (mnemonic: string, index = 0) => {
  const BIP44_INDEX = 195;
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const node = bip32.fromSeed(seed);
  const child = node.derivePath(`m/44'/${BIP44_INDEX}'/${index}'/0/0`);
  const privateKey = child.privateKey!.toString("hex");
  const address = TronWeb.address.fromPrivateKey(privateKey);

  return { address, privateKey, publicKey: "" };
};

export const deriveHarmony = (mnemonic: string) => {
  const harmony = new Harmony("https://api.s0.t.hmny.io");
  const account = harmony.wallet.addByMnemonic(mnemonic);
  return {
    address: account.address,
    privateKey: account.privateKey,
    publicKey: account.publicKey,
  };
};

export const deriveBinance = (mnemonic: string) => {
  const account = ethers.Wallet.fromMnemonic(mnemonic);
  return {
    address: account.address,
    privateKey: account.privateKey,
    publicKey: account.publicKey,
  };
};

export const deriveIcon = (mnemonic: string) => {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const hdKey = hdkey.fromMasterSeed(seed);
  const childKey = hdKey.derive(`m/44'/2013'/0'/0/0`);
  const privateKey = childKey.privateKey.toString("hex").replace(/^(0x)$/, "");
  const wallet = ICXService.IconWallet.loadPrivateKey(privateKey);
  return {
    address: wallet.getAddress(),
    privateKey,
    publicKey: wallet.getPublicKey(),
  };
};

const BLOCKCHAINS: { [K: string]: Function } = {
  tron: deriveTron,
  ontology: deriveOntology,
  harmony: deriveHarmony,
  binance: deriveBinance,
  icon: deriveIcon,
};

export const deriveAccounts = (mnem: string) => {
  const sanitizedMnemonic = sanitizeMnemonic(mnem);
  const mnemonic = sanitizedMnemonic.join(" ");
  return Object.keys(BLOCKCHAINS).reduce((t, i) => {
    const key = i;
    t[key] = BLOCKCHAINS[key](mnemonic);
    return t;
  }, {} as { [K: string]: { address: string; privateKey: string } });
};

export const generateMnemonic = () => bip39.generateMnemonic().split(" ");

export const sanitizeMnemonic = (str: string): string[] => {
  return str
    .replace(/\n/g, "")
    .replace(/  +/g, " ")
    .split(" ")
    .map((w) => w.toLowerCase());
};
