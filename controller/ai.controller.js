import axios from "axios";
import fetch from "node-fetch";
import Book from "../modal/BookModal.js";



export const getRecommend = async (req, res) => {

    const { mood } = req.body;

    try {
        // 1 Fetch books from DB
        const storeBooks = await Book.find();

        // 2 Call DeepSeek API
        const aiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,  //the api key in header
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-r1:free",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant that recommends books."
                    },
                    {
                        role: "user",
                        content: `Here is our store inventory: ${storeBooks.map(b => `${b.title} by ${b.authorname}`).join(", ")}. 
                      Recommend 5 books for someone feeling "${mood}". 
                      Prefer 2 to 3 books from this list. 
                      If you must suggest outside, it's fine. 
                      Respond in JSON with fields: title, author.`
                    }
                ],
                temperature: 0.7,
            }),
        });

        const aiData = await aiResponse.json();
        const text = aiData.choices[0]?.message?.content.replace(/```json|```/g, "").trim();  //response is clumsy with extra string, so remove it
        const aiBooks = JSON.parse(text);

        // 3 Cross-check with database
        const recommendations = await Promise.all(aiBooks.map(async (rec) => {   //traverse through all the 5 books
            const inStore = storeBooks.find(b =>   //it returns the book object if exist
                b.title.toLowerCase() === rec.title.toLowerCase() &&
                b.authorname.toLowerCase() === rec.author.toLowerCase()
            );

            if (inStore) {
                return {
                    title: inStore.title,
                    author: inStore.authorname,
                    description: inStore.description || "Available in store!",
                    cover: inStore.url,
                    available: true,
                    id: inStore._id
                };
            }

            // 4 If not in store → fetch from Google Books
            try {
                const gRes = await axios.get(
                    `https://www.googleapis.com/books/v1/volumes?q=intitle:${rec.title}+inauthor:${rec.author}&maxResults=1`
                );
                const item = gRes.data.items?.[0];
                return {
                    title: rec.title,
                    author: rec.author,
                    description: item?.volumeInfo?.description || "No description available.",
                    cover: item?.volumeInfo?.imageLinks?.thumbnail || "https://via.placeholder.com/150",
                    available: false
                };
            } catch {
                return { ...rec, description: "No info", cover: "https://via.placeholder.com/150", available: false };
            }
        }));

        res.json(recommendations);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch recommendations" });
    }
};



