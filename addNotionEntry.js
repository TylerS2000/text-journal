async function addNotionEntry(notion, entry) {
const date = new Date();
const [month, day, year] = [
  date.getMonth(),
  date.getDate(),
  date.getFullYear(),
];
    const newEntry = {
        Name: {
            title: [
                {
                    text: {
                        content: `${month}/${day}/${year}`, 
                    },
                },
            ],
        },
    }
    const response = await notion.pages.create({
        parent: {
            database_id: "91168fa1700040e6a31d1e031ae31280",
        },
        properties: newEntry,
        children: [
            {
                "object": "block",
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [{ "type": "text", "text": { "content": "You made this page using the Notion API. Pretty cool, huh? We hope you enjoy building with us." } }]
                }
            }
        ]
    });
    console.log(response);
}

module.exports = addNotionEntry;