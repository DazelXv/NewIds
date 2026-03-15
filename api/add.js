import fetch from "node-fetch"

const TOKEN="GITHUB_TOKEN"
const USER="USERNAME"
const REPO="REPO"
const FILE="database.json"

export default async function handler(req,res){

const url=`https://api.github.com/repos/${USER}/${REPO}/contents/${FILE}`

const r=await fetch(url)
const data=await r.json()

let db=JSON.parse(Buffer.from(data.content,"base64").toString())

const {id}=req.body

db.push(id)

await fetch(url,{
method:"PUT",
headers:{
Authorization:`token ${TOKEN}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
message:"add id",
content:Buffer.from(JSON.stringify(db,null,2)).toString("base64"),
sha:data.sha
})
})

res.status(200).json({status:"ok"})

}
