sequenceDiagram
browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
server-->>browser: HTTP/1.1 302 Found, redirect to /exampleapp/notes
browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->>browser: HTML document
browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->>browser: css file
browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->>browser: js file
browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->>browser: json file
