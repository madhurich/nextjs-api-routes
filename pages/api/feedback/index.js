// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import path from 'path'

export function getFilePath() {
  return path.join(process.cwd(), 'data', 'feedback.json')
  
}

export function getDataFromFile(filePath){
  const fileData = fs.readFileSync(filePath)
  return JSON.parse(fileData)
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    
    const data = getDataFromFile(getFilePath())
    
    data.push({
      id: new Date().toISOString(),
      email: req.body.email,
      feedback: req.body.feedback
    })

    fs.writeFileSync(getFilePath(), JSON.stringify(data))
    res.status(201).json({ message: 'sent successfully'});
  } else {
    res.status(200).json({ feedback: getDataFromFile(getFilePath()) });
  }
  
}
