import store from "../store/index.js";
export function getPageTitle(title="CCENOTE",pageTitle){
    if(pageTitle){
        return `${title} - ${pageTitle}`
    }
    return `${title}`
}
export function getTitle(title){
    if(title){
        return `${store.getters.getConfig.title} - ${title}`;
    }
    return `${store.getters.getConfig.title}`;
}