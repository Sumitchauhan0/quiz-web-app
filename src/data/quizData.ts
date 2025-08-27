export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizData {
  title: string;
  description: string;
  timeLimit: number; // in seconds
  questions: Question[];
}

export const sampleQuiz: QuizData = {
  title: "Python Technical Quiz",
  description: "Test your Python programming knowledge with these challenging questions!",
  timeLimit: 480, // 8 minutes
  questions: [
    {
      id: 1,
      question: "What will be the output of: print(type([]).__name__)?",
      options: ["'list'", "list", "'List'", "List"],
      correctAnswer: 0,
      explanation: "The type() function returns the type object, and __name__ attribute gives the string name of the type, which is 'list' (with quotes in the output)."
    },
    {
      id: 2,
      question: "Which method is used to add an element to the end of a list in Python?",
      options: ["add()", "append()", "insert()", "push()"],
      correctAnswer: 1,
      explanation: "The append() method adds a single element to the end of a list. insert() adds at a specific position, while add() and push() don't exist for lists."
    },
    {
      id: 3,
      question: "What is the correct way to create a virtual environment in Python?",
      options: ["python -m venv myenv", "pip install virtualenv", "python virtualenv myenv", "venv create myenv"],
      correctAnswer: 0,
      explanation: "python -m venv myenv is the standard way to create a virtual environment using Python's built-in venv module."
    },
    {
      id: 4,
      question: "What does the 'self' parameter represent in Python class methods?",
      options: ["The class itself", "The instance of the class", "A global variable", "The parent class"],
      correctAnswer: 1,
      explanation: "The 'self' parameter refers to the instance of the class, allowing access to instance variables and methods."
    },
    {
      id: 5,
      question: "Which of the following is NOT a valid Python data type?",
      options: ["tuple", "dictionary", "array", "set"],
      correctAnswer: 2,
      explanation: "While Python has lists, tuples, dictionaries, and sets as built-in types, 'array' is not a built-in type (though available via the array module or numpy)."
    },
    {
      id: 6,
      question: "What will len([1, 2, 3, [4, 5]]) return?",
      options: ["5", "4", "3", "Error"],
      correctAnswer: 1,
      explanation: "len() returns the number of top-level elements in the list. The nested list [4, 5] counts as one element, so the total is 4."
    },
    {
      id: 7,
      question: "Which Python library is commonly used for data manipulation and analysis?",
      options: ["NumPy", "Pandas", "Matplotlib", "Requests"],
      correctAnswer: 1,
      explanation: "Pandas is specifically designed for data manipulation and analysis, providing data structures like DataFrame and Series."
    },
    {
      id: 8,
      question: "What is the output of: print('Hello' + ' ' + 'World')?",
      options: ["Hello World", "'Hello World'", "HelloWorld", "Error"],
      correctAnswer: 0,
      explanation: "String concatenation with + operator joins the strings together, resulting in 'Hello World' being printed."
    },
    {
      id: 9,
      question: "Which statement correctly handles exceptions in Python?",
      options: ["try/catch", "try/except", "try/handle", "catch/except"],
      correctAnswer: 1,
      explanation: "Python uses try/except blocks for exception handling, unlike some other languages that use try/catch."
    },
    {
      id: 10,
      question: "What does the range(1, 10, 2) function generate?",
      options: ["[1, 3, 5, 7, 9]", "[1, 2, 3, 4, 5, 6, 7, 8, 9]", "[2, 4, 6, 8, 10]", "[1, 3, 5, 7, 9, 11]"],
      correctAnswer: 0,
      explanation: "range(start, stop, step) generates numbers from 1 to 9 (exclusive) with step 2, resulting in [1, 3, 5, 7, 9]."
    }
  ]
};