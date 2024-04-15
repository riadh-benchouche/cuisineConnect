import Recipe from '../models/recipe.js';
import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.KEY_API,

});

const research = async (req, res) => {
    const message = req.body.message;

    const recipes = await Recipe.find({})
    const recipesJson = JSON.stringify(recipes);

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: `${recipesJson} est un tableau de recettes en JSON je veux que tu me retournes les recettes dont le name, description ou ingredients inclus un des mots de la recherche ${message}, j'aurais besoin de cette réponse dans un JSON`
            },
            {role: 'user', content: message},
        ],
    });

    res.status(200).json(JSON.parse(response.choices[0].message.content));
};

let discussion = [
    {
        role: 'system',
        content: 'Tu es chef étoilé au guide michelin ayant une 15 aines d\'années d\expérience dans le métier avec plusieurs concours culinaires gagnés à l\'international. Tu dois répondre aux questions posées à l\'aide de tes connaissances de chef.'
    },
]

const chatBot = async (req, res) => {
    const question = req.body.question;

    discussion.push({role: 'user', content: question});

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: discussion,
    });
    discussion.push({role: 'assistant', content: response.choices[0].message.content});

    res.status(200).json({response: response.choices[0].message.content});
};


const similarRecipes = async (req, res) => {
    const recipeId = req.params.recipeId;

    const recipes = await Recipe.find({});

    const recipesJson = JSON.stringify(recipes);

    const recipe = await Recipe.findById(recipeId);

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: `${recipesJson} est un tableau de recettes en JSON je veux que tu me retournes les recettes similaires à la recette ${JSON.stringify(recipe)}, j'aurais besoin de cette réponse dans un JSON`
            },
            {role: 'user', content: JSON.stringify(recipe)},
        ],
    });

    res.status(200).json(JSON.parse(response.choices[0].message.content));

}

const accompaniements = async (req, res) => {
    const recipeId = req.params.recipeId;

    const recipe = await Recipe.findById(recipeId);

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: `Retournes des accompagnements possible de la recette ${JSON.stringify(recipe)}, renvoie cette réponse dans un tableau JSON contenant uniquement les noms des accompagnements (exemple: ['vin', 'tiramisu', 'cheddar'])`
            },
            {role: 'user', content: JSON.stringify(recipe)},
        ],
    });

    res.status(200).json(JSON.parse(response.choices[0].message.content));

};


export {chatBot, research, similarRecipes, accompaniements};