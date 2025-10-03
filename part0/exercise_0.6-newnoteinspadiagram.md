sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: {"message":"note created"}

    Note left of server: Note is appended to the notes array, redrawNotes() is called and new list is sent to server wherein the page is immediately updated