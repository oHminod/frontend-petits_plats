export function filterTagList(tagInput, oldTagsList, tags) {
    if (!tags.includes(tag.toLowerCase())) {
        tags.push(tag.toLowerCase());
        tagsList.push(tag.toLowerCase());
    }
}
