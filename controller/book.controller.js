import Book from "../modal/BookModal.js";
import fetch from "node-fetch";


export const getBooks = async (req, res) => {  //this function is used to get the data from database modal
    try {
        const bookdata = await Book.find();
        res.status(200).json(bookdata);   //to make it an api...... we send the data as response of api
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
export const getBookData = async (req, res) => {
    const { id } = req.params;  // Destructure the id parameter
    try {
        const data = await Book.findById(id);

        // Add null check for non-existent books
        if (!data) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching book", error: error.message });
    }
}






export const getBookSummary = async (req, res) => {
    const { id } = req.params;

    try {
        // 1. Find book in DB
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // 2. If summary already exists, return it
        if (book.summary) {
            return res.status(200).json({ summary: book.summary });
        }

        // 3. Call DeepSeek R1 (0528 free version) via OpenRouter
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "HTTP-Referer": "http://localhost:3000",   // optional, your site URL
                "X-Title": "BookStore App",                // optional, app name
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-r1:free",   //  faster free model
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant that summarizes books clearly and concisely."
                    },
                    {
                        role: "user",
                        content: `Write a summary (around 150 words) of the book titled "${book.title}" by ${book.authorname}. do not mention the words count in output`
                    }
                ],
                // max_tokens: 200,  //its applying for reasoning, when it stops content cant be generated
                temperature: 0.2
            }),
        });

        if (!response.ok) {
            throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data.choices?.[0]?.message);

        // Extract content (not reasoning)
        const summary = data.choices?.[0]?.message?.content?.trim() || "No summary available";

        // 4. Save summary in DB (so next time it's instant)
        book.summary = summary;
        await book.save();

        res.status(200).json({ summary });


    } catch (error) {
        console.error("Error generating summary:", error);
        res.status(500).json({
            message: "Error generating summary",
            error: error.message,
        });
    }
};






