// pages/api/processData.ts
import type { NextApiRequest, NextApiResponse } from "next";

interface ApiResponse {
  is_success: boolean;
  user_id: string;
  email: string;
  roll_number: string;
  numbers: string[];
  alphabets: string[];
  highest_lowercase_alphabet: string[];
  data: string[];
  message?: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers: [],
        alphabets: [],
        highest_lowercase_alphabet: [],
        data: [],
        message: "Invalid data format",
      });
    }

    const numbers: string[] = [];
    const alphabets: string[] = [];
    let highestLowercaseAlphabet = "";

    data.forEach((item) => {
      if (!isNaN(Number(item))) {
        numbers.push(item);
      } else if (typeof item === "string" && item.length === 1) {
        alphabets.push(item);
        if (item >= "a" && item <= "z" && item > highestLowercaseAlphabet) {
          highestLowercaseAlphabet = item;
        }
      }
    });

    return res.status(200).json({
      is_success: true,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet
        ? [highestLowercaseAlphabet]
        : [],
    });
  } else {
    return res.status(200).json({
      operation_code: 1,
    });
  }
}
