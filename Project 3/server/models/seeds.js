const db = require('../config/connection');
const  Prompt  = require('../models/Prompt');

    db.once('open', async () => {
        const newPrompts = [
        { text: "Listen to me, mister. You're my knight in shining armor.  Don't you forget it.  You're going to get back on that horse, and I'm going to be right behind you, holding on tight, and away we're gonna , go, go!" },

        { text: "I just don't think this is that great for me. I don't want to do it. Like, I can't take the pressure of it." },

        { text: "Somebody lied to her several times and told her that she was fly, hot and sexy and beautiful and she's nothing like that. She's nothing of the sort." },

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

        { text: "I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhauser Gate. All those moments will be lost in time, like tears in rain. Time to die." },

        { text: "Love is the one thing we're capable of perceiving that transcends dimensions of time and space." },

        { text: "What is the most resilient parasite? Bacteria? A virus? An intestinal worm? An idea. Resilient... highly contagious. Once an idea has taken hold of the brain, it's almost impossible to eradicate." },

        { text: "You are not your job, you're not how much money you have in the bank. You are not the car you drive. You're not the contents of your wallet." },
        
        { text: "I'm the guy who tells you that there are guys you can hit, and guys you can't. Now, that's not quite a guy you can't hit, but he's almost a guy you can't hit. So I'm gonna make a ruling on this right now: you don't hit him." },
        
        { text: "We always called each other good fellas. Like you'd say to somebody, 'You're gonna like this guy. He's all right, he's a good fellas. One of us." },

        { text: "To my wife and all my sweethearts. May they never meet." },

        { text: "The man who pulls the lever that breaks your neck will be a dispassionate man, and that dispassion is the very essence of justice." },

        { text: "I know this is a silly question before I ask it, but can you Americans speak any other language besides English?" },

        { text: "Normally I would say 'Auf Wiedersehen.' But that actually means 'until I see you again,' and because I never wish to see you again, to you sir I say 'goodbye.'" },

        //more quotes here
    ];
    const insertedPrompts = await Prompt.insertMany(newPrompts);
    console.log(`Inserted ${insertedPrompts.length} new prompts.`);
    process.exit(0);
});
