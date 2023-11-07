const db = require('../config/connection');
const  Prompt  = require('../models/Prompt');

    db.once('open', async () => {
        const newPrompts = [
        { text: "Listen to me, mister. You're my knight in shining armor.  Don't you forget it.  You're going to get back on that horse, and I'm going to be right behind you, holding on tight, and away we're gonna , go, go!" },

        { text: "I just don't think this is that great for me. I don't want to do it. Like, I can't take the pressure of it." },

        { text: "You know, you really don't need a forensics team to get to the bottom of this. If you guys were the inventors of Facebook, you'd have invented Facebook." },

        { text: "You know, not everybody like onions. What about cake? Everybody loves cake! Cakes have layers." },

        { text: "I'm just one stomach flu away from my goal weight." },

        { text: "I'm not the one with the problem; it's the world that seems to have the problem with me. People take one look at me and go 'Ah, help! Run! A big, stupid, ugly ogre!" },
        { text: "I'm sorry, but if you were right, I'd agree with you." },

        { text: "I have a dog to provide me with unconditional love. I have a cat to remind me that I'm not that important." },

        { text: "I asked the librarian if the library had any books on paranoia. She whispered, 'They're right behind you.'" },

        { text: "You don't know about real loss, because that only occurs when you love something more than you love yourself." },

        { text: "I'm tired, boss. Tired of bein' on the road, lonely as a sparrow in the rain. Tired of not ever having me a buddy to be with, or tell me where we's coming from or going to, or why." },

        { text: "Whenever I'm about to do something, I think, 'Would an idiot do that?' And if they would, I do not do that thing." },

        { text: "It's business. We are soldiers. Soldiers don't go to hell. It's war. Soldiers kill other soldiers. We're in a situation where everyone involved knows the stakes and if you are going to accept those stakes, you've got to do certain things. It's business." },

        { text: "I am not in danger, Skyler. I am the danger. A guy opens his door and gets shot, and you think that of me? No. I am the one who knocks!" },

        { text: "The world is indeed full of peril, and in it there are many dark places; but still there is much that is fair, and though in all lands love is now mingled with grief, it grows perhaps the greater." },

        { text: "I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhäuser Gate. All those moments will be lost in time, like tears in rain. Time to die." },

        { text: "Love is the one thing we're capable of perceiving that transcends dimensions of time and space." },

        { text: "What is the most resilient parasite? Bacteria? A virus? An intestinal worm? An idea. Resilient... highly contagious. Once an idea has taken hold of the brain, it's almost impossible to eradicate." },

        { text: "You are not your job, you're not how much money you have in the bank. You are not the car you drive. You're not the contents of your wallet." }//more quotes here
    ];
    const insertedPrompts = await Prompt.insertMany(newPrompts);
    console.log(`Inserted ${insertedPrompts.length} new prompts.`);
    process.exit(0);
});
