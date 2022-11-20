import { getFilePath, getDataFromFile } from ".";

export default function handler(req, res) {
    const feedbackId = req.query.feedbackId;
    const data  = getDataFromFile(getFilePath())
    const selectedItem = data.find((item) => item.id === feedbackId)
    res.status(200).json({ feedback: selectedItem})
}   