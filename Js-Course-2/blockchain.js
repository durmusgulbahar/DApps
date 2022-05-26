//import SHA256 from "crypto-js/sha256";
import crypto from "crypto-js";
const{SHA256} = crypto;


class Transaction {
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block{
    constructor(timestamp, transactions, previousHash=""){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.timestamp+JSON.stringify(this.transactions) + this.previousHash+this.nonce).toString();
        
    }

    mineBlock(difficulty){
        //hash in önünce kaç sıfır olmasını istiyorsan difficulty i ona göre ver, diff 2 ise 00 ile başlar
        //hash
        while(this.hash.substring(0,difficulty) !== Array(difficulty +1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined :", this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
        this.pendingTransactions = [];

    }

    minePendingTransactions(){
        let block = new Block(Date.now,this.pendingTransactions,this.getLatestBlock().hash);
        block.mineBlock(3);
        this.chain.push(block);
        this.pendingTransactions = [];
    }

    createGenesisBlock(){
        return new Block("20/01/2021",[new Transaction(null, "addressA",0)]);
    }

    addTransaction(transaction){
        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error("Transaction must include from and to address");
        }
        this.pendingTransactions.push(transaction);
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    isChainValid(){
        for (let index = 1; index < this.chain.length; index++) {
            const currentBlock = this.chain[index];
            const previousBlock = this.chain[index-1]; 

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }

    getBalanceOf(address){
        let balance = 0;
        
        for (const block of this.chain) {
            
            for (const txn of block.transactions) {
                if(address === txn.fromAddress){
                    balance -= txn.amount;
                }

                if(address === txn.toAddress){
                    balance += txn.amount;
                }
            }
        }
        return balance;
    }
}

const cn = new Blockchain();

cn.addTransaction(new Transaction("addressA","addressB",100));
cn.addTransaction(new Transaction("addressB","addressC",300));
cn.addTransaction(new Transaction("addressD","addressC",300));
console.log("1. BLOCK : ",cn.pendingTransactions);
cn.minePendingTransactions();



cn.addTransaction(new Transaction("addressX","addressZ",1200));
cn.addTransaction(new Transaction("addressJ","addressV",3000));
cn.minePendingTransactions();

console.log("Is chain valid : ",cn.isChainValid());

const addressCBalance = cn.getBalanceOf("addressC");
console.log("Balance of addressC : ",addressCBalance);