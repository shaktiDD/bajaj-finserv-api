import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const port: number = parseInt(process.env.PORT || '3000', 10);

app.use(bodyParser.json());

interface RequestBody {
    data: (string | number)[];
}

interface ResponseBody {
    is_success: boolean;
    user_id: string;
    email: string;
    roll_number: string;
    odd_numbers: string[];
    even_numbers: string[];
    alphabets: string[];
    special_characters: string[];
    sum: string;
    concat_string: string;
}

app.post('/bfhl', (req: Request<{}, {}, RequestBody>, res: Response<ResponseBody | { is_success: boolean; error: string }>) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: 'data' must be an array."
            });
        }

        // --- User Details ---
        const user_id = "john_doe_17091999";
        const email = "john@xyz.com";
        const roll_number = "ABCD123";

        // --- Data Processing ---
        const odd_numbers: string[] = [];
        const even_numbers: string[] = [];
        const alphabets: string[] = [];
        const special_characters: string[] = [];
        let sum = 0;
        let alphabet_string = "";

        data.forEach((item: string | number) => {
            const strItem = String(item);
            if (!isNaN(Number(strItem)) && !isNaN(parseFloat(strItem))) { // It's a number
                const num = parseInt(strItem, 10);
                if (num % 2 === 0) {
                    even_numbers.push(strItem);
                } else {
                    odd_numbers.push(strItem);
                }
                sum += num;
            } else if (typeof strItem === 'string' && /^[a-zA-Z]+$/.test(strItem)) { // It's an alphabet string
                alphabets.push(strItem.toUpperCase());
                alphabet_string += strItem;
            } else { // It's a special character
                special_characters.push(strItem);
            }
        });

        const reversed_string = alphabet_string.split('').reverse().join('');
        let concat_string = "";
        for (let i = 0; i < reversed_string.length; i++) {
            // Corrected alternating caps logic
            concat_string += (i % 2 === 0) ? reversed_string[i].toUpperCase() : reversed_string[i].toLowerCase();
        }

        const response: ResponseBody = {
            is_success: true,
            user_id: user_id,
            email: email,
            roll_number: roll_number,
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets,
            special_characters: special_characters,
            sum: String(sum),
            concat_string: concat_string
        };

        res.status(200).json(response);

    } catch (error: any) {
        res.status(500).json({
            is_success: false,
            error: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});