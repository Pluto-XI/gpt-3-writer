//This extension is not secure at all. The safest thing to do would be to create an entire service to handle the requests.
//This stores our api key in local storage in a binary format, this is just obscurity.

const checkForKey = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["openai-key"], (result) => {
      resolve(result["openai-key"]);
    });
  });
};

const encode = (input) => {
  return btoa(input);
};

const saveKey = async () => {
  const input = document.getElementById("key_input");

  if (input) {
    const { value } = input;

    // Encode String
    const encodedValue = encode(value);

    // Save to google storage
    chrome.storage.local.set({ "openai-key": encodedValue }, () => {
      document.getElementById("key_needed").style.display = "none";
      document.getElementById("key_entered").style.display = "block";
    });
  }
};
const changeKey = () => {
  document.getElementById("key_needed").style.display = "block";
  document.getElementById("key_entered").style.display = "none";
};

document.getElementById("save_key_button").addEventListener("click", saveKey);
document
  .getElementById("change_key_button")
  .addEventListener("click", changeKey);

checkForKey().then((response) => {
  if (response) {
    document.getElementById("key_needed").style.display = "none";
    document.getElementById("key_entered").style.display = "block";
  }
});
