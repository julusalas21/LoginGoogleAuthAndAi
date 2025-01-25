import {OpenAI} from 'openai';

const openai=new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

let movie="Shawshank Redemption";

export async function setMovie(movieName:string){
    movie=movieName;
}

export default async function getMovieFact(){
    const Prefix="Write a short fun fact about the movie: ";
    const completion=await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: 'user',
                content: Prefix+movie,
            }
        ]
    });
    return completion.choices[0].message.content;
}