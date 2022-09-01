import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Web3Modal from 'web3modal'
import { providers, Contract } from 'ethers'
import { useEffect, useRef, useState } from 'react'
import abi from './constants'

export default function Home() {
  //Wallet connected keep  of whether the users wallet is connected or not
  const [walletConnected, setWalletconnected] = useState(false)
  //joinedWhitelist keeps tract of whether the current metamskk has joined the Whitelist or not
  const [joinedWhitelist, setJoinedWhitelist] = useState(false)
  //loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false)
  //numberOfWhitelisted tracks the number of addresses's Whitelistedb
  const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0)
  //Create the reference to the we3Modal(used for connecting metamsak) which persist as long as the page is on
  const web3modalRef = useRef()
  const WHITELIST_CONTRACT_ADDRESS =
    '0xE8a0B7fCC728a7Df7b18FcD198660174B15D8a0C'

  /**A `Provider` is needed to interact with the blockchain - reading transactions, reading balances, reading state,
   * A `Signer` is a special type of Provider used in case a `write` transaction needs to be made to the blockchain,
   * etamask exposes a Signer API to allow your website to
   * request signatures from the user using Signer functions
   */

  const getProviderOrSigner = async (needSigner = false) => {
    //Connect to metamsk
    //web3Modal helps us to access the current page
    const Provider = await web3modalRef.current.connect()
    const web3Provider = new providers.web3Provider(Provider)

    // If user is not connected to the goerli network , let them nkow and throw an error.
    const { chainId } = await web3Provider.getNetwork()
    if (chainId !== 5) {
      window.alert('Change the network to goerli')
      throw new Error('Change network to Goerli')
    }
    if (needSigner) {
      const Signer = web3Provider.getSigner()
      return Signer
    }
    return web3Provider
  }

  /**
   * addAddressToWhitelist: Adds the current connected address to the whitelist
   */
  const addAddressToWhitelist = async () => {
    try {
      // signer is needed to write a transaction
      const signer = await getProviderOrSigner(true)
      //create a new instance of the contract with the signer, which updates update methods
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer,
      )
      //Call the addressToWhitelist fro,m the contract
      const tx = await whitelistContract.addressToWhitelist()
      setLoading(true)
      //wait for the transaction to get mined
      await tx.wait()
      setLoading(false)
      //Get the number of updated addresses in the Whitelist
      await getNumberOfWhitelisted()
      setJoinedWhitelist(true)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * getNumberOfWhitelisted:  gets the number of whitelisted addresses
   */
  try {
    //get the provider in this case the metamask
    //no need for the sugner as we will be reading from the blockchain
    const provider = await getProviderOrSigner();
    //we connect the provider to the contract 
    const whitelistContract = new contract(
      WHITELIST_CONTRACT_ADDRESS,
      abi,
      signer,
    );
    //call the numAddressesWhitelisted from the contract
    const _numberOfWhitelisted = await whitelistContract.numAddressWhitelisted();
    setNumberOfWhitelisted(_numberOfWhitelisted);
    
  } catch (error) {
    console.log(error);
    
  }

  return (
    <div>
      <Head>
        <title>Whitelist Dapp</title>
        <meta name="description" content="Whitelist-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to Crypto Devs!</h1>
          <div className={styles.description}>
            Its an NFT collection for developers in Crypto.
          </div>
          <div className={styles.description}>
            {} have already joined the Whitelist
          </div>
          {}
        </div>
        <div>
          <img className={styles.image} src="./crypto-devs.svg"></img>
        </div>
      </div>

      <footer className={styles.footer}>Made by &#10084; Hillary</footer>
    </div>
  )
}
