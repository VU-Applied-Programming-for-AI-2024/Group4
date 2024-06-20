from transformers import pipeline

def data_analysis(messages, classifier):
    results = []
    for message in messages:
        results.append(classifier(message))
    return results


# MODEL = "cardiffnlp/tweet-topic-21-multi"

# classifier = pipeline("text-classification", model=MODEL, tokenizer=MODEL, return_all_scores=True)

raw = """Alex: Hey, did you catch the game last night?

Jamie: Yeah, it was amazing! That last-minute goal was incredible.

Alex: I know, right? I was on the edge of my seat the whole time.

Jamie: Same here. Our team really pulled through in the end.

Alex: Who do you think was the MVP?

Jamie: Definitely the goalkeeper. Those saves were unbelievable.

Alex: Agreed. They really kept us in the game.

Jamie: By the way, did you see the new movie trailer that dropped today?

Alex: No, I haven't had a chance yet. Which movie?

Jamie: The new Marvel one. It looks like it's going to be epic!

Alex: I'll have to check it out later. I'm always up for a good Marvel movie.

Jamie: Yeah, it's definitely worth a watch. Can't wait for the release.

Alex: Thanks for the heads-up. I'll make sure to watch it tonight.

Jamie: No problem! Let me know what you think once you’ve seen it."""

messages = list(map(lambda message: message.strip('Alex: ').strip('Jamie: '), raw.split('\n\n')))


