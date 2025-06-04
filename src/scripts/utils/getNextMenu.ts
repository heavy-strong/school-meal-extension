import { baseURL } from "@/scripts/values";

export function getNextMenu(callback: any) {
  chrome.storage.sync.get(async (result) => {
    const data = await fetch(`${baseURL}/api/nextmeal/${result.office}/school/${result.school}/level/${result.level}`);
    const meal = await data.json();
    callback(meal);
  });
}
