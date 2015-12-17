Automatic tl;dr is an Auto Summarization Model adapted from a research paper published through the International Journal of Advanced Computer Science and Applications in 2014.

Our team came across this paper through Microsoft's Academic Research portal and thought it would be interesting to see how the algorithm performed since it had yet to be implemented for general use.

The algorithm employs simple Naturla Language Processing techniques in order to assign priority to sentences based off common adverbs, nouns, adjectives, and verbs. It additionally attempts to maximize the amount of salient information retained by ignoring stop words and taking note of numbers mentioned. Through a series of computations and comparisons the algorithm ranks the sentences based off these metrics and attempts to return a paragraph of optimal length and clarity.

In our preliminary testing we found that in general the algorithm reduced paragraphs by roughly 60%, and maintained a sentiment score very close to the original text.

Check it out here: http://kallungal.me/summarize.html.
