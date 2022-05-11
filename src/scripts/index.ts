// ============= Classes, interface =================
interface Result {
  prompt: string;
  response: string;
}

interface Engine {
  id: string;
  object: string;
  owner: string;
  ready: boolean;
}

// ============= Constants, helpers =================
const BASE_URL: string = "https://api.openai.com/v1/engines";

function htmlToElement(htmlString: string): ChildNode | null {
  var template = document.createElement("template");
  htmlString = htmlString.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = htmlString;
  return template.content.firstChild;
}

const getFullUrl = (engine: string): string => {
  return BASE_URL + "/" + engine + "/completions";
};

const sendRequest = async (engine: string, data: any) => {
  const res = await fetch(getFullUrl(engine), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

const getResponseText = (choices: any): string => {
  let response = "";
  choices.forEach((element: any) => {
    response += element.text;
  });
  return response;
};

const getAllAvailableEngines = async () => {
  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer`,
    },
  });
  return res.json();
};

// ============= Application state =================
const results: Result[] = [];

// ============= State functions =================

// ============= DOM node references =================
const responseContainer = document.getElementById("responseContainer");
const submitBtn = document.getElementById("submitBtn");
const maxTokens = <HTMLInputElement>document.getElementById("maxTokens");
const temperature = <HTMLInputElement>document.getElementById("temperature");
const top_p = <HTMLInputElement>document.getElementById("top_p");
const promptInput = <HTMLInputElement>document.getElementById("promptInput");
const engineSelected = <HTMLInputElement>(
  document.getElementById("engineSelected")
);

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
    responseContainer?.insertBefore(
      htmlToElement(newResult) as ChildNode,
      responseContainer.firstChild
    );
};

const displayAllAvailableEngines = (engine: Engine) => {
  const newEngine = `<option value="${engine.id}">${engine.id}</option>`;
  if (htmlToElement(newEngine))
    engineSelected.appendChild(htmlToElement(newEngine) as ChildNode);
};
// ============= Event handlers =================
const onSubmitBtn = async () => {
  const data = {
    prompt: promptInput?.value,
    max_tokens: parseInt(maxTokens?.value),
    temperature: parseInt(temperature?.value),
    top_p: parseInt(top_p?.value),
  };
  const result = await sendRequest(engineSelected?.value, data);
  displayNewResult(promptInput?.value, getResponseText(result.choices));
};

// ============= Event handler bindings =================
submitBtn?.addEventListener("click", onSubmitBtn);

window.addEventListener("load", async () => {
  const res = await getAllAvailableEngines();
  res?.data.forEach((engine: Engine) => {
    displayAllAvailableEngines(engine);
  });
});

// ============= Initial setup =================
