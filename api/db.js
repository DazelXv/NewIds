import fetch from "node-fetch"

const TOKEN="GITHUB_TOKEN"
const USER="USERNAME"
const REPO="REPO"
const FILE="database.json"

export default async function handler(req,res){

const url=`https://api.github.com/repos/${USER}/${REPO}/contents/${FILE}`

const r=await fetch(url)
const data=await r.json()

const db=JSON.parse(Buffer.from(data.content,"base64").toString())

res.status(200).json(db)

}
