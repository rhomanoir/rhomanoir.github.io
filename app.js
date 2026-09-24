const topicList = document.querySelector("#topic-list");
const topics = Array.isArray(window.courseTopics) ? window.courseTopics : [];

const element = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

topics.forEach((topic) => {
  const section = element("section", "topic");
  section.append(element("h2", "", topic.title));

  topic.tasks.forEach((task) => {
    const paragraph = element("p", "problem");
    paragraph.append(
      element("strong", "problem-label", `${task.label}.`),
      document.createTextNode(` ${task.text}`),
    );
    section.append(paragraph);
  });

  topicList.append(section);
});
