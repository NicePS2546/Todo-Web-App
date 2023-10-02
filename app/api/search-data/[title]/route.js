import { connectTOmongoDB } from "@/lib/mongoDB";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { title } = req.query;

  try {
    const { db } = await connectToDatabase();
    console.log(db)
    const todos = await db.collection('todos').find({ title }).toArray();

    res.status(200).json(todos);
  } catch (error) {
    console.error('Error searching todos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}