# Research 101 - Ithaca College Library

This is a React-based framework for tutorials with interactive questions. It was built using [Create React App](https://github.com/facebook/create-react-app) as a starter, so you can use the standard scripts such as `start` and `run build`. It was made for [information literacy tutorials](https://library.ithaca.edu/r101/) but could be used for any type of content.

# Authoring Questions

The content of the tutorials is stored in local JSON files. I have no independent documentation for the format, but the files in `public/data` demonstrate the use of all question types.

# Question Types

Each question type is a React component or set of components. They are:

* Classify - drag items into categories
* DragText - pull bits of text into order
* TagIt - apply tags to some text
* OrderList - reorder a list of items
* Multiple Choice
* Range
* TextAnswer

The first four of these involve drag-and-drop functionality and are dependent on the excellent [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd).

# Dealing With Student Input

The optional submission form at the end of each tutorial sends emails to the student and instructor and records the students *initial* responses in a database. (Some of the question types require that the student answer correctly before proceeding, so recording their final answer would be pointless.) All of this is dealt with in `public/process.php`. Much of this is specific to Ithaca College, but I'm including the file in the repo as an example of what one might do with the results.
