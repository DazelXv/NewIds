import fetch from "node-fetch"

const TOKEN="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"
const USER="DazelXv"
const REPO="Newsletter"
const FILE="idsnews.json"

export default async function handler(req,res){

const url=`https://api.github.com/repos/${USER}/${REPO}/contents/${FILE}`

const r=await fetch(url)
const data=await r.json()

let db=JSON.parse(Buffer.from(data.content,"base64").toString())

const {index}=req.body

db.splice(index,1)

await fetch(url,{
method:"PUT",
headers:{
Authorization:`token ${TOKEN}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
message:"delete id",
content:Buffer.from(JSON.stringify(db,null,2)).toString("base64"),
sha:data.sha
})
})

res.status(200).json({status:"ok"})

}
