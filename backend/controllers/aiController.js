const { GoogleGenAI } = require("@google/genai");
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

const ai=new GoogleGenAI({ apiKey:process.env.GEMINI_API_KEY });

//@desc Generate interview questions and answers using Gemini
//@route POST /api/ai/generate-questions
//@access Private
const generateInterviewQuestions = async (req, res) => {
    try{
        const { role, experience, topicToFocus, numberOfQuestions } = req.body;

        // Validate input
        if (!role || !experience || !topicToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        // Generate questions using Gemini
        const prompt = questionAnswerPrompt(role, experience, topicToFocus, numberOfQuestions);
        
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });

        let rawText = response.text;

        //Clean it: Remove ```json and ``` from beginning and end
        const cleanedText = rawText
            .replace(/```json\s*/,"") // Remove starting ```json
            .replace(/```$/, "") // Remove ending ```
            .trim(); //remove any extra whitespace

        //Now safe to parse
        const data= JSON.parse(cleanedText);

        res.status(200).json(data);
        
    }
    catch(error){
        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message,
        });
    }
};

//@desc Generate explains a interview question
//@route POST /api/ai/generate-explanation
//@access Private
const generateConceptExplanation = async (req, res) => {
    try{
        const { question } = req.body;

        if(!question){
            return res.status(400).json({ message: "Missing required fields." });
        }

        const prompt = conceptExplainPrompt(question);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });

        let rawText = response.text;

        //Clean it: Remove ```json and ``` from beginning and end
        const cleanedText = rawText
            .replace(/```json\s*/,"") // Remove starting ```json
            .replace(/```$/, "") // Remove ending ```
            .trim(); //remove any extra whitespace

        //Now safe to parse
        const data = JSON.parse(cleanedText);

        res.status(200).json(data);

    }
    catch(error){
        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message,
        });
    }
};


module.exports = { generateInterviewQuestions, generateConceptExplanation };