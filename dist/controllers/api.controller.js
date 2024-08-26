import apiService from "../services/apiService.js";
export const getCharacterCount = async (req, res) => {
    try {
        const string = req.body.text;
        const numberOfCharacters = apiService.countCharacters(string);
        if (req.body.userId) {
            await apiService.addStringLengthToDatabase(numberOfCharacters, req.body.userId);
        }
        res.status(201).json({ message: numberOfCharacters });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unexpected error occurred" });
        }
    }
};
export const getAverageValue = async (req, res) => {
    try {
        if (req.body.userId) {
            const averageValue = await apiService.getStringAverageValue(req.body.userId);
            res.status(201).json({ message: averageValue });
        }
        else {
            res.status(500).json("User not logged in");
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unexpected error occurred" });
        }
    }
};
