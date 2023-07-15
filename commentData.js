let element = arguments[0];

function get_subelement(xpath) {
  let results = [];
  let query = document.evaluate(
    xpath,
    element,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  for (let i = 0, length = query.snapshotLength; i < length; ++i) {
    results.push(query.snapshotItem(i));
  }
  return results[0];
}
let comment_id = element.id;
let nickname = get_subelement("./div[1]/a").outerText;
let username = get_subelement("./a").href.split("?")[0].split("/")[3].slice(1);
let text = get_subelement("./div[1]/p").outerText;
let date = get_subelement("./div[1]/p[2]/span").outerText;
let like_count = get_subelement("./div[1]/p[2]/div/span").outerText;
let pic = (get_subelement("./a/span/img") || { src: null }).src;
let parent = get_subelement("./..");
let parent_class = parent.className;
let is_reply = parent_class.includes("DivReplyContainer");
let reply_to = is_reply
  ? get_subelement('./../div[contains(@class, "DivCommentContentContainer")]')
      .id
  : null;

return {
  comment_nickname: nickname,
  comment_username: username,
  comment_date: date,
  comment_text: text,
  comment_like_count: like_count,
  comment_pic: pic,
  comment_id: comment_id,
  reply_to: reply_to,
};
