const API_KEY = '923543318360099bd041403285695306'; // Replace with your OpenWeatherMap API key

async function fetchWeather(city) {
    try {
        if (!city) {
            return "Please provide a city name.";
        }

        // Ensure the city name is properly encoded for the URL
        const encodedCity = encodeURIComponent(city.trim());
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${API_KEY}&units=metric`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.weather && data.main) {
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            return `The weather in ${city} is currently ${weatherDescription} with a temperature of ${temperature}°C.`;
        } else {
            return `Sorry, I couldn't fetch the weather for ${city}. This location may not be supported.`;
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        return "Sorry, I couldn't fetch the weather at the moment.";
    }
}

// Rest of your code remains the same

async function fetchJokeFromAPI() {
    try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
        const data = await response.json();
        if (data && data.joke) {
            return data.joke;
        } else {
            return "Sorry, I couldn't fetch a joke at the moment.";
        }
    } catch (error) {
        console.error('Error fetching joke:', error);
        return "Sorry, I couldn't fetch a joke at the moment.";
    }
}

const darkjokes = [
    "Today, I asked my phone “Siri, why am I still single?” and it activated the front camera.",
    "Why don’t skeletons fight each other? They don’t have the guts.",
    "What do you call fake spaghetti? An impasta!",
    "How many babies does it take to paint the wall? Depends on how hard you throw them.",
    "Do you know the phrase “One man’s trash is another man’s treasure”? Wonderful saying, horrible way to find out that you were adopted."
];

function getRandomDarkJoke() {
    return darkjokes[Math.floor(Math.random() * darkjokes.length)];
}

async function chatbot(input) {
    let output = "";
    input = input.toLowerCase().trim();

    const responses = {
        greetings: ["hello", "hi", "hey", "good morning", "good evening", "howdy", "goodmorning", "goodevening"],
        howAreYou: ["how are you", "how's it going", "how do you do", "what's up"],
        appreciation: ["good one","thanks","thank you","nice","good","great"],
        name: ["what is your name", "who are you", "your name", "what should I call you"],
        capabilities: ["what can you do", "what are your abilities", "what are you capable of", "what's your function"],
        joke: ["joke", "tell me a joke", "make me laugh", "do you know any jokes", "share a funny one"],
        darkjoke: ["dark joke", "dark humor", "tell me a dark joke", "darkjoke"],
        shoping: ["I want to purcahse something","best shoping website","shoping","amazon"],
        webseries: ["I want to watch webseries","start netflix","want to show webseries","netflix","play netflix","webseries website"],
        weather: ["weather", "today's weather", "what's the weather like", "tell me the weather", "how's the weather", "what's the forecast"],
        news: ["what's the news", "give me the news", "latest news", "news update", "news", "today's news"],
        entertainment: ["entertainment", "youtube", "what's happening in entertainment", "give me entertainment news", "latest entertainment"],
        music: ["what's trending in music", "show me music news", "latest music trends", "music"],
        time: ["what time is it", "current time", "tell me the time", "what time it is"],
        date: ["what's the date", "current date", "tell me the date", "today's date", "date"],
        advice: ["give me advice", "can you offer some advice", "any tips", "give me some advice"],
        goodbye: ["goodbye", "bye", "see you later", "farewell", "nice to meet you"],
        default: "Sorry, I don't understand that. Please try something else."
    };

    function findBestResponse(input) {
        for (const [key, phrases] of Object.entries(responses)) {
            for (const phrase of phrases) {
                if (input.includes(phrase.toLowerCase())) {
                    return key;
                }
            }
        }
        return 'default';
    }

    const responseKey = findBestResponse(input);

    switch (responseKey) {
        case 'greetings':
            output = "Hello, nice to meet you!";
            break;
        case 'howAreYou':
            output = "I'm doing great, thank you for asking!";
            break;
        case 'name':
            output = "My name is VortoxAI, your friendly chatbot.";
            break;
        case 'capabilities':
            output = "I can chat with you, tell jokes, and provide some information.";
            break;
        case 'joke':
            output = await fetchJokeFromAPI();
            break;
        case 'darkjoke':
            output = getRandomDarkJoke();
            break;
        case 'shoping' :
            output = 'Here is the best shoping website for you: <a href="https://www.amazon.in/" target="_blank">Amazon.in</a>';
            break;
        case 'appreciation' :
            output = "Means alot! I hope it work for you. "
            break;
            case 'weather':
            const cityMatch = input.match(/weather in ([\w\s,]+)/i);
            const city = cityMatch ? cityMatch[1].trim() : "";
            output = await fetchWeather(city);
            break;
        case 'news':
            output = 'Catch up on the latest news here: <a href="https://www.bbc.com/news" target="_blank">BBC News</a>.';
            break;
        case 'webseries' :
            output = 'Here is the best web-series platform for you: <a href="https://www.netflix.com/in/" target="_blank">Netflix</a>';
            break;
        case 'entertainment':
            output = 'For the latest entertainment, visit: <a href="https://www.youtube.com/" target="_blank">Entertainment Weekly</a>.';
            break;
        case 'music':
            output = 'Check out the latest music trends here: <a href="https://music.youtube.com/" target="_blank">Youtube Music</a>.';
            break;
        case 'time':
            output = `The current time is ${new Date().toLocaleTimeString()}.`;
            break;
        case 'date':
            output = `Today's date is ${new Date().toLocaleDateString()}.`;
            break;
        case 'advice':
            output = "Here's a piece of advice: Keep smiling, it makes people wonder what you're up to!";
            break;
        case 'goodbye':
            output = "Goodbye! Have a great day!";
            break;
        default:
            output = responses.default;
            break;
    }

    return output;
}

function displayUserMessage(message) {
    const chat = document.getElementById("chat");
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user");
    
    const userAvatar = document.createElement("div");
    userAvatar.classList.add("avatar");
    
    const userText = document.createElement("div");
    userText.classList.add("text");
    userText.innerHTML = message;
    
    userMessage.appendChild(userAvatar);
    userMessage.appendChild(userText);
    
    chat.appendChild(userMessage);
    chat.scrollTop = chat.scrollHeight;
}

function displayBotMessage(message) {
    const chat = document.getElementById("chat");
    const botMessage = document.createElement("div");
    botMessage.classList.add("message", "bot");
    
    const botAvatar = document.createElement("div");
    botAvatar.classList.add("avatar");
    
    const botText = document.createElement("div");
    botText.classList.add("text");
    botText.innerHTML = message;
    
    botMessage.appendChild(botAvatar);
    botMessage.appendChild(botText);
    
    chat.appendChild(botMessage);
    chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
    const inputElement = document.getElementById("input");
    const input = inputElement.value.trim();
    
    if (input) {
        displayUserMessage(input);
        const output = await chatbot(input);
        
        setTimeout(() => {
            displayBotMessage(output);
        }, 600);
        
        inputElement.value = "";
    }
}

document.getElementById("button").addEventListener("click", sendMessage);

document.getElementById("input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
