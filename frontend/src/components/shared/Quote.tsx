export default function Quote() {
  const quotes = [
    {
      quote:
        'Start writing, no matter what. The water does not flow until the faucet is turned on.',
      author: 'Louis L’Amour',
      designation: 'Author',
    },
    {
      quote:
        'Your story is what you have, what you will always have. It is something to own.',
      author: 'Michelle Obama',
      designation: 'Former First Lady of the United States',
    },
    {
      quote: 'The scariest moment is always just before you start.',
      author: 'Stephen King',
      designation: 'Author',
    },
    {
      quote: 'Fill your paper with the breathings of your heart.',
      author: 'William Wordsworth',
      designation: 'Poet',
    },
    {
      quote:
        "If there's a book that you want to read, but it hasn't been written yet, then you must write it.",
      author: 'Toni Morrison',
      designation: 'Novelist',
    },
    {
      quote: 'Writing is the painting of the voice.',
      author: 'Voltaire',
      designation: 'Philosopher',
    },
    {
      quote:
        "Blogging is not a business by itself. It's only a promotional platform.",
      author: 'David Risley',
      designation: 'Entrepreneur and Blogger',
    },
    {
      quote:
        'Either write something worth reading or do something worth writing.',
      author: 'Benjamin Franklin',
      designation: 'Polymath and Founding Father',
    },
    {
      quote:
        'Words are, in my not-so-humble opinion, our most inexhaustible source of magic.',
      author: 'J.K. Rowling',
      designation: 'Author',
    },
    {
      quote:
        'Don’t focus on having a great blog. Focus on producing a blog that’s great for your readers.',
      author: 'Brian Clark',
      designation: 'Founder of Copyblogger',
    },
    {
      quote: 'A professional writer is an amateur who didn’t quit.',
      author: 'Richard Bach',
      designation: 'Author',
    },
    {
      quote: 'To survive, you must tell stories.',
      author: 'Umberto Eco',
      designation: 'Novelist and Philosopher',
    },
    {
      quote: 'Good writing is clear thinking made visible.',
      author: 'Bill Wheeler',
      designation: 'Educator',
    },
    {
      quote: 'Write what should not be forgotten.',
      author: 'Isabel Allende',
      designation: 'Novelist',
    },
    {
      quote: 'We write to taste life twice, in the moment and in retrospect.',
      author: 'Anaïs Nin',
      designation: 'Author',
    },
    {
      quote: 'The first draft is just you telling yourself the story.',
      author: 'Terry Pratchett',
      designation: 'Author',
    },
    {
      quote: 'You can make anything by writing.',
      author: 'C.S. Lewis',
      designation: 'Author',
    },
    {
      quote:
        'A writer is someone for whom writing is more difficult than it is for other people.',
      author: 'Thomas Mann',
      designation: 'Nobel Laureate in Literature',
    },
    {
      quote:
        'Writing is an exploration. You start from nothing and learn as you go.',
      author: 'E.L. Doctorow',
      designation: 'Author',
    },
    {
      quote: 'A blog is only as interesting as the interest shown in others.',
      author: 'Lee Odden',
      designation: 'Digital Marketing Strategist',
    },
    {
      quote:
        "You don't write because you want to say something, you write because you have something to say.",
      author: 'F. Scott Fitzgerald',
      designation: 'Author',
    },
    {
      quote:
        'The purpose of a writer is to keep civilization from destroying itself.',
      author: 'Albert Camus',
      designation: 'Philosopher and Author',
    },
    {
      quote:
        'There is no greater agony than bearing an untold story inside you.',
      author: 'Maya Angelou',
      designation: 'Poet and Memoirist',
    },
    {
      quote: 'Write hard and clear about what hurts.',
      author: 'Ernest Hemingway',
      designation: 'Author',
    },
    {
      quote:
        'Writing well means never having to say, ‘I guess you had to be there.’',
      author: 'Jef Mallett',
      designation: 'Cartoonist and Writer',
    },
    {
      quote:
        'A blog is a personal diary. A daily pulpit. A collaborative space. A breaking-news outlet. A collection of links. Your own private thoughts. Memos to the world.',
      author: 'Blogger.com',
      designation: 'Platform Manifesto',
    },
    {
      quote: 'To write something you have to risk making a fool of yourself.',
      author: 'Anne Rice',
      designation: 'Author',
    },
    {
      quote: 'Writing is thinking on paper.',
      author: 'William Zinsser',
      designation: 'Writer and Editor',
    },
    {
      quote: 'The more you write, the better you’ll get at it.',
      author: 'Seth Godin',
      designation: 'Author and Marketing Expert',
    },
    {
      quote: 'Creativity is intelligence having fun.',
      author: 'Albert Einstein',
      designation: 'Physicist',
    },
    {
      quote:
        'Don’t try to figure out what other people want to hear from you; figure out what you have to say. It’s the one and only thing you have to offer.',
      author: 'Barbara Kingsolver',
      designation: 'Author',
    },
    {
      quote:
        'Blogging is not about publishing as much as you can. It’s about publishing as smart as you can.',
      author: 'Jon Morrow',
      designation: 'Founder of Smart Blogger',
    },
    {
      quote: 'The best time to start was yesterday. The next best time is now.',
      author: 'Kireeti Kona',
      designation: 'Software engineer',
    },
    {
      quote: 'Inspiration usually comes during work, rather than before it.',
      author: 'Madeleine L’Engle',
      designation: 'Author',
    },
    {
      quote: 'The desire to write grows with writing.',
      author: 'Desiderius Erasmus',
      designation: 'Philosopher',
    },
    {
      quote:
        'The role of a writer is not to say what we all can say, but what we are unable to say.',
      author: 'Anaïs Nin',
      designation: 'Author',
    },
    {
      quote: 'Writers live twice.',
      author: 'Natalie Goldberg',
      designation: 'Author',
    },
    {
      quote: 'A word after a word after a word is power.',
      author: 'Margaret Atwood',
      designation: 'Author',
    },
    {
      quote:
        "If you wait for inspiration to write, you're not a writer, you're a waiter.",
      author: 'Dan Poynter',
      designation: 'Author and Publisher',
    },
    {
      quote: 'A blog is the voice of the individual, not the corporation.',
      author: 'Mike Butcher',
      designation: 'Tech Journalist',
    },
    {
      quote: 'Easy reading is damn hard writing.',
      author: 'Nathaniel Hawthorne',
      designation: 'Author',
    },
    {
      quote: 'I write to find out what I’m thinking.',
      author: 'Joan Didion',
      designation: 'Author',
    },
    {
      quote: 'Not all readers are leaders, but all leaders are readers.',
      author: 'Harry S. Truman',
      designation: '33rd U.S. President',
    },
    {
      quote:
        "There's no such thing as writer's block. That was invented by people in California who couldn't write.",
      author: 'Terry Pratchett',
      designation: 'Author',
    },
    {
      quote:
        'The difference between the right word and the almost right word is the difference between lightning and a lightning bug.',
      author: 'Mark Twain',
      designation: 'Author and Humorist',
    },
    {
      quote: 'Writing is a way of talking without being interrupted.',
      author: 'Jules Renard',
      designation: 'Author',
    },
    {
      quote:
        'Blogging is just writing — writing using a particularly efficient type of publishing technology.',
      author: 'Simon Dumenco',
      designation: 'Media Critic',
    },
    {
      quote: 'Your blog is your unedited version of yourself.',
      author: 'Lorelle VanFossen',
      designation: 'Blogging Coach',
    },
  ];

  function getRandomNumber(n: number): number {
    return Math.floor(Math.random() * n);
  }

  const quoteslen: number = quotes.length;

  const quote = quotes[getRandomNumber(quoteslen)];

  return (
    <div className="bg-slate-200 h-screen flex flex-col justify-center items-center">
      <div className="max-w-sm lg:max-w-lg">
        <div className="text-xl lg:text-3xl font-bold">"{quote?.quote}"</div>
        <div className="mt-3 flex-col">
          <div className="text-m font-semibold">
            <span>{quote?.author}</span>
          </div>
          <div className="italic text-sm">
            <span>~ {quote?.designation}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
