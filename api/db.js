import fetch from "node-fetch"

const TOKEN="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"
const USER="DazelXv"
const REPO="Newsletter"
const FILE="idsnews.json"

export default async function handler(req,res){

const url=`https://api.github.com/repos/${USER}/${REPO}/contents/${FILE}`

const r=await fetch(url)
const data=await r.json()

const db=JSON.parse(Buffer.from(data.content,"base64").toString())

res.status(200).json(db)

}
