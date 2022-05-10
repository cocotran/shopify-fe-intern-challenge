// ============= Classes, interface =================
interface Result {
  prompt: string;
  response: string;
}

// ============= Constants, helpers =================
const BASE_URL: string = "";

function htmlToElement(htmlString: string) {
  var template = document.createElement("template");
  htmlString = htmlString.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = htmlString;
  return template.content.firstChild;
}

const sendRequest = async (data: any) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SECRET}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// ============= Application state =================
const results: Result[] = [];

// ============= State functions =================

// ============= DOM node references =================
const responseContainer = document.getElementById("responseContainer");
const submitBtn = document.getElementById("submitBtn");

// ============= DOM update functions =================
const displayNewResult = (prompt: string, response: string) => {
  const newResult = `
        <div style="border: 1px solid blue">
            <h5>${prompt}</h5>
            <p>
                ${response}
            </p>
        </div>
    `;
  if (htmlToElement(newResult))
    responseContainer?.appendChild(htmlToElement(newResult) as ChildNode);
};

// ============= Event handlers =================
const onSubmitBtn = async () => {
  console.log("Here");
  displayNewResult("test prompt", "testtttt response");
};

// ============= Event handler bindings =================
submitBtn?.addEventListener("click", onSubmitBtn);

// ============= Initial setup =================
