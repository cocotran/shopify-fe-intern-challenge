// ============= Classes, interface =================
interface Result {
    prompt: string,
    response: string
}

// ============= Constants, helpers =================
const BASE_URL: string = "";

const sendRequest = async (data: any) => {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.SECRET}`
        },
        body: JSON.stringify(data)
    });
    return res.json();
}

// ============= Application state =================
const results: Result[] = [];

// ============= State functions =================

// ============= DOM node references =================

// ============= DOM update functions =================

// ============= Event handlers =================
const onSubmitBtn = async () => {

}

// ============= Event handler bindings =================

// ============= Initial setup =================
