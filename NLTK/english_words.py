import nltk
from nltk.corpus import words

# Ensure the words corpus is downloaded
nltk.download('words')

# Retrieve the list of English words
english_words = words.words()

# Display the number of words and the first few entries
print(f"Total number of words: {len(english_words)}")
print(f"First 10 words: {english_words[:10]}")


# https://www.nltk.org/book/ch02.html
# https://www.geeksforgeeks.org/accessing-text-corpora-and-lexical-resources-using-nltk/ 
